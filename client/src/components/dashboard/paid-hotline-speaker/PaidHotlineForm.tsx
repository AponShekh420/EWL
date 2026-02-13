"use client";
import DragAndDropFiles from "@/components/common/DragAndDropFiles";
import InputBox from "@/components/common/InputBox";
import SelectBox from "@/components/common/SelectBox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  addCategoryField,
  deleteExistingThumb,
} from "@/redux/features/category/categoryFormSlice";
import {
  addPaidHotlineField,
  deleteExistingAvatar,
  resetPaidHotlineFields,
} from "@/redux/features/paid-hotline-speaker/paidHotlinSpeaker";
import { RootState } from "@/redux/store";
import {
  PaidHotlineSpeakerType,
  PaidHotlineSpeakerValidationErrors,
} from "@/types/PaidHotlineSpeaker";
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

export default function PaidHotlineForm({
  paidHotlineSpeaker,
}: {
  paidHotlineSpeaker?: PaidHotlineSpeakerType;
}) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<PaidHotlineSpeakerValidationErrors>({} as PaidHotlineSpeakerValidationErrors);
  const {
    fullname,
    speakerId,
    avatar,
    speciality,
    description,
    gender,
    existingAvatar,
    deletedImage,
  } = useSelector((state: RootState) => state.paidHotlineSpeaker);
  const path = usePathname();
  const router = useRouter();

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("speakerId", speakerId);
    formData.append("speciality", speciality);
    formData.append("description", description);
    formData.append("gender", gender);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    if (path.includes("edit")) {
      console.log(paidHotlineSpeaker?._id);
      if (!paidHotlineSpeaker?._id) return;
      formData.append("existingAvatar", existingAvatar);
      formData.append("deletedImage", deletedImage);
      const res = await fetch(
        BASE_URL + "/api/paid-hotline/speaker/" + paidHotlineSpeaker?._id,
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
        dispatch(resetPaidHotlineFields());
        router.push("/dashboard/paid-hotline-speaker");
        toast.success(data.message);
      }
    } else {
      const res = await fetch(BASE_URL + "/api/paid-hotline/speaker", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("response", data);
      if (!data.success) {
        setErrors(data.errors || {});
        toast.error(data.message);
      } else {
        dispatch(resetPaidHotlineFields());
        toast.success(data.message);
      }
    }
  };

  useEffect(() => {
    if (!paidHotlineSpeaker) {
      return;
    }
    console.log(paidHotlineSpeaker);
    dispatch(
      addPaidHotlineField({
        ...paidHotlineSpeaker,
        avatar: "",
        existingAvatar: paidHotlineSpeaker?.avatar,
      }),
    );
  }, [paidHotlineSpeaker, dispatch]);
  useEffect(() => {
    console.log(fullname);
  }, [fullname]);

  return (
    <div>
      <form
        onSubmit={onHandleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4 mt-10"
      >
        <div>
          <h5 className="font-bold text-lg">Paid Hotline Speaker</h5>
          <p className=" text-gray-700 mt-2">
            Create or Update Paid Hotline Speaker
          </p>
        </div>
        <div>
          <div className="grid sm:grid-cols-2 gap-8">
            <InputBox
              label="fullname"
              name="fullname"
              value={fullname}
              onChange={(e) =>
                dispatch(addPaidHotlineField({ fullname: e.target.value }))
              }
              error={errors?.fullname?.msg}
            />
            <InputBox
              label="Speciality"
              name="speciality"
              value={speciality}
              onChange={(e) =>
                dispatch(addPaidHotlineField({ speciality: e.target.value }))
              }
              error={errors?.speciality?.msg}
            />

            <SelectBox
              name="gender"
              label="Gender"
              value={gender}
              onChange={(val) => dispatch(addPaidHotlineField({ gender: val }))}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              error={errors?.gender?.msg}
            />
          </div>
          <div>
            <Label className="mb-4 mt-8">Avatar</Label>
            <DragAndDropFiles
              MAX_FILES={1}
              onFileChange={(files) => {
                if (files && files?.length > 0) {
                  dispatch(addPaidHotlineField({ avatar: files[0] }));
                  dispatch(deleteExistingAvatar(existingAvatar));
                }
              }}
            />
            {errors.avatar && (
              <span className="text-red-500 text-xs mt-2 ml-1">
                {errors?.avatar?.msg}
              </span>
            )}
            {avatar && (
              <div className="relative w-fit">
                <Image
                  src={URL.createObjectURL(avatar as File)}
                  alt="preview"
                  width={220}
                  height={220}
                  className="rounded-md object-cover size-[220px]"
                />
                <button
                  className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                  type="button"
                  onClick={() => dispatch(addCategoryField({ avatar: null }))}
                >
                  <Icon
                    icon="material-symbols-light:delete-rounded"
                    width="22"
                    height="22"
                  />
                </button>
              </div>
            )}
            {existingAvatar && (
              <div className="relative w-fit">
                <Image
                  src={getImageUrl(existingAvatar, "profile")}
                  alt="preview"
                  width={220}
                  height={220}
                  className="rounded-md object-cover size-[220px]"
                />
                <button
                  className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                  type="button"
                  onClick={() => {
                    dispatch(deleteExistingThumb(existingAvatar));
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
                dispatch(addPaidHotlineField({ description: val }))
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
