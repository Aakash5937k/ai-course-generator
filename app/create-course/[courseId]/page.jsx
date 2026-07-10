"use client";
import { Chapters, CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { db } from "@/configs/db";
import { and, eq } from "drizzle-orm";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import service from "@/configs/service";
import { useRouter } from "next/navigation";

function CourseLayout({ params: promisedParams }) {
  const params = React.use(promisedParams); // ✅ unwrap the Promise
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    setCourse(result[0]);
    console.log(result);
  };

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.course?.chapters;

    if (!chapters || chapters.length === 0) {
      setLoading(false);
      return;
    }

    for (const [index, chapter] of chapters.entries()) {
      const PROMPT =
        "Explain the concept in Detail on Topic: " +
        course?.name +
        ", Chapter:" +
        chapter?.name +
        ", in JSON Format with list of array with field as title, description in detail, Code Example(Code filed in <precode> format) if applicable";

      try {
        let videoId = ""; // Generate Video URL
        service.getVideos(course?.name + ":" + chapter?.name).then((resp) => {
          console.log(resp);
          videoId = resp[0]?.id?.videoId;
        }); // Generate chapter content with AI
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        const responseText = await result?.response?.text();
        const content = responseText ? JSON.parse(responseText) : []; // Save chapter content and video ID in DB

        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId,
        });
      } catch (e) {
        console.log("Error generating content for chapter:", chapter?.name, e); // Continue with next chapter despite errors
      }
    }

    setLoading(false); // Mark course as published

    await db.update(CourseList).set({
      publish: true,
    }); // Navigate to finish page

    router.replace("/create-course/" + course?.courseId + "/finish");
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-3xl">Course Layout</h2>
      <LoadingDialog loading={loading} />
      {/* Basic information about the course */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
      {/* Course details can be displayed here */}
      <CourseDetail course={course} />
      {/* List of lessons or modules can be rendered here */}
      <ChapterList course={course} refreshData={() => GetCourse()} />
      <Button onClick={GenerateChapterContent} className="my-10">
        Generate Course Content
      </Button>{" "}
    </div>
  );
}

export default CourseLayout;
