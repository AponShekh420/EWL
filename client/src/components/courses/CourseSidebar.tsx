"use client";
import { addToCourseCart, resetCourseCartFields } from "@/redux/features/cart/courseCartSlice";
import { RootState } from "@/redux/store";
import { CourseType } from "@/types/Course";
import { CourseOrderType } from "@/types/CourseOrder";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";
import Link from 'next/link';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CourseSidebar = ({order, course, time, ordered, slug, price, module, offline, externalLink, installmentPricePerMonth, installmentMonths, lectures, date, duration}: {order: CourseOrderType, course: CourseType, time: string, ordered: boolean, slug: string, price: number, module: number, offline: boolean, externalLink: string, installmentPricePerMonth: number | string | null, installmentMonths: number, lectures: number, date: string, duration: string}) => {
    const courseCart = useSelector((state: RootState) => state.courseCart);
    const dispatch = useDispatch();
    const router = useRouter();


    const addToCartBundleFunc = () => {
        dispatch(addToCourseCart({
          _id: 'temp-id', // Temporary ID, replace with actual if available
          orderId: order?._id,
          createdAt: new Date(),
          totalPrice: module,
          totalCourse: 1,
          modules: courseCart.modules || [],
          items: [
            {
              price: course.price,
              modulesPrice: courseCart.modules?.reduce((acc: number, module: { price: number }) => acc + module.price, 0) || 0,
              course: course,
              quantity: 1
            }
          ]
        }));
        router.push(offline ? externalLink : `/course/checkout/`);
    }

    const addToCartModulesFunc = () => {
        dispatch(addToCourseCart({
          _id: 'temp-id', // Temporary ID, replace with actual if available
          orderId: order?._id,
          createdAt: new Date(),
          totalPrice: courseCart.modules?.reduce((acc: number, module: { price: number }) => acc + module.price, 0) || 0,
          totalCourse: 1,
          modules: courseCart.modules || [],
          items: [
            {
              price: course.price,
              modulesPrice: courseCart.modules?.reduce((acc: number, module: { price: number }) => acc + module.price, 0) || 0,
              course: course,
              quantity: 1
            }
          ]
        }));
        router.push(offline ? externalLink : `/course/checkout/`);
    }

    const addToCartFullCourse = () => {
        dispatch(addToCourseCart({
          _id: 'temp-id', // Temporary ID, replace with actual if available
          orderId: order?._id,
          createdAt: new Date(),
          totalPrice: course.price,
          totalCourse: 1,
          modules: course.modules || [],
          items: [
            {
              price: course.price,
              modulesPrice: 0,
              course: course,
              quantity: 1
            }
          ]
        }));
        router.push(ordered ? `/course/private/${slug}` : offline ? externalLink : `/course/checkout/`);
    }

     useEffect(() => {
      dispatch(resetCourseCartFields())
    }, [])
    return (
        <>
         {/* --- RIGHT SIDEBAR (Sticky) --- */}
        <aside className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            
            {/* Purchase Card */}
            {
              courseCart.modules.length === 3 && (
              <div className="w-full rounded-xl border border-slate-100 bg-[#f4f7fc] p-6 shadow-sm font-sans">
                {/* Header */}
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Your Selection
                </h3>
                
                {/* Selected Counter */}
                <p className="text-sm font-medium text-slate-600 mb-5">
                  Selected: <span className="text-blue-600 font-semibold">{courseCart?.modules?.length || 0} of 3</span>
                </p>

                {/* Modules List */}
                <div className="space-y-4 mb-6">
                  {courseCart?.modules?.map((mod: { id: number; name: string }, index: number) => (
                    <div key={mod.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-800">
                        Module {index + 1}:
                      </span>
                      {/* Placeholder line mimicking the image */}
                      <div>
                          <p className="text-sm font-normal text-slate-800">{mod.name}</p>
                          <hr className="border-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Section */}
                <div className="mb-5">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Bundle Price:
                  </p>
                  <p className="text-2xl font-black text-blue-600">
                    ${module}
                  </p>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={addToCartBundleFunc}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <span>Continue to Checkout</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              )
            }

            {/* get modules button */}
            {courseCart.modules.length > 0 && courseCart.modules.length !== 3 && courseCart.modules.length !== course?.modules?.length && (
              <div onClick={addToCartModulesFunc} className="group relative overflow-hidden bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-2xl text-white shadow-xl shadow-emerald-200">
            
              {/* 1. The Rotated Tape Label */}
                <span className="absolute top-4 -left-9 bg-yellow-400 text-emerald-900 text-[9px] text-center font-black uppercase py-1 w-32 -rotate-45 shadow-sm border-b border-yellow-500">
                  Module Plan
                </span>

              <div className='!h-full p-6 block cursor-pointer'>
                <div 
                  className="w-full flex items-center justify-between"
                >
                  {/* 2. Action Text (Added a tiny bit of left padding to clear the tape) */}
                  <div className='flex flex-col'>
                    <span className={`text-xl font-bold tracking-tight pl-5`}>{ordered ? "Go to Course" : "GET MODULES"}</span>
                  </div>
                  
                  {/* 3. Dynamic Price Section */}
                  <div className="flex flex-col items-end border-l border-emerald-400 pl-4 transition-transform group-hover:scale-105">
                    <span className="text-2xl font-light leading-none">
                      ${courseCart.modules?.reduce((acc: number, module: { price: number }) => acc + module.price, 0)}
                    </span>
                    <span className="text-[10px] opacity-80 mt-1 uppercase tracking-tighter">
                      Total: {courseCart.modules?.length} modules
                    </span>
                  </div>
                </div>
              </div>
            </div>)
            }


            {/* get whole course & and installment button */}
            <div className="group relative overflow-hidden bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-2xl text-white shadow-xl shadow-emerald-200">
              
              {/* 1. The Rotated Tape Label */}
              {(installmentPricePerMonth) && (
                <span className="absolute top-4 -left-9 bg-yellow-400 text-emerald-900 text-[9px] text-center font-black uppercase py-1 w-32 -rotate-45 shadow-sm border-b border-yellow-500">
                  Installment
                </span>
              )}

              <div className='!h-full p-6 block cursor-pointer' onClick={ordered ? ()=> router.push(`/course/private/${slug}`) : addToCartFullCourse}>
                <div 
                  className="w-full flex items-center justify-between"
                >
                  {/* 2. Action Text (Added a tiny bit of left padding to clear the tape) */}
                  <div className='flex flex-col'>
                    <span className={`text-xl font-bold tracking-tight ${(installmentPricePerMonth) ? 'pl-5' : 'pl-2'}`}>{ordered ? "Go to Course" : "GET COURSE"}</span>
                    {(installmentPricePerMonth)  && (
                      <span className="text-[10px] opacity-70 uppercase tracking-wider mt-1 pl-5">
                        Limited Time Offer
                      </span>
                    )}
                  </div>
                  
                  {/* 3. Dynamic Price Section */}
                  <div className="flex flex-col items-end border-l border-emerald-400 pl-4 transition-transform group-hover:scale-105">
                    <span className="text-2xl font-light leading-none">
                      {(installmentPricePerMonth) ? `$${installmentPricePerMonth}` : ordered ? "" : `$${price}`}
                    </span>
                    {(installmentPricePerMonth) && (
                      <span className="text-[10px] opacity-80 mt-1 uppercase tracking-tighter">
                        Per {installmentPricePerMonth ? "Month" : ""} / {installmentMonths ? `${installmentMonths} mo.` : ``}
                      </span>)}
                  </div>
                </div>
              </div>
            </div>

                
            <Link href={`/course/preview/${slug}`} className='mb-8 block'>
              <button className="w-full bg-teal hover:bg-teal-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg/50 shadow-teal hover:shadow-teal-600">
                Preview
              </button>
            </Link>

            {/* Course Details List */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              {time && (
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">🕒</span>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900 block">Time</span>
                    {time}
                  </p>
                </div>
              )}
              {date && (
                <div className="flex items-start gap-3 border-t pt-4">
                  <span className="text-blue-500 mt-1">📅</span>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900 block">Date</span>
                    {date}
                  </p>
                </div>
              )}
              {lectures && (
                <div className="flex items-start gap-3 border-t pt-4">
                  <span className="text-blue-500 mt-1">👥</span>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900 block">Lectures</span>
                    {lectures}
                  </p>
                </div>
              )}
              {duration && (
                <div className="flex items-start gap-3 border-t pt-4">
                  <span className="text-blue-500 mt-1">⏳</span>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900 block">Duration</span>
                    {duration}
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>
        </>
    );
}

export default CourseSidebar;