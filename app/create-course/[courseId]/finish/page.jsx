"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

function FinishScreen({ params: promisedParams }) {
  const params = React.use(promisedParams);
  const { user } = useUser();
  const [course, setCourse] = useState([]);
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

  // Handler to navigate to dashboard
  const goToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="text-center font-bold text-2xl my-3 text-primary">
        Congrats! Your course is ready
      </h2>

      {/* Pass edit={false} to disable editing in CourseBasicInfo */}
      <CourseBasicInfo
        course={course}
        refreshData={() => console.log()}
        edit={false}
      />

      <h2 className="mt-3">Course URL:</h2>
      <h2 className="text-center text-gray-400 border p-2 round flex gap-5 items-center">
        {process.env.NEXT_PUBLIC_HOST_NAME}/course/{course?.courseId}/start
        <HiOutlineClipboardDocumentCheck
          className="h-5 w-5 cursor-pointer"
          onClick={async () =>
            await navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course?.courseId}/start`
            )
          }
        />
      </h2>

      {/* Button to navigate to dashboard if user does not want to start now */}
      <div className="mt-6 flex justify-center ">
        <Button onClick={goToDashboard}>Go to Dashboard</Button>
      </div>
    </div>
  );
}

export default FinishScreen;
