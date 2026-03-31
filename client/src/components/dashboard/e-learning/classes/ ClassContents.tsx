"use client"
import DragAndDropFiles from "@/components/common/DragAndDropFiles";
import { addCourseField } from "@/redux/features/course/courseFormSlice";
import { deleteExistingImages } from "@/redux/features/product/productFormSlice";
import { RootState } from "@/redux/store";
import { ProductValidationErrors } from "@/types/Product";
import { getImageUrl } from "@/utils/getImageUrl";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Editor = dynamic(
  () => import("@/components/dashboard/common/editor/Editor"),
  {
    ssr: false,
  }
);


const supportedAudioFormat = [
  "audio/mpeg",   // mp3
  "audio/wav",
  "audio/ogg",
  "audio/mp4",    // m4a
  "audio/webm",
  "audio/aac"
];


export function ClassContents() {
  const courseForm = useSelector((state: RootState) => state.courseForm);
  const [errors, setErrors] = useState<ProductValidationErrors>({});
  const dispatch = useDispatch();
  return (
    <div className="flex w-full flex-col gap-6">
      <Editor onChange={(val) => dispatch(addCourseField({ aboutTab: val }))} value={courseForm.aboutTab}/>
      <div className="">
        <label htmlFor="" className="mb-4 inline-block font-medium">
          Audio Gallery
        </label>
        <DragAndDropFiles
          supportedFormat={supportedAudioFormat}
          MAX_FILES={20}
          onFileChange={(files) => {
            if (files && files?.length > 0) {
              console.log(files);
              dispatch(addCourseField({ images: files }));
            }
          }}
        />
        {errors.images && (
          <span className="text-red-500 text-xs mt-2 ml-1">
            {errors?.images?.msg}
          </span>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {courseForm.images &&
            courseForm.images.length > 0 &&
            courseForm.images.map((file: File, index) => (
              <div key={index} className="relative w-fit">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  width={220}
                  height={220}
                  className="rounded-md object-cover size-[220px]"
                />
                <button
                  className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                  type="button"
                  onClick={() => {
                    if (courseForm?.images) {
                      const filteredFiles = courseForm?.images.filter(
                        (_, i) => i !== index,
                      );
                      dispatch(
                        addCourseField({ images: filteredFiles }),
                      );
                    }
                  }}
                >
                  <Icon
                    icon="material-symbols-light:delete-rounded"
                    width="22"
                    height="22"
                  />
                </button>
              </div>
            ))}
          {courseForm.existingImages &&
            courseForm.existingImages.length > 0 &&
            courseForm.existingImages.map(
              (img: string, index: number) => (
                <div key={index} className="relative w-fit">
                  <Image
                    src={getImageUrl(img, "products")}
                    alt="preview"
                    width={220}
                    height={220}
                    className="rounded-md object-cover size-[220px]"
                  />
                  <button
                    className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                    type="button"
                    onClick={() => {
                      dispatch(deleteExistingImages(img));
                    }}
                  >
                    <Icon
                      icon="material-symbols-light:delete-rounded"
                      width="22"
                      height="22"
                    />
                  </button>
                </div>
              ),
            )}
        </div>
      </div>
    </div>
  )
}
