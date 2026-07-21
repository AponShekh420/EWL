"use client";

import { BASE_URL } from "@/utils/envVariable";
import { toast } from "react-hot-toast";

const CreateShippingLabel = ({ orderId }: { orderId: string }) => {

    const createShippingLabelFunction = async (orderId: string) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/ecommerce/usps/shipping-label/create/${orderId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ orderId }),
                }
            );

            const data = await response.json();

            if (data.success) {
                console.log("Shipping label created successfully:", data);
                toast.success("Shipping label created successfully!");
                // Handle success (e.g., show a success message, update UI)
                window.location.reload();
            } else {
                // console.error("Failed to create shipping label:", data.message);
                toast.error("Failed to create shipping label!");
                // Handle failure (e.g., show an error message)
            }
        } catch (error) {
            console.error("Error creating shipping label:", error);
            // Handle error (e.g., show an error message)
        }
    };


    return (
        <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded shadow-sm transition-colors text-xs"
            onClick={() => createShippingLabelFunction(orderId)}
            >  
            Purchase label
        </button>
    );
}

export default CreateShippingLabel;