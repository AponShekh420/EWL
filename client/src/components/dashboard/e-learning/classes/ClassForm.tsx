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
import { addCourseField, deleteExistingThumb, resetCourseFields } from "@/redux/features/course/courseFormSlice";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { CourseTabs } from "./CourseTabs";
import dynamic from "next/dynamic";
import { CourseType, CourseValidationErrors } from "@/types/Course";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createFormData } from "@/utils/createFormData";
import { BASE_URL } from "@/utils/envVariable";
import toast from "react-hot-toast";
import { getImageUrl } from "@/utils/getImageUrl";
import { nextStep, activeStep, prevStep } from "@/redux/features/stepper/courseStepperSlice";
const Editor = dynamic(
  () => import("@/components/dashboard/common/editor/Editor"),
  {
    ssr: false,
  }
);



export default function CreateClassForm({
  speakers,
  courseData,
}: {
  speakers?: { label: string; value: string }[];
  courseData?: CourseType;
}) {
  const dispatch = useDispatch();
  const { step } = useSelector((state: RootState) => state.courseStepper);
  const courseForm = useSelector((state: RootState) => state.courseForm);
  const path = usePathname();
  const router = useRouter();
  const [errors, setErrors] = useState<CourseValidationErrors>({});
  const totalStep = 6;

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = createFormData(courseForm);

    if (path.includes("edit")) {
      if (!courseData?._id) return;
      const res = await fetch(
        BASE_URL + "/api/e-learning/course/" + courseData?._id,
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
        dispatch(resetCourseFields());
        setTimeout(() => {
          router.push("/dashboard/e-learning/courses");
        }, 2000);
      }
    } else {
      setErrors({});
      const res = await fetch(BASE_URL + "/api/e-learning/course", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!data.success) {
        setErrors(data.errors || {});
      }
      if (data.success) {
        toast.success(data.message);
        dispatch(resetCourseFields());
        dispatch(activeStep(1));
      }
    }
  };

  useEffect(() => {
    if (!courseData) return;
    const [durationNumber, durationType] = courseData?.duration
      ? courseData?.duration.split(" ")
      : ["", ""];
    dispatch(
      addCourseField({
        ...courseData,
        thumbnail: null,
        speaker: courseData?.speaker,
        category: courseData?.category,
        durationType: durationType.trim() || "",
        durationNumber: durationNumber.trim() || "",
        existingThumbnail: courseData?.thumbnail,
        existingAttachment: courseData?.attachment,
      })
    );
  }, []);

  return (
    <MultiStepper totalStep={totalStep} step={step} activeStep={activeStep} nextStep={nextStep} prevStep={prevStep}>
      <form action="#" className="min-h-[50vh]" onSubmit={onHandleSubmit}>
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4">
            <div>
              <h5 className="font-bold text-lg">Course information</h5>
              <p className=" text-gray-700 mt-2">
                Add your course necessary information from here
              </p>
            </div>
            <div>
              <div className="grid sm:grid-cols-2 gap-8">
                <InputBox
                  name="title"
                  label="title"
                  placeholder="Course title"
                  value={courseForm.title}
                  onChange={(e) =>
                    dispatch(addCourseField({ title: e.target.value }))
                  }
                  error={errors?.title?.msg}
                />
                <InputBox
                  name="headline"
                  label="Headline"
                  placeholder="Course headline"
                  value={courseForm?.headline}
                  onChange={(e) =>
                    dispatch(addCourseField({ headline: e.target.value }))
                  }
                  error={errors?.headline?.msg}
                />
                <InputBox
                  name="bio"
                  label="Bio"
                  placeholder="Course bio"
                  value={courseForm?.bio}
                  onChange={(e) =>
                    dispatch(addCourseField({ bio: e.target.value }))
                  }
                  error={errors?.bio?.msg}
                />
                <SelectBox
                  name="category"
                  label="Category"
                  defaultValue={courseForm?.category}
                  value={courseForm.category}
                  onChange={(val) =>
                    dispatch(addCourseField({ category: val }))
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
                  value={courseForm.speaker}
                  defaultValue={courseForm?.speaker}
                  onChange={(val) =>
                    dispatch(addCourseField({ speaker: val }))
                  }
                  options={speakers ? speakers : []}
                  error={errors?.speaker?.msg}
                />
                <SelectBox
                  name="status"
                  label="Status"
                  value={courseForm.status}
                  defaultValue={courseForm?.status || "publish"}
                  onChange={(val) =>
                    dispatch(addCourseField({ status: val }))
                  }
                  options={[
                    { label: "Pending", value: "pending" },
                    { label: "Draft", value: "draft" },
                    { label: "Publish", value: "publish" },
                  ]}
                  error={errors?.status?.msg}
                />
                <InputBox
                  name="date"
                  label="Date"
                  placeholder="Sun 6/18 - Sun 7/18"
                  value={courseForm.date}
                  onChange={(e) =>
                    dispatch(addCourseField({ date: e.target.value }))
                  }
                  error={errors?.date?.msg}
                />
                <InputBox
                  name="time"
                  label="Time"
                  placeholder="10:00 am est | q&a 1hr - 1 1/2hr"
                  value={courseForm.time}
                  onChange={(e) =>
                    dispatch(addCourseField({ time: e.target.value }))
                  }
                  error={errors?.time?.msg}
                />
                <InputBox
                  name="lectures"
                  label="Lectures"
                  placeholder="4 classes 1 Q&A"
                  value={courseForm.lectures}
                  onChange={(e) =>
                    dispatch(addCourseField({ lectures: e.target.value }))
                  }
                  error={errors?.lectures?.msg}
                />
                <div className="flex items-end gap-x-0.5 min-w-full">
                  <InputBox
                    parentClassName="w-full"
                    name="durationNumber"
                    label="Duration"
                    placeholder="0"
                    type="number"
                    value={courseForm.durationNumber}
                    onChange={(e) =>
                      dispatch(addCourseField({ durationNumber: e.target.value }))
                    }
                    error={errors?.durationNumber?.msg}
                  />
                  <SelectBox
                    name="durationType"
                    label=""
                    defaultValue={courseForm.durationType}
                    value={courseForm.durationType}
                    onChange={(val) =>
                      dispatch(addCourseField({ durationType: val }))
                    }
                    options={[
                    { label: "Month(s)", value: "Month" },
                    { label: "Week(s)", value: "Week" },
                    { label: "Minute(s)", value: "Minute" },
                    { label: "Day(s)", value: "Day" },
                    { label: "Hour(s)", value: "Hour" },
                    ]}
                    error={errors?.durationType?.msg}
                />
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4 ">
            <div>
              <h5 className="text-lg font-bold">Upload images</h5>
              <p className=" text-gray-700 mt-2">
                Upload your course thumbnail image here
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
                      dispatch(addCourseField({ thumbnail: files[0] }));
                    }
                  }}
                />
                {errors.thumbnail && (
                  <span className="text-red-500 text-xs mt-2 ml-1">
                    {errors?.thumbnail?.msg}
                  </span>
                )}

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {courseForm.thumbnail && (
                    <div className="relative w-fit">
                      <Image
                        src={URL.createObjectURL(courseForm?.thumbnail)}
                        alt="preview"
                        width={220}
                        height={220}
                        className="rounded-md object-cover size-[220px]"
                      />
                      <button
                        className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                        type="button"
                        onClick={() =>
                          dispatch(addCourseField({ thumbnail: null }))
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
                  {courseForm.existingThumbnail && (
                    <div className="relative w-fit">
                      <Image
                        src={getImageUrl(
                          courseForm.existingThumbnail,
                          "courses"
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
                          if (!courseForm.existingThumbnail) {
                            return;
                          }

                          dispatch(
                            deleteExistingThumb(courseForm.existingThumbnail)
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
                disabled={(courseForm.module == "" || courseForm.module == "0") ? false : true}
                icon="$"
                value={courseForm.installmentMonths}
                onChange={(e) =>
                  dispatch(addCourseField({ installmentMonths: e.target.value, module: 0 }))
                }
                error={errors?.installmentMonths?.msg}
              />
              <InputBox
                type="number"
                name="Module"
                label="Module"
                placeholder="0"
                disabled={(courseForm.installmentMonths == "" || courseForm.installmentMonths == "0") ? false : true}
                icon="$"
                value={courseForm.module}
                onChange={(e) =>
                  dispatch(addCourseField({ module: e.target.value, installmentMonths: 0 }))
                }
                error={errors?.module?.msg}
              />
              <InputBox
                type="number"
                name="price"
                label="Price"
                placeholder="20"
                icon="$"
                value={courseForm.price}
                onChange={(e) =>
                  dispatch(addCourseField({ price: e.target.value }))
                }
                error={errors?.price?.msg}
              />
            
              <div className={`${courseForm?.offline ? "-space-y-1.5" : "space-y-6"}`}>
                <div className="flex items-center gap-x-2">
                  <Checkbox
                    className="size-5 checkbox-t"
                    checked={courseForm.offline}
                    onCheckedChange={(val) =>
                      dispatch(addCourseField({ offline: val }))
                    }
                  />
                  <Label>Enable offline course</Label>
                </div>
                <InputBox
                parentClassName={courseForm?.offline ? "block" : "hidden"}
                name="externalLink"
                label=""
                placeholder="Normally used for offline classes. External link:"
                value={courseForm.externalLink}
                onChange={(e) =>
                  dispatch(addCourseField({ externalLink: e.target.value }))
                }
                error={errors?.externalLink?.msg}
                />
              </div>
            </div>
          </div>
        )}
        
        {step === 4 && (
          <div className="w-full">
            <CourseTabs/>
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
                <Editor onChange={(val) => dispatch(addCourseField({ customMessage: val }))} value={courseForm.customMessage}/>
                <div>
                  <Input
                    name="attachment"
                    type="file"
                    className="cursor-pointer rounded-t-none"
                    onChange={(e) => {
                      if (e.target.files) {
                        dispatch(
                          addCourseField({
                            attachment: e.target.files[0] as File,
                          })
                        );
                        dispatch(
                          addCourseField({
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
                value={courseForm.checkoutPageMessage}
                onChange={(e) =>
                  dispatch(
                    addCourseField({ checkoutPageMessage: e.target.value })
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
                value={courseForm.metaTitle}
                onChange={(e) =>
                  dispatch(addCourseField({ metaTitle: e.target.value }))
                }
                error={errors?.metaTitle?.msg}
              />
              {path.includes("edit") && (
                <InputBox
                  name="meta-slug"
                  label="Meta Slug"
                  placeholder="Meta slug"
                  value={courseForm.slug}
                  onChange={(e) =>
                    dispatch(addCourseField({ slug: e.target.value }))
                  }
                  error={errors?.slug?.msg}
                />
              )}

              <TextBox
                label="Meta Description"
                name="Meta Description"
                placeholder="Write meta description"
                className="min-h-30"
                value={courseForm.metaDescription}
                onChange={(e) =>
                  dispatch(addCourseField({ metaDescription: e.target.value }))
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
