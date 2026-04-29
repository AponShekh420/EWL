import { ClassCartType } from "@/types/ClassCart";

const getClassOrderRequestData = (cart: ClassCartType, checkoutForm: { fullName?: string; email?: string; spouseName?: string; howDidYouHearAboutUs?: string; country: {label: string, value: string}; streetAddress?: string; apartment?: string; state?: {label: string, value: string}; city?: string; zipCode?: string; phoneNumber?: string; otherPhoneNumber?: string; orderNotes?: string; isDifferentBillingAddress?: boolean; differentBillingAddress?: { firstName: string; lastName: string; email: string; spouseName: string; country: { label: string; value: string; }; streetAddress: string; apartment: string; state: {label: string, value: string}; city: string; zipCode: string; phoneNumber: string; otherPhoneNumber: string; } }) => {

    const orderRequestData = {
        fullName: checkoutForm.fullName,
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

        totalClass: cart.totalClass,
        subtotal: cart.totalPrice,

        orderNotes: checkoutForm.orderNotes,

        classes: cart.items.map((item)=> (
            {
                price: item.price,
                _id: item.class._id,
                quantity: item.quantity
            }
        )),
        paymentStatus: "pending",
        status: "pending",
    };

    return orderRequestData;
}

export default getClassOrderRequestData;