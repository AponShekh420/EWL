"use client"
import React, { useEffect } from 'react';
import CheckoutForm from './CheckoutForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {useRouter } from "next/dist/client/components/navigation";


const CheckoutContent = () => {
    const courseCart = useSelector((state: RootState) => state.courseCart);
    const router = useRouter();
    // 1. Handle Redirect safely inside an effect
    useEffect(() => {
        const courseObj = courseCart?.items[0]?.course;
        console.log("courseObj", courseObj);

        // Check if courseObj doesn't exist, OR if it's an empty object {}
        const isCourseEmpty = !courseObj || Object.keys(courseObj).length === 0;

        if (isCourseEmpty || (courseObj as unknown as { notify?: boolean } | undefined)?.notify === false) {
            router.push("/courses");
        }
    }, [courseCart, router]);
    return (
        <div>
            <div className="grid lg:grid-cols-2">
                <div className="pr-8 lg:border-r">
                    <div className="mt-8 md:mt-12 lg:mt-16">
                   
                    </div>
                    <h2 className="text-4xl font-semibold mt-10 ">Notification</h2>
                    <h5 className="text-xl font-semibold mt-5">Billing Details.</h5>
                    <CheckoutForm/>
                </div>

                {/* <CheckoutDetails /> */}
            </div>
        </div>
    );
};

export default CheckoutContent;