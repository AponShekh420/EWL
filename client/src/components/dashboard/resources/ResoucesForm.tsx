"use client";
import DragAndDropFiles from "@/components/common/DragAndDropFiles";
import InputBox from "@/components/common/InputBox";
import SelectBox from "@/components/common/SelectBox";
import TextBox from "@/components/common/TextBox";
import { Button } from "@/components/ui/button";
import {
  addResourcesField,
  deleteExistingThumb,
  resetResourcesFields,
} from "@/redux/features/resources/ResourcesFormSlice";
import { RootState } from "@/redux/store";
import { BlogValidationErrors } from "@/types/Blog";
import { ResourcesType } from "@/types/Resources";
import { createFormData } from "@/utils/createFormData";
import { BASE_URL } from "@/utils/envVariable";
import { getImageUrl } from "@/utils/getImageUrl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function ResourcesForm({
  resourcesData,
  categories,
}: {
  resourcesData?: ResourcesType;
  categories?: { label: string; value: string }[];
}) {
  const [errors, setErrors] = useState<BlogValidationErrors>({});
  const dispatch = useDispatch();
  const resourceForm = useSelector((state: RootState) => state.resourceForm);
  const path = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = createFormData(resourceForm);

      if (path.includes("edit")) {
        if (!resourcesData?._id) return;
        const res = await fetch(
          BASE_URL +
            "/api/resources-management/resources/" +
            resourcesData?._id,
          {
            method: "PUT",
            body: formData,
          },
        );
        const data = await res.json();
        setLoading(false);
        if (!data.success) {
          setErrors(data.errors || {});
          toast.error(data.message);
        }
        if (data.success) {
          toast.success(data.message);
          dispatch(resetResourcesFields());
          setTimeout(() => {
            router.push("/dashboard/resources");
          }, 2000);
        }
      } else {
        const res = await fetch(
          BASE_URL + "/api/resources-management/resources",
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await res.json();
        setLoading(false);
        if (!data.success) {
          setErrors(data.errors || {});
        }
        if (data.success) {
          toast.success(data.message);
          dispatch(resetResourcesFields());
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
    console.log(resourcesData);
    if (!resourcesData) return;
    dispatch(
      addResourcesField({
        ...resourcesData,
        thumbnail: null,
        category: resourcesData?.category,
        existingThumbnail: resourcesData?.thumbnail,
      }),
    );
  }, []);

  return (
    <form className="min-h-[50vh] my-10" onSubmit={onHandleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4">
        <div>
          <h5 className="font-bold text-lg">Resouces information</h5>
          <p className=" text-gray-700 mt-2">
            Add your resouces description and necessary information from here
          </p>
        </div>
        <div>
          <div className="grid sm:grid-cols-2 gap-8">
            <InputBox
              name="title"
              label="title *"
              placeholder="Resource title"
              value={resourceForm.title}
              onChange={(e) =>
                dispatch(addResourcesField({ title: e.target.value }))
              }
              error={errors?.title?.msg}
            />
            <InputBox
              name="Link"
              label="Link *"
              placeholder="https://example.com"
              value={resourceForm.link}
              onChange={(e) =>
                dispatch(addResourcesField({ link: e.target.value }))
              }
              error={errors?.title?.msg}
            />

            <SelectBox
              name="category"
              label="Category *"
              value={resourceForm?.category}
              defaultValue={resourceForm?.category}
              onChange={(val) => dispatch(addResourcesField({ category: val }))}
              options={categories ? categories : []}
              error={errors?.category?.msg}
            />
          </div>
          <div className=" mt-4">
            <label htmlFor="" className="mb-4 inline-block font-medium">
              Thumbnail image *
            </label>
            <DragAndDropFiles
              onFileChange={(files) => {
                if (files && files?.length > 0) {
                  console.log(files);
                  dispatch(addResourcesField({ thumbnail: files[0] }));
                }
              }}
            />
            {errors.thumbnail && (
              <span className="text-red-500 text-xs mt-2 ml-1">
                {errors?.thumbnail?.msg}
              </span>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {resourceForm.thumbnail && (
                <div className="relative w-fit">
                  <Image
                    src={URL.createObjectURL(resourceForm?.thumbnail)}
                    alt="preview"
                    width={220}
                    height={220}
                    className="rounded-md object-cover size-[220px]"
                  />
                  <button
                    className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                    type="button"
                    onClick={() =>
                      dispatch(addResourcesField({ thumbnail: null }))
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
              {resourceForm.existingThumbnail && (
                <div className="relative w-fit">
                  <Image
                    src={getImageUrl(
                      resourceForm.existingThumbnail,
                      "resources",
                    )}
                    alt="preview"
                    width={220}
                    height={220}
                    className="rounded-md object-cover size-[220px]"
                  />
                  <button
                    className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                    type="button"
                    onClick={() => {
                      if (!resourceForm.existingThumbnail) {
                        return;
                      }

                      dispatch(
                        deleteExistingThumb(resourceForm.existingThumbnail),
                      );
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
          </div>
          <div className="mt-4">
            <TextBox
              name="description"
              label="Description"
              className="min-h-40"
              value={resourceForm.description}
              onChange={(e) =>
                dispatch(addResourcesField({ description: e.target.value }))
              }
            />

            {errors.description && (
              <span className="text-red-500 text-xs mt-2 ml-1">
                {errors?.description?.msg}
              </span>
            )}
          </div>
          <Button
            disabled={loading}
            variant="blue"
            type="submit"
            className="ml-auto block mt-10"
          >
            {loading ? (
              <Icon icon="eos-icons:loading" width="27" height="27" />
            ) : path.includes("edit") ? (
              "Update"
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
