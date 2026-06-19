"use client";
import DragAndDropFiles from "@/components/common/DragAndDropFiles";
import InputBox from "@/components/common/InputBox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  addResourceCategoryField,
  deleteExistingThumb,
  resetResourceCategoryFields,
} from "@/redux/features/resources/resourcesCategoryFormSlice";
import { RootState } from "@/redux/store";
import {
  BlogCategoryType,
  BlogCategoryValidationErrors,
} from "@/types/BlogCategory";
import { BASE_URL } from "@/utils/envVariable";
import { getImageUrl } from "@/utils/getImageUrl";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Editor = dynamic(
  () => import("@/components/dashboard/common/editor/Editor"),
  {
    ssr: false,
  },
);
type CatType = { label: string; value: string };
export default function ResoucesCategoryForm({
  category,
}: {
  category?: BlogCategoryType;
}) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<BlogCategoryValidationErrors>({});
  const {
    name,
    categoryId,
    thumbnail,
    description,
    existingThumbnail,
    deletedImage,
  } = useSelector((state: RootState) => state.resourceCategoryForm);

  const path = usePathname();
  const router = useRouter();
  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("categoryId", categoryId);
      formData.append("description", description);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      if (path.includes("edit")) {
        if (!category?._id) return;
        formData.append("existingThumbnail", existingThumbnail);
        formData.append("deletedImage", deletedImage);
        const res = await fetch(
          BASE_URL + "/api/resources-management/categories/" + category?._id,
          {
            method: "PUT",
            body: formData,
          },
        );
        const data = await res.json();
        console.log("response", data);
        if (!data.success) {
          setErrors(data.errors || {});
          toast.error(data.message);
        } else {
          dispatch(resetResourceCategoryFields());
          router.push("/dashboard/resources/categories");
          toast.success(data.message);
        }
      } else {
        const res = await fetch(
          BASE_URL + "/api/resources-management/category",
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await res.json();
        console.log("response", data);
        if (!data.success) {
          setErrors(data.errors || {});
          toast.error(data.message);
        } else {
          dispatch(resetResourceCategoryFields());
          toast.success(data.message);
        }
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (!category) {
      return;
    }
    console.log(category);
    dispatch(
      addResourceCategoryField({
        ...category,
        thumbnail: "",
        existingThumbnail: category?.thumbnail,
      }),
    );
  }, [category, dispatch]);

  return (
    <div>
      <form
        onSubmit={onHandleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4 mt-10"
      >
        <div>
          <h5 className="font-bold text-lg">Category For Resources</h5>
          <p className=" text-gray-700 mt-2">
            Create or Update category for different Resources posts
          </p>
        </div>
        <div>
          <div className="">
            <InputBox
              label="Category Name"
              name="category-name"
              value={name}
              onChange={(e) =>
                dispatch(addResourceCategoryField({ name: e.target.value }))
              }
              error={errors?.name?.msg}
            />

            {/* <SelectBox
              name="parent-categories"
              label="Parent Categories"
              value={
                categories.find((cat) => cat.value === categoryId)?.value ||
                "show"
              }
              onChange={(val) =>
                dispatch(addResourceCategoryField({ categoryId: val }))
              }
              options={[{ label: "None", value: "none" }, ...categories]}
              error={errors?.categoryId?.msg}
            /> */}
          </div>
          <div>
            <Label className="mb-4 mt-8">Thumbnail image</Label>
            <DragAndDropFiles
              MAX_FILES={1}
              onFileChange={(files) => {
                if (files && files?.length > 0) {
                  dispatch(addResourceCategoryField({ thumbnail: files[0] }));
                  dispatch(deleteExistingThumb(existingThumbnail));
                }
              }}
            />
            {errors.thumbnail && (
              <span className="text-red-500 text-xs mt-2 ml-1">
                {errors?.thumbnail?.msg}
              </span>
            )}
            {thumbnail && (
              <div className="relative w-fit">
                <Image
                  src={URL.createObjectURL(thumbnail as File)}
                  alt="preview"
                  width={220}
                  height={220}
                  className="rounded-md object-cover size-[220px]"
                />
                <button
                  className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                  type="button"
                  onClick={() =>
                    dispatch(addResourceCategoryField({ thumbnail: null }))
                  }
                >
                  <Icon
                    icon="material-symbols-light:delete-rounded"
                    width="22"
                    height="22"
                  />
                </button>
              </div>
            )}
            {existingThumbnail && (
              <div className="relative w-fit">
                <Image
                  src={getImageUrl(existingThumbnail, "resources-category")}
                  alt="preview"
                  width={220}
                  height={220}
                  className="rounded-md object-cover size-[220px]"
                />
                <button
                  className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                  type="button"
                  onClick={() => {
                    dispatch(deleteExistingThumb(existingThumbnail));
                  }}
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
            <Editor
              value={description}
              onChange={(val) =>
                dispatch(addResourceCategoryField({ description: val }))
              }
            />
            {errors.description && (
              <span className="text-red-500 text-xs mt-2 ml-1">
                {errors?.description?.msg}
              </span>
            )}
          </div>
          <Button className="ml-auto w-fit block my-8" variant="blue">
            {path.includes("edit") ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
