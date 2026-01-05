"use client";
import DragAndDropFiles from "@/components/common/DragAndDropFiles";
import InputBox from "@/components/common/InputBox";
import SelectBox from "@/components/common/SelectBox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  addCategoryField,
  deleteExistingThumb,
  resetCategoryFields,
} from "@/redux/features/category/categoryFormSlice";
import { RootState } from "@/redux/store";
import { CategoryType, CategoryValidationErrors } from "@/types/Category";
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
  }
);
type CatType = { label: string; value: string };
export default function CategoryForm({
  category,
}: {
  category?: CategoryType;
}) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<CategoryValidationErrors>({});
  const {
    name,
    categoryId,
    thumbnail,
    description,
    existingThumbnail,
    deletedImage,
  } = useSelector((state: RootState) => state.categoryForm);
  const [categories, setCategories] = useState<CatType[]>([]);
  const path = usePathname();
  const router = useRouter();
  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        BASE_URL + "/api/ecommerce/categories/" + category?._id,
        {
          method: "PUT",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("response", data);
      if (!data.success) {
        setErrors(data.errors || {});
        toast.error(data.message);
      } else {
        dispatch(resetCategoryFields());
        router.push("/dashboard/ecommerce/categories");
        toast.success(data.message);
      }
    } else {
      const categoryPath =
        !categoryId || categoryId === "none" ? "category" : "subcategory";
      const res = await fetch(BASE_URL + "/api/ecommerce/" + categoryPath, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("response", data);
      if (!data.success) {
        setErrors(data.errors || {});
        toast.error(data.message);
      } else {
        dispatch(resetCategoryFields());
        toast.success(data.message);
      }
    }
  };
  useEffect(() => {
    fetch(BASE_URL + "/api/ecommerce/categories")
      .then((res) => res.json())
      .then((data) => {
        const formattedCategories = data.data.map(
          (category: { name: string; _id: string }) => ({
            label: category.name,
            value: category._id,
          })
        );
        setCategories(formattedCategories);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);
  useEffect(() => {
    if (!category) {
      return;
    }
    console.log(category);
    dispatch(
      addCategoryField({
        ...category,
        thumbnail: "",
        existingThumbnail: category?.thumbnail,
      })
    );
  }, [category, dispatch]);
  useEffect(() => {
    console.log(deletedImage);
  }, [deletedImage]);

  return (
    <div>
      <form
        onSubmit={onHandleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4 mt-10"
      >
        <div>
          <h5 className="font-bold text-lg">Category For Product</h5>
          <p className=" text-gray-700 mt-2">
            Create or Update category for different product
          </p>
        </div>
        <div>
          <div className="grid sm:grid-cols-2 gap-8">
            <InputBox
              label="Category Name"
              name="category-name"
              value={name}
              onChange={(e) =>
                dispatch(addCategoryField({ name: e.target.value }))
              }
              error={errors?.name?.msg}
            />

            <SelectBox
              name="parent-categories"
              label="Parent Categories"
              value={categories.find((cat) => cat.value === categoryId)?.value}
              onChange={(val) =>
                dispatch(addCategoryField({ categoryId: val }))
              }
              options={[{ label: "None", value: "none" }, ...categories]}
              error={errors?.categoryId?.msg}
            />
          </div>
          <div>
            <Label className="mb-4 mt-8">Thumbnail image</Label>
            <DragAndDropFiles
              MAX_FILES={1}
              onFileChange={(files) => {
                if (files && files?.length > 0) {
                  dispatch(addCategoryField({ thumbnail: files[0] }));
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
                    dispatch(addCategoryField({ thumbnail: null }))
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
                  src={getImageUrl(existingThumbnail, "category")}
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
                dispatch(addCategoryField({ description: val }))
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
