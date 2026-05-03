import { getPrivateRecords } from "@/actions/getPrivateRecords";
import Records from "@/components/class-private/Records";
import { getSession } from "@/lib/authLib";
import { redirect } from "next/navigation";

const page = async ({
  params
}: {
  params: Promise<{ slug: string }>;
}) => {
    const user = await getSession();
    if(!user) {
        return redirect("/login")
    }
    const {slug} = await params;
    let records;
    try {
        const { data } = await getPrivateRecords("free", slug);
        if(!data) {
            return redirect(`/`)
        }
        records = data
    } catch (err) {
        return redirect(`/`)
    }

    return (
    <div className="min-h-screen">
        <div className="lg:flex">
            <div className="lg:flex-1  mt-4 lg:mt-0">
                <div className="px-8"><Records recording={records} classes="bg-teal p-6"/></div>
            </div>
        </div>
    </div>
    );
}

export default page;