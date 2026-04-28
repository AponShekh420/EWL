import { CartType } from "@/types/Cart";

const getOrderRequestData = (cart: CartType, checkoutForm: { firstName?: string; lastName?: string; email?: string; spouseName?: string; howDidYouHearAboutUs?: string; country: {label: string, value: string}; streetAddress?: string; apartment?: string; state?: {label: string, value: string}; city?: string; zipCode?: string; phoneNumber?: string; otherPhoneNumber?: string; orderNotes?: string; isDifferentBillingAddress?: boolean; differentBillingAddress?: { firstName: string; lastName: string; email: string; spouseName: string; country: { label: string; value: string; }; streetAddress: string; apartment: string; state: {label: string, value: string}; city: string; zipCode: string; phoneNumber: string; otherPhoneNumber: string; }; shippingAndTaxDetails?: { shipping: { usps: { boxUsed: string; finalWeightOz: number; rates: never[]; }; flatRate: number; localPickup: number; shippingClassRates: { shippingCost: number; }[]; impossibleProducts: never[]; }; tax: number; }; shipping?: { methodName: string; cost: number; boxUsed: string; finalWeightOz: number; servicelevel: string; }; }) => {

    const orderRequestData = {
        firstName: checkoutForm.firstName,
        lastName: checkoutForm.lastName,
        email: checkoutForm.email,
        spouseName: checkoutForm.spouseName,
        howDidYouHearAboutUs: checkoutForm.howDidYouHearAboutUs,

        phoneNumber: checkoutForm.phoneNumber,
        otherPhoneNumber: checkoutForm.otherPhoneNumber,

        country: checkoutForm.country.label,
        state: checkoutForm.state?.label,
        city: checkoutForm.city,
        zip: checkoutForm.zipCode,

        streetAddress: checkoutForm.streetAddress,
        apartment: checkoutForm.apartment,

        totalProduct: cart.totalProduct,
        subtotal: cart.totalPrice,
        tax: Number(checkoutForm.shippingAndTaxDetails?.tax),

        orderNotes: checkoutForm.orderNotes,

        products: cart.items.map((item)=> (
            {
                price: item.price,
                _id: item.product._id,
                quantity: item.quantity
            }
        )),

        shipping: checkoutForm.shipping,

        shippingClassRates: checkoutForm.shippingAndTaxDetails?.shipping.shippingClassRates,

        paymentStatus: "pending",
        status: "pending",

        isDifferentBillingAddress: checkoutForm.isDifferentBillingAddress,

        differentBillingAddress: {
            firstName: checkoutForm.differentBillingAddress?.firstName,
            lastName: checkoutForm.differentBillingAddress?.lastName,
            email: checkoutForm.differentBillingAddress?.email,
            spouseName: checkoutForm.differentBillingAddress?.spouseName,

            phoneNumber: checkoutForm.differentBillingAddress?.phoneNumber,
            otherPhoneNumber: checkoutForm.differentBillingAddress?.otherPhoneNumber,

            country: checkoutForm.differentBillingAddress?.country.label,
            state: checkoutForm.differentBillingAddress?.state.label,
            city: checkoutForm.differentBillingAddress?.city,
            zip: checkoutForm.differentBillingAddress?.zipCode,

            streetAddress: checkoutForm.differentBillingAddress?.streetAddress,
            apartment: checkoutForm.differentBillingAddress?.apartment
        }
    };

    return orderRequestData;
}

export default getOrderRequestData;