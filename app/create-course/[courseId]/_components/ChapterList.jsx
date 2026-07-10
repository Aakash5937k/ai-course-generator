import React from "react";
import { HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi";
import EditChapters from "./EditChapters";

function ChapterList({ course, refreshData, edit = true }) {
  return (
    <div className="mt-3">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.course?.chapters.map((chapter, index) => (
          <div
            className="p-5 border rounded-lg mb-2 flex items-center justify-between mt-2"
            key={chapter.id || index}
          >
            <div className="flex gap-5 items-center">
              <h2 className="bg-primary flex-none h-10 w-10 text-white rounded-full text-center p-2">
                {index + 1}
              </h2>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium text-lg">{chapter?.name}</h2>
                  <div className="inline-block">
                    {edit && (
                      <EditChapters
                        course={course}
                        index={index}
                        refreshData={refreshData}
                      />
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{chapter?.about}</p>
                <p className="flex gap-2 text-primary items-center">
                  <HiOutlineClock /> {chapter?.duration}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
