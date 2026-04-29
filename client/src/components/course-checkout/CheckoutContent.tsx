"use client"
import React from 'react';
import BreadcrumbPath from "@/components/common/BreadcrumbPath";
import {Elements}
from "@stripe/react-stripe-js";

import {stripePromise}
from "@/lib/stripe";
import { CourseCartType } from '@/types/CourseCart';
import CheckoutForm from './CheckoutForm';
import CheckoutDetails from './CheckoutDetails';


const CheckoutContent = ({ cart }: {cart: CourseCartType}) => {
    return (
        <Elements stripe={stripePromise}>
            <div className="grid lg:grid-cols-2">
                <div className="pr-8 lg:border-r">
                    <div className="mt-8 md:mt-12 lg:mt-16">
                    <BreadcrumbPath
                        breadcrumbList={[
                        { name: "Home", href: "/" },
                        { name: "Cart", href: "/cart" },
                        { name: "Checkout", href: "/checkout" },
                        ]}
                    />
                    </div>
                    <h2 className="text-4xl font-semibold mt-10 ">Checkout</h2>
                    <h5 className="text-xl font-semibold mt-5">Billing Details.</h5>
                    <CheckoutForm/>
                </div>

                <CheckoutDetails cart={cart} />
            </div>
        </Elements>
    );
};

export default CheckoutContent;