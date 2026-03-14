"use client"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { addCourseField } from "@/redux/features/course/courseFormSlice";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
const Editor = dynamic(
  () => import("@/components/dashboard/common/editor/Editor"),
  {
    ssr: false,
  }
);

export function CourseTabs() {
  const courseForm = useSelector((state: RootState) => state.courseForm);
  const dispatch = useDispatch();
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="About">
        <TabsList>
          <TabsTrigger value="About">About</TabsTrigger>
          <TabsTrigger value="Overview">Overview</TabsTrigger>
          <TabsTrigger value="Course Topics">Course Topics</TabsTrigger>
          <TabsTrigger value="Speaker Profile">Speaker Profile</TabsTrigger>
          <TabsTrigger value="FAQs">FAQs</TabsTrigger>
          <TabsTrigger value="Testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="More Info">More Info</TabsTrigger>
        </TabsList>
        <TabsContent value="About">
          <Editor onChange={(val) => dispatch(addCourseField({ aboutTab: val }))} value={courseForm.aboutTab}/>
        </TabsContent>
        <TabsContent value="Overview">
          <Editor onChange={(val) => dispatch(addCourseField({ overviewTab: val }))} value={courseForm.overviewTab}/>
        </TabsContent>
        <TabsContent value="Course Topics">
          <Editor onChange={(val) => dispatch(addCourseField({ courseTopicsTab: val }))} value={courseForm.courseTopicsTab}/>
        </TabsContent>
        <TabsContent value="Speaker Profile">
          <Editor onChange={(val) => dispatch(addCourseField({ speakerProfileTab: val }))} value={courseForm.speakerProfileTab}/>
        </TabsContent>
        <TabsContent value="FAQs">
          <Editor onChange={(val) => dispatch(addCourseField({ FAQsTab: val }))} value={courseForm.FAQsTab}/>
        </TabsContent>
        <TabsContent value="Testimonials">
          <Editor onChange={(val) => dispatch(addCourseField({ testimonialsTab: val }))} value={courseForm.testimonialsTab}/>
        </TabsContent>
        <TabsContent value="More Info">
          <Editor onChange={(val) => dispatch(addCourseField({ moreInfoTab: val }))} value={courseForm.moreInfoTab}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}
