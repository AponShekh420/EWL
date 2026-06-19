"use client"
// import { IDisplayRecording } from "@/types/Recording";
import PrivateSidebar from "./PrivateSidebar";
import { useState } from "react";
import Records from "./Records";

const CoursePrivateData = ({slug}: {slug: string}) => {
    const [activeModule, setActiveModule] = useState("");
    return (
        <div className="lg:flex">
            <div className={`lg:w-64 2xl:w-72`}>
                <PrivateSidebar slug={slug} setActiveModule={setActiveModule} activeModule={activeModule}/>
            </div>
            <div className="lg:flex-1  mt-4 lg:mt-0">
                <div className="px-8"><Records slug={slug} module={activeModule} classes="bg-teal p-6"/></div>
            </div>
        </div>
    );
}

export default CoursePrivateData;