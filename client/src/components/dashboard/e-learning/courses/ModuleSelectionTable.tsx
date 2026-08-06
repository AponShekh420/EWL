"use client"
import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { addCourseField } from "@/redux/features/course/courseFormSlice"
import { Icon } from "@iconify/react";
import { BASE_URL } from "@/utils/envVariable"
import DeleteModule from "./DeleteModule"



interface initialCoursesProps {
  _id?: string;
  id: string;
  name: string;
  price?: number;
}


interface Props {
    moduleStatus: number;
    selectedModule: initialCoursesProps | null;
    setSelectedModule: React.Dispatch<React.SetStateAction<initialCoursesProps | null>>;
    setModuleStatus: React.Dispatch<React.SetStateAction<number>>;
}

export default function CourseSelectionTable({ moduleStatus, selectedModule, setSelectedModule, setModuleStatus }: Props) {
  const [initialCourses, setInitialCourses] = useState<initialCoursesProps[]>([]);
  const {modules} = useSelector((state: RootState) => state.courseForm);
  // Read: "Keep the course if it is NOT found in the modules array"
  const unmatchedModules = initialCourses.filter(
    (course) => !modules.some((module) => module.id === course.id)
  );
  const dispatch = useDispatch();
  // Handle the table data via state
  const [courses, setCourses] = useState([...unmatchedModules, ...modules]);


  const initialModulesFunction = () => {
    const unmatchedModules = initialCourses.filter(
      (course) => !modules.some((module) => module.id === course.id)
    );
    setCourses([...unmatchedModules, ...modules]);
  }

  useEffect(() => {
    initialModulesFunction()
  }, [initialCourses, modules]);

  // Handler to update price dynamically
  const handlePriceChange = (id: string, newPrice: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, price: newPrice } : course
      )
    )
  }

  // Submission handler
  const handleSelect = (course: typeof initialCourses[0]) => {
    dispatch(addCourseField({
      modules: [...modules, { name: course.name, price: course.price, id: course.id }] // Add the selected course to the modules array
    }));
  }

  const handleDeselect = (course: typeof initialCourses[0]) => {
    dispatch(addCourseField({
      modules: modules.filter(module => module.id !== course.id) // Remove the deselected course from the modules array
    }));
  }

  const handleEdit = (course: typeof initialCourses[0]) => {
    setSelectedModule(course);
    setModuleStatus(Math.random()); // Set to edit mode
  }
  

  const getAllModules = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/e-learning/courses/modules`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error("Failed to fetch modules");
      }

      const data = await response.json();
      setInitialCourses(data.modules); // Assuming the API returns an object with a 'modules' array
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  }

  useEffect(() => {
    getAllModules()
  }, [modules, moduleStatus]);


  return (
    <div>
      <Table>
        <TableBody>
          {courses.sort((a, b) => a.id.localeCompare(b.id)).map((course) => {
            return (
              <TableRow 
                key={course.id} 
                className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0"
              >
                {/* Icon & Title Column */}
                <TableCell className="py-4 align-middle">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-slate-800 text-sm md:text-base">
                      {course.name}
                    </span>
                  </div>
                </TableCell>


                {/* Interactive Price Input Column */}
                <TableCell className="py-4 align-middle w-[150px]">
                  <div className="relative flex items-center max-w-[130px] ml-auto mr-4">
                    <span className="absolute left-3 text-slate-900 font-bold text-sm pointer-events-none">
                      $
                    </span>
                    <Input
                      type="number"
                      value={course.price}
                      onChange={(e) => handlePriceChange(course.id, parseFloat(e.target.value) || 0)}
                      className="pl-7 pr-3 text-right font-bold text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-500 h-9"
                    />
                  </div>
                </TableCell>

                {/* Action Column */}
                <TableCell className="py-4 text-right align-middle w-[100px]">
                  {!modules.some(module => module.id === course.id) ? (
                    <Button 
                      type="button"
                      className="bg-[#0052cc] hover:bg-[#0043a4] text-white font-medium px-6 py-1.5 rounded text-sm min-w-[80px] capitalize"
                      onClick={() => handleSelect(course)}
                    >
                      select
                    </Button>
                  ) : (
                  <Button 
                    type="button"
                    className="bg-[#cc1800] hover:bg-[#a40000] text-white font-medium px-6 py-1.5 rounded text-sm min-w-[80px] capitalize"
                    onClick={() => handleDeselect(course)}
                  >
                    deselect
                  </Button>)}
                </TableCell>
                <TableCell className="py-4 text-right align-middle w-[100px]">
                  <Button 
                    type="button"
                    className="bg-[#29af15] hover:bg-[#18710a] text-white font-medium rounded text-sm capitalize"
                    onClick={() => handleEdit(course)}
                  >
                    <Icon icon="mdi:pencil-outline" width="20" height="20" />edit
                  </Button>
                </TableCell>
                <TableCell className="py-4 text-right align-middle w-[100px]">
                  <DeleteModule course={course} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}