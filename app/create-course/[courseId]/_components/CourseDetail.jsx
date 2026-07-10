import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlinePlay,
} from "react-icons/hi";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

function CourseDetail({ course }) {
  return (
    <div className="border rounded-xl shadow-sm mt-3 p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex gap-2 items-center">
          <HiOutlineChartBar className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Skill Level</h2>
            <h2 className="font-medium text-lg">{course?.level}</h2>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <HiOutlineClock className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Duration</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.course?.duration}
            </h2>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <HiOutlineBookOpen className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">No Of Chapters</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.course?.noOfChapters}
            </h2>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <HiOutlinePlay className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Video Included?</h2>
            <h2 className="font-medium text-lg">{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg pt-4">Course URL:</h1>
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
      </div>
    </div>
  );
}

export default CourseDetail;
