"use client";
import DragAndDropFiles from "@/components/common/DragAndDropFiles";
import InputBox from "@/components/common/InputBox";
import SelectBox from "@/components/common/SelectBox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const Editor = dynamic(
  () => import("@/components/dashboard/common/editor/Editor"),
  {
    ssr: false,
  }
);
export default function CategoryForm() {
  const [thumbnail, setThumbnail] = useState<File[] | null>(null);
  return (
    <div>
      <form className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4 mt-10">
        <div>
          <h5 className="font-bold text-lg">Category For Product</h5>
          <p className=" text-gray-700 mt-2">
            Create or Update category for different product
          </p>
        </div>
        <div>
          <div className="grid sm:grid-cols-2 gap-8">
            <InputBox label="Category Name" name="category-name" />
            <InputBox label="Category Slug" name="category-slug" />
            <SelectBox
              name="parent-categories"
              label="Parent Categories"
              value=""
              onChange={(val) => console.log("Selected:", val)}
              options={[
                { label: "Fruits", value: "fruits" },
                { label: "Grocery", value: "grocery" },
                { label: "Meat", value: "meat" },
                { label: "Cat Food", value: "cat-food" },
              ]}
            />
          </div>
          <div>
            <Label className="mb-4 mt-8">Thumbnail image</Label>
            <DragAndDropFiles MAX_FILES={1} onFileChange={setThumbnail} />
            {thumbnail && (
              <div className="relative w-fit">
                <Image
                  src={URL.createObjectURL(thumbnail[0] as File)}
                  alt="preview"
                  width={220}
                  height={220}
                  className="rounded-md object-cover size-[220px]"
                />
                <button
                  className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                  type="button"
                  onClick={() => setThumbnail(null)}
                >
                  <Icon
                    icon="material-symbols-light:delete-rounded"
                    width="22"
                    height="22"
                  />
                </button>
              </div>
            )}
          </div>
          <div>
            <Label className="mb-4 mt-8">Description</Label>
            <Editor value="" onChange={(val) => console.log(val)} />
          </div>
          <Button className="ml-auto w-fit block my-8" variant="blue">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
