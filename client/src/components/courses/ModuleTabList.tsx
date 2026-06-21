"use client"
import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { CourseType, modulesType, OldModulesType } from "@/types/Course"
import { RootState } from "@/redux/store"
import { addToCourseCart } from "@/redux/features/cart/courseCartSlice"
import { Icon } from "@iconify/react"
import { CourseOrderType } from "@/types/CourseOrder"
import { useRouter } from "next/navigation"
import { getCourseModulesNew } from "@/actions/getCourseModulesNew"


export default function CourseSelectionTable({modules, orderedModules, price, course, order, courseId}: {modules: modulesType[], orderedModules: modulesType[], ordered: boolean, price: number, course: CourseType, order: CourseOrderType, courseId: string}) {
  // Read: "Keep the course if it is NOT found in the modules array"
//   const unmatchedModules = initialCourses.filter(
//     (course) => !modules.some((module) => module.id === course.id)
//   );
  const courseCart = useSelector((state: RootState) => state.courseCart);
  const dispatch = useDispatch();
  // Handle the table data via state
  const router = useRouter()
  const [newModules, setNewModules] = useState<modulesType[]>([])

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
  // 1. Extract the unique primitive values (names) from the incoming array
  const incomingNames = order?.modules?.map(m => m.id) || [];
  let uniqueCourseModules: OldModulesType[] = []
  console.log(incomingNames)

  // 2. Filter the course modules by checking against those names
  if(modules.length > 0) {
    uniqueCourseModules = modules?.filter(
      (courseModule) => !incomingNames.includes(courseModule.id)
    ); 
  }
  
  const addToCartFullCourse = () => {
      console.log("unique", uniqueCourseModules)
      
      dispatch(addToCourseCart({
        _id: 'temp-id', // Temporary ID, replace with actual if available
        orderId: order?._id,
        createdAt: new Date(),
        totalPrice: course.price,
        totalCourse: 1,
        modules: uniqueCourseModules || [],
        items: [
          {
            price: course.price,
            modulesPrice: 0,
            course: course,
            quantity: 1
          }
        ]
      }));
      router.push(`/course/checkout/`);
  }

  const getModules = async () => {
    const {data} = await getCourseModulesNew(courseId, modules)
    setNewModules(data)
  }
 useEffect(()=> {
  getModules();
 }, [])


  return (
    <div>
     <>
        <Table>
          <TableBody>
            {newModules?.sort((a, b) => a.id.localeCompare(b.id)).map((module) => {
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
                    {module?.recordsNumber > 1 ? `classes ${module.recordsNumber}` : `class ${module.recordsNumber}`}
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
        <div className="w-full mx-auto space-y-4 font-sans mt-5">
          
          {/* 3-Module Bundle Row */}
          <div className="w-full p-5 rounded-lg border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#f4ebe1] border-[#e4d3c2]">
            {/* Left Side: Information */}
            <div className="flex gap-3 items-start">
              <Icon icon="ph:star-fill" className="text-[#c18445] text-xl mt-1 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Bundle of ANY Three Modules <span className="text-gray-500 font-normal">(Most Popular)</span>
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Choose any 3 modules. You&apos;ll get access to all recordings for the modules you select.
                </p>
              </div>
            </div>

            {/* Right Side: Pricing & Action */}
            <div className="flex flex-col items-end justify-between min-w-[200px] h-full self-stretch md:self-auto gap-3 md:gap-1">
              <div className="flex items-center md:items-baseline justify-between md:justify-end w-full gap-6">
                <span className="text-xl font-bold text-gray-950">$499.99</span>
              </div>
            </div>
          </div>

          {/* 7-Module Entire Series Row */}
          <div className={`${uniqueCourseModules.length == 0 && "opacity-50 cursor-not-allowed"} w-full p-5 rounded-lg border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#eff4f1] border-[#dae5de]`}>
            {/* Left Side: Information */}
            <div className="flex gap-3 items-start">
              <Icon icon="ph:star-fill" className="text-[#0e6245] text-xl mt-1 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Entire Series – All {[...modules].length} Modules <span className="text-gray-500 font-normal">(Best Value)</span>
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Get access to all {[...modules].length} modules and all recordings.
                </p>
              </div>
            </div>

            {/* Right Side: Pricing & Action */}
            <div className="flex items-center md:items-baseline justify-between md:justify-end min-w-[200px] w-full md:w-auto gap-6">
              <span className="text-xl font-bold text-gray-950">${price}</span>
                {uniqueCourseModules.length != 0 && (
                  <button disabled={uniqueCourseModules.length == 0} onClick={addToCartFullCourse} className="bg-[#0b533a] hover:bg-[#083f2c] text-white text-sm font-medium py-2 px-6 rounded transition-colors cursor-pointer">
                    Select
                  </button>
                )}
            </div>
          </div>

        </div>
      </>
    </div>
  )
}