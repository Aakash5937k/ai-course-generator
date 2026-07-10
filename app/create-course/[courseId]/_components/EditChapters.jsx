import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

function EditChapters({ course, index, refreshData }) {
  const Chapters = course?.courseOutput?.course?.chapters || [];
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (Chapters[index]) {
      setName(Chapters[index].name || "");
      setAbout(Chapters[index].about || "");
    }
  }, [course, index]);

  const onUpdateHandler = async () => {
    course.courseOutput.course.chapters[index].name = name;
    course.courseOutput.course.chapters[index].about = about;

    await db
      .update(CourseList)
      .set({ courseOutput: course.courseOutput })
      .where(eq(CourseList.id, course.id))
      .returning({ id: CourseList.id });

    refreshData(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <HiPencilSquare className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            Update the chapter name and description.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chapter Title
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              className="h-40"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapters;
