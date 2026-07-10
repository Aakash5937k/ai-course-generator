import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { storage } from "@/configs/firebaseConfigs";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import Link from "next/link";
function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner);
    }
  }, [course?.courseBanner]);

  /**
   * Select file and Upload to Firebase Storage
   * @param {*} event
   */
  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    const fileName = Date.now() + ".jpg";
    const storagRef = ref(storage, "ai-course/" + fileName);
    await uploadBytes(storagRef, file)
      .then(() => {
        console.log("upload file complete");
      })
      .then(() => {
        getDownloadURL(storagRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          await db
            .update(CourseList)
            .set({
              courseBanner: downloadUrl,
            })
            .where(eq(CourseList.id, course?.id));
        });
      });
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-2xl">
            {course?.courseOutput?.course?.name}{" "}
            {edit && (
              <EditCourseBasicInfo
                course={course}
                refreshData={() => refreshData(true)}
              />
            )}
          </h2>
          <p className="text-sm text-gray-400 mt-3 ">
            {course?.courseOutput?.course?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <HiOutlinePuzzlePiece /> {course?.category}
          </h2>

          {!edit && (
            <Link href={"/course/" + course?.courseId + "/start"}>
              <Button className="w-full mt-5">Start</Button>
            </Link>
          )}
        </div>
        <div>
          <label htmlFor="upload-image">
            <Image
              src={selectedFile ? selectedFile : "/placeholder.svg"}
              width={600}
              height={300}
              className="w-full rounded-xl h-[250px] object-cover cursor-pointer"
              alt="image"
            />
            {edit && (
              <input
                type="file"
                id="upload-image"
                className="opacity-0"
                onChange={onFileSelected}
              />
            )}
          </label>
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
