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
import { addCourseField } from "@/redux/features/course/courseFormSlice";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { CourseTabs } from "./CourseTabs";
import Editor from "../../common/editor/Editor";

export default function CreateCourseForm() {
  const dispatch = useDispatch();
  const { step } = useSelector((state: RootState) => state.stepper);
  const courseForm = useSelector((state: RootState) => state.courseForm);
  const totalStep = 6;

  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.clear();
    console.log(courseForm);
  };

  return (
    <MultiStepper totalStep={totalStep}>
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
                />
                <SelectBox
                  name="category"
                  label="Category"
                  value={courseForm.category}
                  onChange={(val) =>
                    dispatch(addCourseField({ category: val }))
                  }
                  options={[
                  { label: "Men", value: "Men" },
                  { label: "Women", value: "Women" },
                  { label: "Couples", value: "Couples" },
                  ]}
                />
                <InputBox
                  name="date"
                  label="Date"
                  placeholder="Sun 6/18 - Sun 7/18"
                  value={courseForm.date}
                  onChange={(e) =>
                    dispatch(addCourseField({ date: e.target.value }))
                  }
                />
                <InputBox
                  name="time"
                  label="Time"
                  placeholder="10:00 am est | q&a 1hr - 1 1/2hr"
                  value={courseForm.time}
                  onChange={(e) =>
                    dispatch(addCourseField({ time: e.target.value }))
                  }
                />
                <InputBox
                  name="lectures"
                  label="Lectures"
                  placeholder="4 classes 1 Q&A"
                  value={courseForm.lectures}
                  onChange={(e) =>
                    dispatch(addCourseField({ lectures: e.target.value }))
                  }
                />
                <div className="flex items-end gap-x-0.5 min-w-full">
                  <InputBox
                    parentClassName="w-full"
                    name="DurationNumber"
                    label="Duration"
                    placeholder="0"
                    type="number"
                    value={courseForm.DurationNumber}
                    onChange={(e) =>
                      dispatch(addCourseField({ DurationNumber: e.target.value }))
                    }
                  />
                  <SelectBox
                    name="DurationType"
                    label=""
                    value={courseForm.DurationType}
                    onChange={(val) =>
                      dispatch(addCourseField({ DurationType: val }))
                    }
                    options={[
                    { label: "Month(s)", value: "Month" },
                    { label: "Week(s)", value: "Week" },
                    { label: "Minute(s)", value: "Minute" },
                    { label: "Day(s)", value: "Day" },
                    { label: "Hour(s)", value: "Hour" },
                    ]}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {courseForm.thumbnail && (
                    <div className="relative w-fit">
                      <Image
                        src={URL.createObjectURL(courseForm.thumbnail)}
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
                name="regular-price"
                label="Regular Price"
                placeholder="25"
                icon="$"
                value={courseForm.regularPrice}
                onChange={(e) =>
                  dispatch(addCourseField({ regularPrice: e.target.value }))
                }
              />
              <InputBox
                type="number"
                name="sale-price"
                label="Sale Price"
                placeholder="20"
                icon="$"
                value={courseForm.salePrice}
                onChange={(e) =>
                  dispatch(addCourseField({ salePrice: e.target.value }))
                }
              />
            
              <div className="space-y-10">
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
              </div>
              <InputBox
                parentClassName={courseForm?.offline ? "block" : "hidden"}
                name="ExternalLink"
                label="External link"
                placeholder="Normally used for offline classes. Ex: link to a contact page"
                value={courseForm.ExternalLink}
                onChange={(e) =>
                  dispatch(addCourseField({ ExternalLink: e.target.value }))
                }
              />
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
            <div className="grid sm:grid-cols-2 gap-8">
              
              <div>
                <Label htmlFor={"custom-message"} className="capitalize mb-4">
                  Add a custom message
                </Label>
                <Editor onChange={(val) => dispatch(addCourseField({ customMessage: val }))} value={courseForm.customMessage}/>
              </div>
              
              <div>
                <Label className="mb-4">Upload your file</Label>{" "}
                <Input
                  name="attachment"
                  type="file"
                  onChange={(e) =>
                    dispatch(addCourseField({ attachment: e.target.files }))
                  }
                />
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
              />
            </div>
          </div>
        )}
        {step === 6 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4">
            <div>
              <h5 className="text-lg font-bold">SEO management</h5>
              <p className=" text-gray-700 mt-2">
                Add your course SEO meta data
              </p>
            </div>
            <div className="grid sm:grid-cols-1 gap-8">
              <InputBox
                name="meta-title"
                label="Meta Title"
                placeholder="Meta Title"
                value={courseForm.metaData}
                onChange={(e) =>
                  dispatch(addCourseField({ metaData: e.target.value }))
                }
              />
              <TextBox
                label="Meta Description"
                name="Meta Description"
                placeholder="Write meta description"
                className="min-h-30"
                value={courseForm.metaDescription}
                onChange={(e) =>
                  dispatch(addCourseField({ metaDescription: e.target.value }))
                }
              />
            </div>
          </div>
        )}
        {step === totalStep && (
          <Button variant="blue" type="submit" className="ml-auto block mt-10">
            Submit
          </Button>
        )}
      </form>
    </MultiStepper>
  );
}
