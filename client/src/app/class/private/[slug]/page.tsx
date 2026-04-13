import PrivateSidebar from "@/components/class-private/PrivateSidebar";
import Records from "@/components/class-private/Records";

const page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    return (
    <div className="min-h-screen">
        <div className="lg:flex">
        <div className={`lg:w-64 2xl:w-72`}>
            <PrivateSidebar />
        </div>
        <div className="lg:flex-1  mt-4 lg:mt-0">
            <div className="px-8"><Records/></div>
        </div>
        </div>
    </div>
    );
}

export default page;