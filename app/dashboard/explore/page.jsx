"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetAllCourses();
  }, []);

  const GetAllCourses = async () => {
    setLoading(true);
    const result = await db.select().from(CourseList);
    setCourseList(result);
    setLoading(false);
  };

  const expectedCourseCount = 9;
  const skeletonCount = courseList?.length || expectedCourseCount || 5;

  return (
    <div>
      <h2 className="font-bold text-3xl">Explore More Projects</h2>
      <p>Explore more projects built with AI by other users.</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {loading
          ? Array(skeletonCount)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]"
                ></div>
              ))
          : courseList?.map((course, index) => (
              <div key={index}>
                <CourseCard course={course} displayUser={true} />
              </div>
            ))}
      </div>
    </div>
  );
}

export default Explore;
