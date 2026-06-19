"use client"
import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { modulesType } from "@/types/Course"
import { RootState } from "@/redux/store"
import { addToCourseCart } from "@/redux/features/cart/courseCartSlice"


export default function CourseSelectionTable({modules, orderedModules}: {modules: modulesType[], orderedModules: modulesType[], ordered: boolean}) {
  // Read: "Keep the course if it is NOT found in the modules array"
//   const unmatchedModules = initialCourses.filter(
//     (course) => !modules.some((module) => module.id === course.id)
//   );
  const courseCart = useSelector((state: RootState) => state.courseCart);
  const dispatch = useDispatch();
  // Handle the table data via state


  // Submission handler
  const handleSelect = (course: modulesType) => {
    dispatch(addToCourseCart({
      modules: [...courseCart.modules, { name: course.name, price: course.price, id: course.id }] // Add the selected course to the modules array
    }));
  }

  const handleDeselect = (course: modulesType) => {
    dispatch(addToCourseCart({
      modules: courseCart.modules.filter((module: modulesType) => module.id !== course.id) // Remove the deselected course from the modules array
    }));
  }

  return (
    <div>
      <Table>
        <TableBody>
          {[...modules].sort((a, b) => a.id.localeCompare(b.id)).map((module) => {
            return (
              <TableRow 
                key={module.id} 
                className={`hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0 ${orderedModules?.some((m: modulesType) => m.id === module.id) ? 'bg-green-50/50 hover:bg-green-50/50 cursor-not-allowed' : ''}`}
              >
                {/* Icon & Title Column */}
                <TableCell className="py-4 align-middle">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-slate-800 text-sm md:text-base">
                      {module.name}
                    </span>
                  </div>
                </TableCell>


                {/* Classes Column */}
                <TableCell className="py-4 text-slate-500 font-medium align-middle whitespace-nowrap">
                  classes 1
                </TableCell>

                {/* Price Column */}
                <TableCell className="py-4 font-bold text-slate-900 text-right align-middle whitespace-nowrap pr-8">
                  ${module.price.toFixed(2)}
                </TableCell>

                {/* Action Column */}
                <TableCell className="py-4 text-right align-middle w-[100px]">
                  {!courseCart.modules.some((m: modulesType) => m.id === module.id) && (!orderedModules?.some((m: modulesType) => m.id == module.id)) ? (
                    <Button 
                      disabled={orderedModules?.some((m: modulesType) => m.id === module.id)}
                      type="button"
                      className="bg-[#0052cc] hover:bg-[#0043a4] text-white font-medium px-6 py-1.5 rounded text-sm min-w-[80px] capitalize"
                      onClick={() => handleSelect(module)}
                    >
                      select
                    </Button>
                  ) : (
                  <Button 
                    disabled={!courseCart.modules.some((m: modulesType) => m.id === module.id)}
                    type="button"
                    className="bg-[#cc1800] hover:bg-[#a40000] text-white font-medium px-6 py-1.5 rounded text-sm min-w-[80px] capitalize"
                    onClick={() => handleDeselect(module)}
                  >
                    deselect
                  </Button>)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}