import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import Image from "next/image";

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-col items-center py-6">
            <Image
              src={"/Loader.gif"}
              width={100}
              height={100}
              alt="Loading..."
            />
            <AlertDialogTitle className="text-lg mt-4">
              Please wait...
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              AI is working on your course.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;
