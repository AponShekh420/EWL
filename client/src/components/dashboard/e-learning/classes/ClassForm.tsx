"use client";
import DragAndDropFiles from "@/components/common/DragAndDropFiles";
import InputBox from "@/components/common/InputBox";
import MultiStepper from "@/components/common/MultiStepper";
import SelectBox from "@/components/common/SelectBox";
import TextBox from "@/components/common/TextBox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createFormData } from "@/utils/createFormData";
import { BASE_URL } from "@/utils/envVariable";
import toast from "react-hot-toast";
import { getImageUrl } from "@/utils/getImageUrl";
import { nextStep, activeStep, prevStep } from "@/redux/features/stepper/classStepperSlice";
import { ClassContents } from "./ClassContents";
import { ClassType, ClassValidationErrors } from "@/types/Class";
import { addClassField, deleteExistingThumb, resetClassFields } from "@/redux/features/class/classFormSlice";
const Editor = dynamic(
  () => import("@/components/dashboard/common/editor/Editor"),
  {
    ssr: false,
  }
);

export default function CreateClassForm({
  speakers,
  classData,
}: {
  speakers?: { label: string; value: string }[];
  classData?: ClassType;
}) {
  const dispatch = useDispatch();
  const { step } = useSelector((state: RootState) => state.classStepper);
  const classForm = useSelector((state: RootState) => state.classForm);
  const path = usePathname();
  const router = useRouter();
  const [errors, setErrors] = useState<ClassValidationErrors>({});
  const totalStep = 6;

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = createFormData(classForm);

    if (path.includes("edit")) {
      if (!classData?._id) return;
      const res = await fetch(
        BASE_URL + "/api/e-learning/class/" + classData?._id,
        {
          method: "PUT",
          body: formData,
        }
      );
      const data = await res.json();

      if (!data.success) {
        setErrors(data.errors || {});
        toast.error(data.message);
      }
      if (data.success) {
        toast.success(data.message);
        dispatch(resetClassFields());
        setTimeout(() => {
          router.push("/dashboard/e-learning/classes");
        }, 2000);
      }
    } else {
      setErrors({});
      const res = await fetch(BASE_URL + "/api/e-learning/class", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!data.success) {
        setErrors(data.errors || {});
      }
      if (data.success) {
        toast.success(data.message);
        dispatch(resetClassFields());
        dispatch(activeStep(1));
      }
    }
  };

  useEffect(() => {
    if (!classData) return;
    
    dispatch(
      addClassField({
        ...classData,
        thumbnail: null,
        speaker: classData?.speaker,
        category: classData?.category,
        existingThumbnail: classData?.thumbnail,
        existingAttachment: classData?.attachment,
        audiosOne: [],
        existingAudiosOne: classData?.audiosOne,
        audiosTwo: [],
        existingAudiosTwo: classData?.audiosTwo,
        videosTwo: [],
        videosOne: [],
        existingVideosTwo: classData?.videosTwo,
        existingVideosOne: classData?.videosOne,
      })
    );
  }, []);

  return (
    <MultiStepper totalStep={totalStep} step={step} activeStep={activeStep} nextStep={nextStep} prevStep={prevStep}>
      <form action="#" className="min-h-[50vh]" onSubmit={onHandleSubmit}>
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4">
            <div>
              <h5 className="font-bold text-lg">Class information</h5>
              <p className=" text-gray-700 mt-2">
                Add your class necessary information from here
              </p>
            </div>
            <div>
              <div className="grid sm:grid-cols-2 gap-8">
                <InputBox
                  name="title"
                  label="title"
                  placeholder="Class title"
                  value={classForm.title}
                  onChange={(e) =>
                    dispatch(addClassField({ title: e.target.value }))
                  }
                  error={errors?.title?.msg}
                />
                <SelectBox
                  name="category"
                  label="Category"
                  defaultValue={classForm?.category}
                  value={classForm.category}
                  onChange={(val) =>
                    dispatch(addClassField({ category: val }))
                  }
                  options={[
                  { label: "Men", value: "men" },
                  { label: "Women", value: "women" },
                  { label: "Couples", value: "couples" },
                  ]}
                  error={errors?.category?.msg}
                />
                <SelectBox
                  name="speaker"
                  label="Speaker"
                  value={classForm.speaker}
                  defaultValue={classForm?.speaker}
                  onChange={(val) =>
                    dispatch(addClassField({ speaker: val }))
                  }
                  options={speakers ? speakers : []}
                  error={errors?.speaker?.msg}
                />
                <SelectBox
                  name="status"
                  label="Status"
                  value={classForm.status}
                  defaultValue={classForm?.status || "publish"}
                  onChange={(val) =>
                    dispatch(addClassField({ status: val }))
                  }
                  options={[
                    { label: "Pending", value: "pending" },
                    { label: "Draft", value: "draft" },
                    { label: "Publish", value: "publish" },
                  ]}
                  error={errors?.status?.msg}
                />
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4 ">
            <div>
              <h5 className="text-lg font-bold">Upload images</h5>
              <p className=" text-gray-700 mt-2">
                Upload your class thumbnail image here
              </p>
            </div>
            <div className="grid sm:grid-cols-1 gap-8">
              <div className="">
                <label htmlFor="" className="mb-4 inline-block font-medium">
                  Thumbnail image
                </label>
                <DragAndDropFiles
                  onFileChange={(files) => {
                    if (files && files?.length > 0) {
                      console.log(files);
                      dispatch(addClassField({ thumbnail: files[0] }));
                    }
                  }}
                />
                {errors.thumbnail && (
                  <span className="text-red-500 text-xs mt-2 ml-1">
                    {errors?.thumbnail?.msg}
                  </span>
                )}

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {classForm.thumbnail && (
                    <div className="relative w-fit">
                      <Image
                        src={URL.createObjectURL(classForm?.thumbnail)}
                        alt="preview"
                        width={220}
                        height={220}
                        className="rounded-md object-cover size-[220px]"
                      />
                      <button
                        className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                        type="button"
                        onClick={() =>
                          dispatch(addClassField({ thumbnail: null }))
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
                  {classForm.existingThumbnail && (
                    <div className="relative w-fit">
                      <Image
                        src={getImageUrl(
                          classForm.existingThumbnail,
                          "classes"
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
                          if (!classForm.existingThumbnail) {
                            return;
                          }

                          dispatch(
                            deleteExistingThumb(classForm.existingThumbnail)
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
              <h5 className="text-lg font-bold">Inventory management</h5>
              <p className=" text-gray-700 mt-2">
                Add your inventory details here
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">

              <InputBox
                type="number"
                name="installment-months"
                label="Installment Months"
                placeholder="25"
                disabled={(classForm.module == "" || classForm.module == "0") ? false : true}
                icon="$"
                value={classForm.installmentMonths}
                onChange={(e) =>
                  dispatch(addClassField({ installmentMonths: e.target.value, module: 0 }))
                }
                error={errors?.installmentMonths?.msg}
              />
              <InputBox
                type="number"
                name="Module"
                label="Module"
                placeholder="0"
                disabled={(classForm.installmentMonths == "" || classForm.installmentMonths == "0") ? false : true}
                icon="$"
                value={classForm.module}
                onChange={(e) =>
                  dispatch(addClassField({ module: e.target.value, installmentMonths: 0 }))
                }
                error={errors?.module?.msg}
              />
              <InputBox
                type="number"
                name="price"
                label="Price"
                placeholder="20"
                icon="$"
                value={classForm.price}
                onChange={(e) =>
                  dispatch(addClassField({ price: e.target.value }))
                }
                error={errors?.price?.msg}
              />
            
              <div className={`${classForm?.offline ? "-space-y-1.5" : "space-y-6"}`}>
                <div className="flex items-center gap-x-2">
                  <Checkbox
                    className="size-5 checkbox-t"
                    checked={classForm.offline}
                    onCheckedChange={(val) =>
                      dispatch(addClassField({ offline: val }))
                    }
                  />
                  <Label>Enable offline class</Label>
                </div>
                <InputBox
                parentClassName={classForm?.offline ? "block" : "hidden"}
                name="externalLink"
                label=""
                placeholder="Normally used for offline classes. External link:"
                value={classForm.externalLink}
                onChange={(e) =>
                  dispatch(addClassField({ externalLink: e.target.value }))
                }
                error={errors?.externalLink?.msg}
                />
              </div>
            </div>
          </div>
        )}
        
        {step === 4 && (
          <div className="w-full">
            <ClassContents errors={errors}/>
          </div>
        )}
        {step === 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4">
            <div>
              <h5 className="text-lg font-bold">Message management</h5>
              <p className=" text-gray-700 mt-2">
                Add your custom and checkout message
              </p>
            </div>
            <div className="space-y-15">
              <div>
                <Label htmlFor={"custom-message"} className="capitalize mb-4">
                  Order confirmation Email
                </Label>
                <Editor onChange={(val) => dispatch(addClassField({ customMessage: val }))} value={classForm.customMessage}/>
                <div>
                  <Input
                    name="attachment"
                    type="file"
                    className="cursor-pointer rounded-t-none"
                    onChange={(e) => {
                      if (e.target.files) {
                        dispatch(
                          addClassField({
                            attachment: e.target.files[0] as File,
                          })
                        );
                        dispatch(
                          addClassField({
                            existingAttachment: "",
                          })
                        );
                      }
                    }}
                  />
                  {errors.customMessage && (
                    <span className="text-red-500 text-xs mt-2 ml-1">
                      {errors?.customMessage?.msg}
                    </span>
                  )}
                </div>
              </div>
              
              <TextBox
                label="Message on checkout page"
                name="checkout-message"
                placeholder="Write checkout page message"
                value={classForm.checkoutPageMessage}
                onChange={(e) =>
                  dispatch(
                    addClassField({ checkoutPageMessage: e.target.value })
                  )
                }
                error={errors?.checkoutPageMessage?.msg}
              />
            </div>
          </div>
        )}
        {step === 6 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4">
            <div>
              <h5 className="text-lg font-bold">SEO management</h5>
              <p className=" text-gray-700 mt-2">
                Add your product SEO meta data
              </p>
            </div>
            <div className="grid sm:grid-cols-1 gap-8">
              <InputBox
                name="meta-title"
                label="Meta Title"
                placeholder="Meta Title"
                value={classForm.metaTitle}
                onChange={(e) =>
                  dispatch(addClassField({ metaTitle: e.target.value }))
                }
                error={errors?.metaTitle?.msg}
              />
              {path.includes("edit") && (
                <InputBox
                  name="meta-slug"
                  label="Meta Slug"
                  placeholder="Meta slug"
                  value={classForm.slug}
                  onChange={(e) =>
                    dispatch(addClassField({ slug: e.target.value }))
                  }
                  error={errors?.slug?.msg}
                />
              )}

              <TextBox
                label="Meta Description"
                name="Meta Description"
                placeholder="Write meta description"
                className="min-h-30"
                value={classForm.metaDescription}
                onChange={(e) =>
                  dispatch(addClassField({ metaDescription: e.target.value }))
                }
                error={errors?.metaDescription?.msg}
              />
            </div>
          </div>
        )}
        {step === totalStep && (
          <Button variant="blue" type="submit" className="ml-auto block mt-10">
            {path.includes("edit") ? "Update" : "Submit"}
          </Button>
        )}
      </form>
    </MultiStepper>
  );
}
