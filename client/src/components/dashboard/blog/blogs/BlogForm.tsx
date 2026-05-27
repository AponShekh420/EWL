"use client";
import DragAndDropFiles from "@/components/common/DragAndDropFiles";
import InputBox from "@/components/common/InputBox";
import MultiStepper from "@/components/common/MultiStepper";
import SelectBox from "@/components/common/SelectBox";
import TextBox from "@/components/common/TextBox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addBlogField, resetBlogFields } from "@/redux/features/blog/blogFormSlice";
import { stepBlogFields, deleteExistingThumb } from "@/redux/features/blog/blogFormSlice";
// import {
//   deleteExistingThumb,
//   stepProductFields,
// } from "@/redux/features/product/productFormSlice";
import {
  activeStep,
  nextStep,
  prevStep,
} from "@/redux/features/stepper/stepperSlice";
import { RootState } from "@/redux/store";
import { BlogType, BlogValidationErrors } from "@/types/Blog";
import { createFormData } from "@/utils/createFormData";
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

export default function CreateBlogForm({
  BlogData,
  categories,
}: {
  BlogData?: BlogType;
  categories?: { label: string; value: string }[];
}) {
  const [errors, setErrors] = useState<BlogValidationErrors>({});
  const dispatch = useDispatch();
  const { step } = useSelector((state: RootState) => state.stepper);
  const blogForm = useSelector((state: RootState) => state.blogForm);
  const path = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const totalStep = 3;

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formData = createFormData(blogForm);

      if (path.includes("edit")) {
        if (!BlogData?._id) return;
        const res = await fetch(
          BASE_URL + "/api/blog/blog/" + BlogData?._id,
          {
            method: "PUT",
            body: formData,
          },
        );
        const data = await res.json();
        setLoading(false)
        if (!data.success) {
          setErrors(data.errors || {});
          toast.error(data.message);
        }
        if (data.success) {
          toast.success(data.message);
          dispatch(resetBlogFields());
          setTimeout(() => {
            router.push("/dashboard/blog-management/blogs");
          }, 2000);
        }
      } else {
        const res = await fetch(BASE_URL + "/api/blog/blog", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setLoading(false)
        if (!data.success) {
          setErrors(data.errors || {});
        }
        if (data.success) {
          toast.success(data.message);
          dispatch(resetBlogFields());
          dispatch(activeStep(1));
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
    console.log('category', BlogData)
    if (!BlogData) return;
    dispatch(
      addBlogField({
        ...BlogData,
        tags: BlogData?.tags?.join(","),
        thumbnail: null,
        category: BlogData?.category,
        existingThumbnail: BlogData?.thumbnail,
      }),
    );
  }, []);

  return (
    <MultiStepper
      totalStep={totalStep}
      step={step}
      activeStep={activeStep}
      nextStep={nextStep}
      prevStep={prevStep}
      errorTrack={{ errors, fields: stepBlogFields }}
    >
      <form className="min-h-[50vh]" onSubmit={onHandleSubmit}>
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4">
            <div>
              <h5 className="font-bold text-lg">Blog information</h5>
              <p className=" text-gray-700 mt-2">
                Add your blog description and necessary information from here
              </p>
            </div>
            <div>
              <div className="grid sm:grid-cols-2 gap-8">
                <InputBox
                  name="title"
                  label="title *"
                  placeholder="Blog title"
                  value={blogForm.title}
                  onChange={(e) =>
                    dispatch(addBlogField({ title: e.target.value }))
                  }
                  error={errors?.title?.msg}
                />

                <SelectBox
                  name="category"
                  label="Category *"
                  value={blogForm?.category}
                  defaultValue={blogForm?.category}
                  onChange={(val) =>
                    dispatch(addBlogField({ category: val }))
                  }
                  options={categories ? categories : []}
                  error={errors?.category?.msg}
                />

                <InputBox
                  name="blog-tags"
                  label="Blog tags *"
                  placeholder='Write tags separated by comma (" , ")'
                  value={blogForm.tags}
                  onChange={(e) =>
                    dispatch(addBlogField({ tags: e.target.value }))
                  }
                  error={errors?.tags?.msg}
                />
              </div>

              <div>
                <Label className="mb-4 mt-8">description</Label>
                <Editor
                  value={blogForm.description}
                  onChange={(val) =>
                    dispatch(addBlogField({ description: val }))
                  }
                />
                {errors.description && (
                  <span className="text-red-500 text-xs mt-2 ml-1">
                    {errors?.description?.msg}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4 ">
            <div>
              <h5 className="text-lg font-bold">Upload images</h5>
              <p className=" text-gray-700 mt-2">
                Upload your blog gallery and thumbnail image here
              </p>
            </div>
            <div className="grid sm:grid-cols-1 gap-8">
              <div className="">
                <label htmlFor="" className="mb-4 inline-block font-medium">
                  Thumbnail image *
                </label>
                <DragAndDropFiles
                  onFileChange={(files) => {
                    if (files && files?.length > 0) {
                      console.log(files);
                      dispatch(addBlogField({ thumbnail: files[0] }));
                    }
                  }}
                />
                {errors.thumbnail && (
                  <span className="text-red-500 text-xs mt-2 ml-1">
                    {errors?.thumbnail?.msg}
                  </span>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {blogForm.thumbnail && (
                    <div className="relative w-fit">
                      <Image
                        src={URL.createObjectURL(blogForm?.thumbnail)}
                        alt="preview"
                        width={220}
                        height={220}
                        className="rounded-md object-cover size-[220px]"
                      />
                      <button
                        className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                        type="button"
                        onClick={() =>
                          dispatch(addBlogField({ thumbnail: null }))
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
                  {blogForm.existingThumbnail && (
                    <div className="relative w-fit">
                      <Image
                        src={getImageUrl(
                          blogForm.existingThumbnail,
                          "blogs",
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
                          if (!blogForm.existingThumbnail) {
                            return;
                          }

                          dispatch(
                            deleteExistingThumb(blogForm.existingThumbnail),
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
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4">
            <div>
              <h5 className="text-lg font-bold">SEO management</h5>
              <p className=" text-gray-700 mt-2">
                Add your blog SEO meta data
              </p>
            </div>
            <div className="grid sm:grid-cols-1 gap-8">
              <InputBox
                name="meta-title"
                label="Meta Title"
                placeholder="Meta Title"
                value={blogForm.metaTitle}
                onChange={(e) =>
                  dispatch(addBlogField({ metaTitle: e.target.value }))
                }
                error={errors?.metaTitle?.msg}
              />

              <TextBox
                label="Meta Description"
                name="Meta Description"
                placeholder="Write meta description"
                className="min-h-30"
                value={blogForm.metaDescription}
                onChange={(e) =>
                  dispatch(addBlogField({ metaDescription: e.target.value }))
                }
                error={errors?.metaDescription?.msg}
              />
            </div>
          </div>
        )}
        {step === totalStep && (
          <Button disabled={loading} variant="blue" type="submit" className="ml-auto block mt-10">
            {loading ? (<Icon icon="eos-icons:loading" width="27" height="27" />) : (path.includes("edit") ? "Update" : "Submit")}
          </Button>
        )}
      </form>
    </MultiStepper>
  );
}
