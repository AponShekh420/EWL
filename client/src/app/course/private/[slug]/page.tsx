import { getPrivateRecords } from "@/actions/getPrivateRecords";
import PrivateSidebar from "@/components/class-private/PrivateSidebar";
import Records from "@/components/class-private/Records";
import { redirect } from "next/navigation";

const page = async ({
  params
}: {
  params: Promise<{ slug: string }>;
}) => {
    const {slug} = await params;
    let records;
    try {
    const { data } = await getPrivateRecords("course", slug);
    if(!data) {
        return redirect(`/class/${slug}`)
    }
    records = data
    } catch (err) {
        return redirect(`/class/${slug}`)
    }

    return (
    <div className="min-h-screen">
        <div className="lg:flex">
        <div className={`lg:w-64 2xl:w-72`}>
            <PrivateSidebar />
        </div>
        <div className="lg:flex-1  mt-4 lg:mt-0">
            <div className="px-8"><Records recording={records} classes="bg-teal p-6"/></div>
        </div>
        </div>
    </div>
    );
}

export default page;