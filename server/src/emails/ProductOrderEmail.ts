import sendEmail from "../utils/sendEmail";
import { userRegisterTemplate } from "./userRegisterTemplate";

const ProductOrderEmail = async (order: any) => {
//   const { customerName, customerEmail, orderId, orderDate, products } = order;

//   const adminUserLink = `${process.env.CLIENT_URL}/dashboard/users/edit/${userStatus?._id}`; 
const shippingCost =
(
(order?.shipping?.cost || 0) +
(order.shippingClassRates || [])
.reduce((total: number, rate: any)=> total + rate.shippingCost,0)
).toFixed(2);


const productRows = order.products.map((product: any)=>`

<tr>

<td>
${product._id.title}

<br>

<small>
${product._id.category}
</small>

</td>


<td>
N/A
</td>


<td align="center">
${product.quantity}
</td>


<td align="center">
$${Number(product.price).toFixed(2)}
</td>


<td align="center">
$${(product.price * product.quantity).toFixed(2)}
</td>


</tr>

`).join("");



const adminTemplate = `

<!DOCTYPE html>
<html>

<body style="margin:0;padding:40px;background:#f4f4f4;font-family:Arial">


<table width="900" align="center" style="background:white;border:1px solid #ddd;">


<tr>

<td style="background:#6a1b4d;padding:25px;text-align:center">


<h1 style="color:white">
You have received the product order.
</h1>


<p style="color:white">
Your order has been confirmed successfully.
</p>


</td>

</tr>



<tr>

<td style="padding:25px">


<table width="100%" border="1" cellpadding="8">


<tr>

<td>
<strong>Order Number</strong>
</td>

<td>
#${order.orderId}
</td>


<td>
<strong>Date</strong>
</td>

<td>
${new Date(order.createdAt).toLocaleDateString()}
</td>


</tr>


<tr>


<td>
<strong>Status</strong>
</td>

<td style="color:green">
${order.paymentStatus}
</td>


<td>
<strong>Total</strong>
</td>

<td>
$${order.totalPrice.toFixed(2)}
</td>


</tr>



</table>


</td>

</tr>





<tr>

<td style="padding:0 25px">


<h2 style="color:#6a1b4d">
Order Items
</h2>



<table width="100%" border="1" cellpadding="10">


<tr>

<th>
Product
</th>


<th>
SKU
</th>


<th>
Qty
</th>


<th>
Price
</th>


<th>
Total
</th>


</tr>


${productRows}


</table>


</td>


</tr>





<tr>

<td style="padding:25px">


<table align="right" width="300" border="1" cellpadding="8">


<tr>

<td>
Subtotal
</td>

<td align="right">
$${order.subtotal.toFixed(2)}
</td>

</tr>



<tr>

<td>
Tax
</td>

<td align="right">
$${order.tax.toFixed(2)}
</td>

</tr>



<tr>

<td>
Shipping
</td>

<td align="right">
$${shippingCost}
</td>

</tr>



<tr>

<td>
<strong>Total</strong>
</td>


<td align="right">
<strong>
$${order.totalPrice.toFixed(2)}
</strong>
</td>


</tr>


</table>


</td>


</tr>






<tr>


<td style="padding:25px">


<table width="100%">


<tr>



<td width="50%" valign="top" style="border:1px solid #ddd;padding:15px">


<h3>
Customer Details
</h3>


<p>

<strong>Name:</strong>

${order.customer.firstName}
${order.customer.lastName}

</p>


<p>

<strong>Email:</strong>

${order.customer.email}

</p>


</td>





<td width="50%" valign="top" style="border:1px solid #ddd;padding:15px">


<h3>
Shipping Address
</h3>


<p>

${order.differentBillingAddress.firstName}
${order.differentBillingAddress.lastName}

<br>

${order.differentBillingAddress.email}

<p>

<strong>Spouse Name:</strong>

${order.differentBillingAddress.spouseName}

</p>

${order.differentBillingAddress.streetAddress}

<br>

${order.differentBillingAddress.city}

<br>

${order.differentBillingAddress.state}

<br>

${order.differentBillingAddress.country}

<br>

Phone:
${order.differentBillingAddress.phoneNumber}

</p>



</td>



</tr>



<tr>


<td colspan="2" style="border:1px solid #ddd;padding:15px">


<h3>
Billing Information
</h3>


<p>

${order.firstName}
${order.lastName}

<br>

${order.email}

<p>

<strong>Spouse Name:</strong>

${order.spouseName}

</p>
<p>

<strong>How Did You Hear About Us?:</strong>

${order.howDidYouHearAboutUs}

</p>

${order.streetAddress}

<br>

${order.city},
${order.state}

<br>

${order.country}

<br>

Phone:
${order.phoneNumber}

</p>


</td>


</tr>



</table>


</td>


</tr>





<tr>

<td style="background:#f8f8f8;text-align:center;padding:25px">

<p>
<a href="https://ohelmiriam.org/dashboard/ecommerce/orders/${order._id}">Click here</a> to see all the information about this order. 
</p>

</td>


</tr>



</table>


</body>

</html>

`;

    const customerTemplate = `

<!DOCTYPE html>
<html>

<body style="margin:0;padding:40px;background:#f4f4f4;font-family:Arial">


<table width="900" align="center" style="background:white;border:1px solid #ddd;">


<tr>

<td style="background:#6a1b4d;padding:25px;text-align:center">


<h1 style="color:white">
Thank You For Your Order!
</h1>


<p style="color:white">
Your order has been confirmed successfully.
</p>


</td>

</tr>



<tr>

<td style="padding:25px">


<table width="100%" border="1" cellpadding="8">


<tr>

<td>
<strong>Order Number</strong>
</td>

<td>
#${order.orderId}
</td>


<td>
<strong>Date</strong>
</td>

<td>
${new Date(order.createdAt).toLocaleDateString()}
</td>


</tr>


<tr>


<td>
<strong>Status</strong>
</td>

<td style="color:green">
${order.paymentStatus}
</td>


<td>
<strong>Total</strong>
</td>

<td>
$${order.totalPrice.toFixed(2)}
</td>


</tr>



</table>


</td>

</tr>





<tr>

<td style="padding:0 25px">


<h2 style="color:#6a1b4d">
Order Items
</h2>



<table width="100%" border="1" cellpadding="10">


<tr>

<th>
Product
</th>


<th>
SKU
</th>


<th>
Qty
</th>


<th>
Price
</th>


<th>
Total
</th>


</tr>


${productRows}


</table>


</td>


</tr>





<tr>

<td style="padding:25px">


<table align="right" width="300" border="1" cellpadding="8">


<tr>

<td>
Subtotal
</td>

<td align="right">
$${order.subtotal.toFixed(2)}
</td>

</tr>



<tr>

<td>
Tax
</td>

<td align="right">
$${order.tax.toFixed(2)}
</td>

</tr>



<tr>

<td>
Shipping
</td>

<td align="right">
$${shippingCost}
</td>

</tr>



<tr>

<td>
<strong>Total</strong>
</td>


<td align="right">
<strong>
$${order.totalPrice.toFixed(2)}
</strong>
</td>


</tr>


</table>


</td>


</tr>






<tr>


<td style="padding:25px">


<table width="100%">


<tr>



<td width="50%" valign="top" style="border:1px solid #ddd;padding:15px">


<h3>
Customer Details
</h3>


<p>

<strong>Name:</strong>

${order.customer.firstName}
${order.customer.lastName}

</p>


<p>

<strong>Email:</strong>

${order.customer.email}

</p>


</td>





<td width="50%" valign="top" style="border:1px solid #ddd;padding:15px">


<h3>
Shipping Address
</h3>


<p>

${order.differentBillingAddress.firstName}
${order.differentBillingAddress.lastName}

<br>

${order.differentBillingAddress.email}

<p>

<strong>Spouse Name:</strong>

${order.differentBillingAddress.spouseName}

</p>

${order.differentBillingAddress.streetAddress}

<br>

${order.differentBillingAddress.city}

<br>

${order.differentBillingAddress.state}

<br>

${order.differentBillingAddress.country}

<br>

Phone:
${order.differentBillingAddress.phoneNumber}

</p>



</td>



</tr>



<tr>


<td colspan="2" style="border:1px solid #ddd;padding:15px">


<h3>
Billing Information
</h3>


<p>

${order.firstName}
${order.lastName}

<br>

${order.email}

<p>

<strong>Spouse Name:</strong>

${order.spouseName}

</p>
<p>

<strong>How Did You Hear About Us?:</strong>

${order.howDidYouHearAboutUs}

</p>

${order.streetAddress}

<br>

${order.city},
${order.state}

<br>

${order.country}

<br>

Phone:
${order.phoneNumber}

</p>


</td>


</tr>



</table>


</td>


</tr>





<tr>

<td style="background:#f8f8f8;text-align:center;padding:25px">


<p>
Need Help?
</p>


<p>
ohelmiriam@gmail.com
</p>

</td>


</tr>



</table>


</body>

</html>

`;

    try {
        // Email send to the user
        await sendEmail({
            fromEmail: `${process.env.EMAIL_USERNAME}`,
            toEmail: order?.email || order?.differentBillingAddress?.email || order?.customer?.email,
            subject: "Confirmation of Your Product Order",
            message: customerTemplate,
        })

        // Email send to the admin
        await sendEmail({
            fromEmail: `${process.env.EMAIL_USERNAME}`,
            toEmail: `${process.env.EMAIL_USERNAME}`,
            subject: "New Product Order Received",
            message: adminTemplate,
        })
        return console.log("Email sent successfully");
    } catch (error) {
        return console.error("Error sending email:", error);
    }
    
}

export default ProductOrderEmail;