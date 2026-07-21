import React, { useState } from "react"
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


// Initial state data
const initialCourses = [
  {
    id: "1",
    name: "Female Orgasm Difficulty (FOD)",
    price: 0,
  },
  {
    id: "2",
    name: "Male Premature Ejaculation (PE)",
    price: 0,
  },
  {
    id: "3",
    name: "Male Erectile Dysfunction (ED)",
    price: 0,
  },
  {
    id: "4",
    name: "Sexual Desire Discrepancy (SDD)",
    price: 0,
  },
  {
    id: "5",
    name: "Technical Difficulties (TD)",
    price: 0,
  },
  {
    id: "6",
    name: "Interpersonal/Emotional Misalignments (EC)",
    price: 0,
  },
  {
    id: "7",
    name: "Keeping It Fresh and Alive / Non-Standard Activities (FA)",
    price: 0,
  },
]

export default function CourseSelectionTable() {
  const {modules} = useSelector((state: RootState) => state.courseForm);
  // Read: "Keep the course if it is NOT found in the modules array"
  const unmatchedModules = initialCourses.filter(
    (course) => !modules.some((module) => module.id === course.id)
  );
  const dispatch = useDispatch();
  // Handle the table data via state
  const [courses, setCourses] = useState([...unmatchedModules, ...modules]);

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
                    onClick={() => handleDeselect(course)}
                  >
                    <Icon icon="mdi:pencil-outline" width="20" height="20" />edit
                  </Button>
                </TableCell>
                <TableCell className="py-4 text-right align-middle w-[100px]">
                  <Button 
                    type="button"
                    className="bg-[#cc1800] hover:bg-[#a40000] text-white font-medium rounded text-sm capitalize"
                    onClick={() => handleDeselect(course)}
                  >
                    <Icon icon="material-symbols:delete-outline" width="20" height="20" />Delete
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}