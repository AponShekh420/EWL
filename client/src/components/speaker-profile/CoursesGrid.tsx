"use client";
import { useEffect, useState } from "react";
import CourseCard from "../common/CourseCard";
import { ArrowUpRight } from "lucide-react";
import { getCourseByQuery } from "@/actions/course";
import { CourseType } from "@/types/Course";
import { Icon } from "@iconify/react";
import Link from "next/link";


const CoursesGrid = ({speakerId}: {speakerId: string}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [courses, setCourses] = useState<CourseType[]>([]);
  
    const getCoursesByFilter = async () => {
      try {
        setLoading(true);
        const query = `speaker=${speakerId}&status=${"publish"}`;
        const { data } = await getCourseByQuery(query);
        setCourses(data);
        console.log("Fetched courses:", data);  
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
      // Fetch courses based on the filter
    }
  
  
    useEffect(() => {
      // Fetch courses based on the selected tab (category)
       getCoursesByFilter();
    }, [speakerId]);
    return (
      <section className="container px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-3xl font-bold text-slate-800 underline decoration-teal decoration-4 underline-offset-8">Featured Courses</h3>
          <button className="text-teal font-semibold hover:text-black  transition-all">
            <Link href="/courses" className="flex items-center gap-1">
              View All Courses <ArrowUpRight size={20} />
            </Link>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center w-full mt-36">
            <Icon icon="eos-icons:bubble-loading" width="50" height="50" className="text-teal"/>
          </div>
          ) : (
          courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {courses.map(course => (
                <CourseCard key={course._id} title={course?.title || ""} slug={course?.slug || ""} thumbnail={course?.thumbnail || ""} speaker={course?.speaker || ""}/>
              ))}
            </div>) : (
              <div className="flex flex-col items-center justify-center w-full mt-36 gap-4">
                <Icon icon="mdi:folder-search-outline" width="50" height="50" className="text-gray-400"/>
                <p className="text-gray-500">No courses found.</p>
              </div>
            )
          )
        }
      </section>
    );
}

export default CoursesGrid;