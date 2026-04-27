import { getSpeakerBySlug } from "@/actions/speaker";
import CoursesCard from "@/components/profile/CoursesCard";

export default async function MyCourses() {
  const { data: speakerData } = await getSpeakerBySlug("shiponislam");
  const speaker = {
    _id: speakerData._id,
    firstName: speakerData.firstName,
    lastName: speakerData.lastName,
    avatar: speakerData.avatar,
    courses: speakerData.courses,
    userName: speakerData.userName,
  };
  return (
    <div>
      <CoursesCard speakerId={speaker._id} />
    </div>
  );
}
