"use client";

import SelectBox from "@/components/common/SelectBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {
  addRecordingField,
  addRecordInsideList,
  deleteExistingRecordInsideList,
  deleteRecordInsideList,
  resetRecordingFields,
} from "@/redux/features/recording/recordingSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  IRecording,
  IRecordingItem,
  recordingCatType,
  RecordingValidationErrors,
} from "@/types/Recording";
import { BASE_URL } from "@/utils/envVariable";
import { getImageUrl } from "@/utils/getImageUrl";
import { Icon } from "@iconify/react";
import {
  Check,
  ChevronsUpDown,
  ChevronUp,
  Link as LinkIcon,
  Plus,
  Upload,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
type dropdownType = {
  value: string;
  label: string;
};
export default function AddClassPage({ record }: { record?: IRecording }) {
  // Select States
  const [openClass, setOpenClass] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);
  const [openSpeaker, setOpenSpeaker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RecordingValidationErrors>({});
  const path = usePathname();
  const router = useRouter();
  const [allSpeaker, setAllSpeaker] = useState<dropdownType[]>([]);
  const [allClass, setAllClass] = useState<dropdownType[]>([]);
  const [allCourse, setAllCourse] = useState<dropdownType[]>([]);
  // Media States
  const [mediaType, setMediaType] = useState<"audio" | "video">("video");

  // The Dynamic List
  const [recordData, setRecordData] = useState({
    externalLink: "",
    sourceType: "internal",
    recordNumber: "",
    file: null as File | null,
  });

  const {
    heading,
    classId,
    courseId,
    gender,
    speakerId,
    recordingCategory,
    recordings,
    existingRecordings,
    deletedRecordings,
  } = useSelector((state: RootState) => state.recording);

  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRecordData({ ...recordData, file: file });
      setLoading(true);
    }
  };

  const handleAddClass = () => {
    const merseRecordings = [...recordings, ...existingRecordings];
    const maxRecording = merseRecordings.length
      ? merseRecordings.reduce((max, item) =>
          item.recordNumber > max.recordNumber ? item : max,
        )
      : null;

    const newEntry = {
      id: Date.now(),
      recordNumber: recordData.recordNumber
        ? Number(recordData.recordNumber)
        : maxRecording?.recordNumber
          ? Number(maxRecording?.recordNumber) + 1
          : 1,
      sourceType: recordData.sourceType,
      mediaType: mediaType,
      externalLink: recordData.externalLink ? recordData.externalLink : "",
      url:
        recordData.sourceType === "external"
          ? recordData.externalLink
          : recordData.file
            ? URL.createObjectURL(recordData.file)
            : "",
      file: recordData.file ? recordData.file : "",
    };

    if (newEntry.url) {
      dispatch(addRecordInsideList(newEntry));
      // Reset form part
      setRecordData({
        externalLink: "",
        sourceType: "internal",
        recordNumber: "",
        file: null as File | null,
      });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("recordingCategory", recordingCategory);
    if (recordingCategory === "class") {
      formData.append("classId", "696c6bf810f05265251fc23d");
    }
    if (recordingCategory === "course") {
      formData.append("courseId", courseId);
    }
    if (recordingCategory === "free") {
      formData.append("gender", gender);
      formData.append("speakerId", speakerId);
    }
    recordings.forEach((rec: IRecordingItem, index) => {
      formData.append(`recordings[${index}][id]`, rec.id);
      if (rec.recordNumber) {
        formData.append(
          `recordings[${index}][recordNumber]`,
          String(rec.recordNumber),
        );
      }

      formData.append(`recordings[${index}][sourceType]`, rec.sourceType);
      formData.append(`recordings[${index}][mediaType]`, rec.mediaType);
      if (rec.externalLink) {
        formData.append(`recordings[${index}][externalLink]`, rec.externalLink);
      }

      if (rec.file) {
        formData.append(`recordings[${index}][file]`, rec.file);
      }
    });

    if (path.includes("edit")) {
      if (deletedRecordings.length > 0) {
        deletedRecordings.forEach((rec: IRecordingItem) => {
          if (rec.file) {
            formData.append(`deletedImages`, rec.file as string);
          }
        });
      }
      if (existingRecordings.length > 0) {
        formData.append(
          `existingRecordings`,
          JSON.stringify(existingRecordings),
        );
      }
    }
    try {
      if (path.includes("edit")) {
        if (!record?._id) return;
        const response = await fetch(
          BASE_URL + "/api/e-learning/recording/" + record._id,
          {
            method: "PUT",
            body: formData,
          },
        );
        const data = await response.json();
        console.log("Server Response:", data);
        if (data.errors && !data.success) {
          setErrors(data.errors);
          toast.error("Recording updated Fail!");
        } else {
          toast.success("Recording updated successfully");
          dispatch(resetRecordingFields());
          router.push("/dashboard/e-learning/records");
        }
      } else {
        const response = await fetch(BASE_URL + "/api/e-learning/recording", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log("Server Response:", data);

        if (data.errors && !data.success) {
          setErrors(data.errors);
          toast.error("Recording created Fail!");
        } else {
          toast.success("Recording created successfully");
          dispatch(resetRecordingFields());
        }
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error)?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (record) {
      dispatch(
        addRecordingField({
          ...record,
          classId: record.class || "",
          speakerId: record.speaker || "",
          courseId: record.course || "",
          recordingCategory: record.recordingCategory as recordingCatType,
          recordings: [],
          existingRecordings: record.recordings,
        }),
      );
    }
  }, []);
  const getApiData = async (url: string) => {
    const res = await fetch(BASE_URL + url);
    return res.json();
  };
  useEffect(() => {
    const classUrl = "/api/e-learning/classes";
    const courseUrl = "/api/e-learning/courses";
    const speakerUrl = "/api/account/speakers";
    if (recordingCategory === "class") {
      getApiData(classUrl)
        .then((data) => {
          const classes = data.data.map(
            (item: { title: string; _id: string }) => ({
              label: item.title,
              value: item._id,
            }),
          );
          setAllClass(classes);
        })
        .catch((err) => console.log(err));
    } else if (recordingCategory === "course") {
      getApiData(courseUrl)
        .then((data) => {
          const courses = data.data.map(
            (item: { title: string; _id: string }) => ({
              label: item.title,
              value: item._id,
            }),
          );
          setAllCourse(courses);
        })
        .catch((err) => console.log(err));
    } else {
      getApiData(speakerUrl)
        .then((data) => {
          const speakers = data.data.map(
            (item: { firstName: string; lastName: string; _id: string }) => ({
              label: item.firstName + " " + item.lastName,
              value: item._id,
            }),
          );
          setAllSpeaker(speakers);
        })
        .catch((err) => console.log(err));
    }
  }, [recordingCategory]);
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12 bg-white min-h-screen font-sans text-slate-900">
      <Button
        onClick={handleSubmit}
        variant="outline"
        className="border-slate-300 px-6 text-lg uppercase  bg-teal text-white hover:bg-teal/80 transition-colors fixed bottom-10 right-10"
      >
        Submit
      </Button>
      {/* SECTION 1: Header Inputs */}
      <div className="space-y-6">
        <RadioGroup
          defaultValue="free"
          value={recordingCategory}
          onValueChange={(value) =>
            dispatch(
              addRecordingField({
                recordingCategory: value as recordingCatType,
              }),
            )
          }
          className="flex gap-8 py-2"
        >
          {["Free", "Class", "Course"].map((item) => (
            <div
              key={item}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <RadioGroupItem
                value={item.toLowerCase()}
                id={item}
                className="border-slate-300 text-teal focus:ring-teal"
              />
              <Label htmlFor={item} className="text-slate-700 cursor-pointer">
                For {item}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Type Heading</Label>
          <Input
            type="text"
            value={heading}
            onChange={(e) =>
              dispatch(addRecordingField({ heading: e.target.value }))
            }
            placeholder="Enter heading..."
            className="border-slate-200 focus-visible:ring-teal rounded-lg h-11 transition-all focus-visible:ring-2"
          />
          {errors?.heading && (
            <p className="text-xs pl-1.5 text-red-500">
              {errors?.heading?.msg}
            </p>
          )}
        </div>
        {recordingCategory === "free" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectBox
              error={errors?.gender?.msg}
              name="gender"
              label="Gender"
              value={gender}
              onChange={(val) => dispatch(addRecordingField({ gender: val }))}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />
            <div className="space-y-3.5 flex flex-col">
              <Label className="text-slate-600 font-medium">
                Select Speaker or Type Name
              </Label>
              <Popover open={openSpeaker} onOpenChange={setOpenSpeaker}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between border-slate-200 h-11 hover:border-teal rounded-lg"
                  >
                    {speakerId
                      ? allSpeaker.find((s) => s.value === speakerId)?.label
                      : "Search or add speaker..."}
                    <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Type speaker name..."
                      className="h-9"
                    />
                    <CommandEmpty>No speaker found.</CommandEmpty>
                    <CommandGroup>
                      {allSpeaker.map((s) => (
                        <CommandItem
                          key={s.value}
                          value={s.value}
                          onSelect={(val) => {
                            dispatch(addRecordingField({ speakerId: val }));
                            setOpenSpeaker(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              speakerId === s.value
                                ? "opacity-100 text-teal"
                                : "opacity-0",
                            )}
                          />
                          {s.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors?.speakerId && (
                <p className="text-xs pl-1.5 text-red-500">
                  {errors?.speakerId?.msg}
                </p>
              )}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recordingCategory === "class" && (
            <div className="space-y-2 flex flex-col">
              <Label className="text-slate-600 font-medium">Select Class</Label>
              <Popover open={openClass} onOpenChange={setOpenClass}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between border-slate-200 h-11 hover:border-teal rounded-lg"
                  >
                    {classId
                      ? allClass.find((c) => c.value === classId)?.label
                      : "Select or search class..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search class..."
                      className="h-9"
                    />
                    <CommandEmpty>No class found.</CommandEmpty>
                    <CommandGroup>
                      {allClass.map((c) => (
                        <CommandItem
                          key={c.value}
                          value={c.value}
                          onSelect={(val) => {
                            dispatch(addRecordingField({ classId: val }));
                            setOpenClass(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              classId === c.value
                                ? "opacity-100 text-teal"
                                : "opacity-0",
                            )}
                          />
                          {c.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors?.classId && (
                <p className="text-xs pl-1.5 text-red-500">
                  {errors?.classId?.msg}
                </p>
              )}
            </div>
          )}
          {recordingCategory === "course" && (
            <div className="space-y-2 flex flex-col">
              <Label className="text-slate-600 font-medium">
                Select Course
              </Label>
              <Popover open={openCourse} onOpenChange={setOpenCourse}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between border-slate-200 h-11 hover:border-teal rounded-lg"
                  >
                    {courseId
                      ? allCourse.find((c) => c.value === courseId)?.label
                      : "Select or search course..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search course..."
                      className="h-9"
                    />
                    <CommandEmpty>No course found.</CommandEmpty>
                    <CommandGroup>
                      {allCourse.map((c) => (
                        <CommandItem
                          key={c.value}
                          value={c.value}
                          onSelect={(val) => {
                            dispatch(addRecordingField({ courseId: val }));
                            setOpenCourse(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              courseId === c.value
                                ? "opacity-100 text-teal"
                                : "opacity-0",
                            )}
                          />
                          {c.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors?.courseId && (
                <p className="text-xs pl-1.5 text-red-500">
                  {errors?.courseId?.msg}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Dynamic Class List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">
          {recordingCategory === "free"
            ? "Free Record List"
            : recordingCategory === "class"
              ? "Class List"
              : "Course List"}
        </h2>

        {recordings.length === 0 && existingRecordings.length === 0 && (
          <p className="text-slate-500">
            No{" "}
            {recordingCategory === "free"
              ? "Free Records"
              : recordingCategory === "class"
                ? "Classes"
                : "Courses"}{" "}
            added yet. Use the form below to add your first{" "}
            {recordingCategory === "free"
              ? "free record"
              : recordingCategory === "class"
                ? "class List"
                : "course List"}
            !
          </p>
        )}
        {recordings.length > 0 && (
          <div className="bg-teal rounded-2xl p-6 space-y-6">
            <h4 className="text-center bg-[#270034] px-4 py-2 w-fit mx-auto rounded-md text-white">
              {heading}
            </h4>
            {recordings.map((item: IRecordingItem) => (
              <div key={item.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-white">
                    Class {item.recordNumber}
                  </span>
                  <div className="flex gap-4 items-center">
                    <span className="text-green-500 hover:text-green-800 font-semibold flex items-center gap-1 cursor-pointer transition-all duration-200">
                      <Icon
                        icon="material-symbols:edit-outline"
                        width="20"
                        height="20"
                      />{" "}
                      Edit
                    </span>
                    <span
                      onClick={() => dispatch(deleteRecordInsideList(item.id))}
                      className="text-red-800 hover:text-red-950 font-semibold flex items-center gap-1 cursor-pointer transition-all duration-200"
                    >
                      <Icon
                        icon="material-symbols:delete"
                        width="20"
                        height="20"
                      />{" "}
                      Delete
                    </span>
                  </div>
                </div>
                {/* <CustomPlayer url={item.url} type={item.type} /> */}
                {item.mediaType === "audio" ? (
                  <div className="bg-black p-2">
                    <ReactPlayer
                      src={item.url}
                      controls
                      width="100%"
                      height="50px"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                    <ReactPlayer
                      src={item.url}
                      controls
                      width="100%"
                      height="100%"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {existingRecordings.length > 0 && (
          <div className="bg-teal rounded-2xl p-6 space-y-6">
            <h4 className="text-center bg-[#270034] px-4 py-2 w-fit mx-auto rounded-md text-white capitalize">
              {heading}
            </h4>
            {existingRecordings.map((item: IRecordingItem) => (
              <div key={item.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-white">
                    Class {item.recordNumber}
                  </span>
                  <div className="flex gap-4 items-center">
                    <span className="text-green-500 hover:text-green-800 font-semibold flex items-center gap-1 cursor-pointer transition-all duration-200">
                      <Icon
                        icon="material-symbols:edit-outline"
                        width="20"
                        height="20"
                      />{" "}
                      Edit
                    </span>
                    <span
                      onClick={() => {
                        dispatch(deleteExistingRecordInsideList(item.id));
                      }}
                      className="text-red-800 hover:text-red-950 font-semibold flex items-center gap-1 cursor-pointer transition-all duration-200"
                    >
                      <Icon
                        icon="material-symbols:delete"
                        width="20"
                        height="20"
                      />{" "}
                      Delete
                    </span>
                  </div>
                </div>
                {/* <CustomPlayer url={item.url} type={item.type} /> */}
                {item.mediaType === "audio" ? (
                  <div className="bg-black p-2">
                    <ReactPlayer
                      src={
                        item.file
                          ? getImageUrl(item.file as string, "recording")
                          : item.externalLink
                      }
                      controls
                      width="100%"
                      height="50px"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                    <ReactPlayer
                      src={
                        item.file
                          ? getImageUrl(item.file as string, "recording")
                          : item.externalLink
                      }
                      controls
                      width="100%"
                      height="100%"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {errors?.recordings && (
          <p className="text-xs pl-1.5 text-red-500">
            {errors?.recordings?.msg}
          </p>
        )}
      </div>

      {/* SECTION 3: Add Class Form (Your Red-Bordered Layout) */}
      <div className="space-y-6 pt-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Add{" "}
          {recordingCategory === "free"
            ? "Free Record"
            : recordingCategory === "class"
              ? "Class"
              : "Course"}
          :
        </h2>

        <RadioGroup
          defaultValue="video"
          onValueChange={(v) => setMediaType(v as "audio" | "video")}
          className="flex gap-8"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="audio"
              id="audio_main"
              className="text-teal"
            />
            <Label htmlFor="audio_main" className="font-medium">
              Audio
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="video"
              id="video_main"
              className="text-teal"
            />
            <Label htmlFor="video_main" className="font-medium">
              Video
            </Label>
          </div>
        </RadioGroup>

        <Card className="border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-8 space-y-8 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-slate-600 font-bold uppercase text-xs">
                  {recordingCategory === "free"
                    ? "Free Record"
                    : recordingCategory === "class"
                      ? "Class"
                      : "Course"}{" "}
                  number*
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={recordData.recordNumber}
                  onChange={(e) =>
                    setRecordData({
                      ...recordData,
                      recordNumber: e.target.value,
                    })
                  }
                  className="border-slate-200 focus-visible:ring-teal rounded-lg h-11"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-slate-600 font-bold uppercase text-xs">
                  Source Type
                </Label>
                <RadioGroup
                  defaultValue="internal"
                  onValueChange={(v) =>
                    setRecordData({ ...recordData, sourceType: v })
                  }
                  className="flex gap-8 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="external"
                      id="external"
                      className="text-teal"
                    />
                    <Label htmlFor="external">Link (YouTube/Web)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="internal"
                      id="internal"
                      className="text-teal"
                    />
                    <Label htmlFor="internal">Local File</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              {recordData.sourceType === "external" ? (
                <div className="relative">
                  <Input
                    placeholder="Paste YouTube or Video link here..."
                    className="border-slate-200 focus-visible:ring-teal rounded-lg h-12 pl-10"
                    onChange={(e) =>
                      setRecordData({
                        ...recordData,
                        externalLink: e.target.value,
                      })
                    }
                    value={recordData.externalLink}
                  />
                  <LinkIcon
                    className="absolute left-3 top-3.5 text-slate-400"
                    size={18}
                  />
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative bg-slate-50/30">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <Upload className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm text-slate-500">
                    Click or drag {mediaType} file to upload
                  </p>
                  {loading && (
                    <p className="text-xs text-teal mt-2 font-bold">
                      File ready!
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleAddClass}
                className="bg-[#FFF9C4] hover:bg-[#FFF176] text-slate-900 border-2 border-slate-900 px-8 py-6 rounded-xl font-bold transition-all flex items-center gap-2"
              >
                Add <ChevronUp />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
