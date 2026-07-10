"use client";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";

function CourseStart({ params: promisedParams }) {
  const params = React.use(promisedParams);
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState([]);
  useEffect(() => {
    params && GetCourse();
  }, [params]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));
    console.log("Fetched course data:", result[0]); // Debug data structure
    setCourse(result[0]);
    GetSelectedChapterContent(0);
  };

  const GetSelectedChapterContent = async (chapterId) => {
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters?.chapterId, chapterId),
          eq(Chapters?.courseId, course?.courseId)
        )
      );
    setChapterContent(result[0]);
    console.log(result);
  };
  return (
    <div>
      {/* chapter list side bar */}
      <div className=" fixed md:w-72 hidden md:block h-screen border-r shadow-sm">
        <h2 className="font-medium text-lg bg-primary p-4 text-white">
          {course?.courseOutput?.course?.name || "Untitled Course"}
        </h2>
        <div>
          {(course?.courseOutput?.course?.chapters || []).map(
            (chapter, index) => (
              <div
                key={index}
                className={`cursor-pointer hover:bg-purple-50 ${
                  selectedChapter?.name === chapter?.name && "bg-purple-50"
                }`}
                onClick={() => {
                  setSelectedChapter(chapter);
                  GetSelectedChapterContent(index);
                }}
              >
                <ChapterListCard chapter={chapter} index={index} />
              </div>
            )
          )}
        </div>
      </div>
      {/* content div */}
      <div className="md:ml-72">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;
