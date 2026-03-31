"use client"
import DragAndDropFiles from "@/components/common/DragAndDropFiles";
import { addClassField, deleteExistingAudiosTwo, deleteExistingVideosOne, deleteExistingVideosTwo } from "@/redux/features/class/classFormSlice";
import { deleteExistingAudiosOne } from "@/redux/features/class/classFormSlice";
import { RootState } from "@/redux/store";
import { ClassValidationErrors } from "@/types/Class";
import { getImageUrl } from "@/utils/getImageUrl";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "@/components/common/AudioPlayer";
import VideoPlayer from "@/components/common/VideoPlayer";
const Editor = dynamic(
  () => import("@/components/dashboard/common/editor/Editor"),
  {
    ssr: false,
  }
);


const supportedAudioFormat = [
  "audio/mpeg",   // mp3
  "audio/wav",
  "audio/ogg",
  "audio/mp4",    // m4a
  "audio/webm",
  "audio/aac"
]
const supportedVideoFormat = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/x-msvideo",
  "video/quicktime",
  "video/x-matroska"
]

export function ClassContents({errors}: {errors: ClassValidationErrors}) {
  const classForm = useSelector((state: RootState) => state.classForm);
  const dispatch = useDispatch();
  return (
    <div className="flex w-full flex-col gap-6">
      <Editor onChange={(val) => dispatch(addClassField({ contentOne: val }))} value={classForm?.contentOne || ""}/>
      
      {/* audio one */}
      <div className="">
        <label htmlFor="" className="mb-4 inline-block font-medium">
          Audio Gallery
        </label>
        <DragAndDropFiles
          supportedFormat={supportedAudioFormat}
          MAX_FILES={20}
          onFileChange={(files) => {
            if (files && files?.length > 0) {
              console.log(files);
              dispatch(addClassField({ audiosOne: files }));
            }
          }}
        />
        {errors.audiosOne && (
          <span className="text-red-500 text-xs mt-2 ml-1">
            {errors?.audiosOne?.msg}
          </span>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {classForm.audiosOne &&
            classForm.audiosOne.length > 0 &&
            classForm.audiosOne.map((file: File, index) => (
              <div key={index} className="relative w-fit w-full">
                <div className='bg-black p-2'>
                  <AudioPlayer url={URL.createObjectURL(file)}/>
                </div>
                <button
                  className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                  type="button"
                  onClick={() => {
                    if (classForm?.audiosOne) {
                      const filteredFiles = classForm?.audiosOne.filter(
                        (_, i) => i !== index,
                      );
                      dispatch(
                        addClassField({ audiosOne: filteredFiles }),
                      );
                    }
                  }}
                >
                  <Icon
                    icon="material-symbols-light:delete-rounded"
                    width="22"
                    height="22"
                  />
                </button>
              </div>
            ))}
          {classForm.existingAudiosOne &&
            classForm.existingAudiosOne.length > 0 &&
            classForm.existingAudiosOne.map(
              (audio: string, index: number) => (
                <div key={index} className="relative w-fit">
                  <div className='bg-black p-2'>
                    <AudioPlayer url={getImageUrl(audio, "classes")}/>
                  </div>
                  <button
                    className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                    type="button"
                    onClick={() => {
                      dispatch(deleteExistingAudiosOne(audio));
                    }}
                  >
                    <Icon
                      icon="material-symbols-light:delete-rounded"
                      width="22"
                      height="22"
                    />
                  </button>
                </div>
              ),
            )}
        </div>
      </div>

      {/* video one */}
      <div className="">
        <label htmlFor="" className="mb-4 inline-block font-medium">
          Video Gallery
        </label>
        <DragAndDropFiles
          supportedFormat={supportedVideoFormat}
          MAX_FILES={20}
          onFileChange={(files) => {
            if (files && files?.length > 0) {
              console.log(files);
              dispatch(addClassField({ videosOne: files }));
            }
          }}
        />
        {errors.videosOne && (
          <span className="text-red-500 text-xs mt-2 ml-1">
            {errors?.videosOne?.msg}
          </span>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {classForm.videosOne &&
            classForm.videosOne.length > 0 &&
            classForm.videosOne.map((file: File, index) => (
              <div key={index} className="relative w-fit">
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                  <VideoPlayer url={URL.createObjectURL(file)} />
                </div>
                <button
                  className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                  type="button"
                  onClick={() => {
                    if (classForm?.videosOne) {
                      const filteredFiles = classForm?.videosOne.filter(
                        (_, i) => i !== index,
                      );
                      dispatch(
                        addClassField({ videosOne: filteredFiles }),
                      );
                    }
                  }}
                >
                  <Icon
                    icon="material-symbols-light:delete-rounded"
                    width="22"
                    height="22"
                  />
                </button>
              </div>
            ))}
          {classForm.existingVideosOne &&
            classForm.existingVideosOne.length > 0 &&
            classForm.existingVideosOne.map(
              (video: string, index: number) => (
                <div key={index} className="relative w-fit">
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                    <VideoPlayer url={getImageUrl(video, "classes")} />
                  </div>
                  <button
                    className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                    type="button"
                    onClick={() => {
                      dispatch(deleteExistingVideosOne(video));
                    }}
                  >
                    <Icon
                      icon="material-symbols-light:delete-rounded"
                      width="22"
                      height="22"
                    />
                  </button>
                </div>
              ),
            )}
        </div>
      </div>

      <Editor onChange={(val) => dispatch(addClassField({ contentTwo: val }))} value={classForm?.contentTwo || ""}/>
      
      {/* audio one */}
      <div className="">
        <label htmlFor="" className="mb-4 inline-block font-medium">
          Audio Gallery
        </label>
        <DragAndDropFiles
          supportedFormat={supportedAudioFormat}
          MAX_FILES={20}
          onFileChange={(files) => {
            if (files && files?.length > 0) {
              console.log(files);
              dispatch(addClassField({ audiosTwo: files }));
            }
          }}
        />
        {errors.audiosTwo && (
          <span className="text-red-500 text-xs mt-2 ml-1">
            {errors?.audiosTwo?.msg}
          </span>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {classForm.audiosTwo &&
            classForm.audiosTwo.length > 0 &&
            classForm.audiosTwo.map((file: File, index) => (
              <div key={index} className="relative w-fit w-full">
                <div className='bg-black p-2'>
                  <AudioPlayer url={URL.createObjectURL(file)}/>
                </div>
                <button
                  className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                  type="button"
                  onClick={() => {
                    if (classForm?.audiosTwo) {
                      const filteredFiles = classForm?.audiosTwo.filter(
                        (_, i) => i !== index,
                      );
                      dispatch(
                        addClassField({ audiosTwo: filteredFiles }),
                      );
                    }
                  }}
                >
                  <Icon
                    icon="material-symbols-light:delete-rounded"
                    width="22"
                    height="22"
                  />
                </button>
              </div>
            ))}
          {classForm.existingAudiosTwo &&
            classForm.existingAudiosTwo.length > 0 &&
            classForm.existingAudiosTwo.map(
              (audio: string, index: number) => (
                <div key={index} className="relative w-fit">
                  <div className='bg-black p-2'>
                    <AudioPlayer url={getImageUrl(audio, "classes")}/>
                  </div>
                  <button
                    className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                    type="button"
                    onClick={() => {
                      dispatch(deleteExistingAudiosTwo(audio));
                    }}
                  >
                    <Icon
                      icon="material-symbols-light:delete-rounded"
                      width="22"
                      height="22"
                    />
                  </button>
                </div>
              ),
            )}
        </div>
      </div>

      {/* video one */}
      <div className="">
        <label htmlFor="" className="mb-4 inline-block font-medium">
          Video Gallery
        </label>
        <DragAndDropFiles
          supportedFormat={supportedVideoFormat}
          MAX_FILES={20}
          onFileChange={(files) => {
            if (files && files?.length > 0) {
              console.log(files);
              dispatch(addClassField({ videosTwo: files }));
            }
          }}
        />
        {errors.videosTwo && (
          <span className="text-red-500 text-xs mt-2 ml-1">
            {errors?.videosTwo?.msg}
          </span>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {classForm.videosTwo &&
            classForm.videosTwo.length > 0 &&
            classForm.videosTwo.map((file: File, index) => (
              <div key={index} className="relative w-fit">
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                  <VideoPlayer url={URL.createObjectURL(file)} />
                </div>
                <button
                  className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                  type="button"
                  onClick={() => {
                    if (classForm?.videosTwo) {
                      const filteredFiles = classForm?.videosTwo.filter(
                        (_, i) => i !== index,
                      );
                      dispatch(
                        addClassField({ videosTwo: filteredFiles }),
                      );
                    }
                  }}
                >
                  <Icon
                    icon="material-symbols-light:delete-rounded"
                    width="22"
                    height="22"
                  />
                </button>
              </div>
            ))}
          {classForm.existingVideosTwo &&
            classForm.existingVideosTwo.length > 0 &&
            classForm.existingVideosTwo.map(
              (video: string, index: number) => (
                <div key={index} className="relative w-fit">
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                    <VideoPlayer url={getImageUrl(video, "classes")} />
                  </div>
                  <button
                    className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                    type="button"
                    onClick={() => {
                      dispatch(deleteExistingVideosTwo(video));
                    }}
                  >
                    <Icon
                      icon="material-symbols-light:delete-rounded"
                      width="22"
                      height="22"
                    />
                  </button>
                </div>
              ),
            )}
        </div>
      </div>

    </div>
  )
}
