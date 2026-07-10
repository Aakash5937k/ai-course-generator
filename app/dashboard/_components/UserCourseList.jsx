"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    setLoading(true); // Set loading before fetching
    const result = await db
      .select()
      .from(CourseList)
      .where(
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
    setCourseList(result);
    setLoading(false); // Set loading false after fetch
  };

  const expectedCourseCount = 9; // dynamically set this as per your expected courses count
  const skeletonCount = courseList?.length || expectedCourseCount || 5;

  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl">My AI Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          // Show skeleton loaders based on skeletonCount dynamically
          Array(skeletonCount)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]"
              ></div>
            ))
        ) : courseList?.length > 0 ? (
          // Show actual course cards
          courseList.map((course) => (
            <CourseCard
              course={course}
              key={course.id || course.courseId}
              refreshData={() => getUserCourses()}
            />
          ))
        ) : (
          // Show empty state if no courses
          <div className="col-span-full text-center mt-10 text-gray-500">
            No courses found.
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCourseList;
