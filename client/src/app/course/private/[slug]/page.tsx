import CoursePrivateData from "@/components/courses/private/CoursePrivateData";

const page = async ({
  params
}: {
  params: Promise<{ slug: string }>;
}) => {
    const {slug} = await params;

    return (
    <div className="min-h-screen">
        <CoursePrivateData slug={slug}/>
    </div>
    );
}

export default page;