import sendEmail from "../utils/sendEmail";

const CourseOrderEmail = async (order: any) => {

const courseRows = order.courses.map((course:any)=>`

<tr>

<td>

<strong>
${course._id.title}
</strong>

<br>

<small>
${course._id.category || ""}
</small>

</td>


<td align="center">
${course.quantity}
</td>


<td align="center">
$${Number(course.price).toFixed(2)}
</td>


<td align="center">
$${(
Number(course.price) * Number(course.quantity)
).toFixed(2)}
</td>


</tr>

`).join("");


const packageRows = order.packages.map((pkg:any)=>`

<tr>

<td>

${pkg.modules.map(
(module:any,index:number)=>`
<p style="margin:3px 0;">
${index + 1}. ${module.name}
</p>
`
).join("")}

</td>


<td align="center">

$${Number(pkg.packagePrice).toFixed(2)}

</td>


<td align="center">

${new Date(pkg.date).toLocaleDateString()}

</td>


</tr>

`).join("");



const adminTemplate = `

<!DOCTYPE html>
<html>

<body style="margin:0;padding:40px;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif">


<table width="900" align="center" cellpadding="0" cellspacing="0" style="background:white;border:1px solid #ddd">


<tr>
<td style="background:#6a1b4d;padding:25px;text-align:center">

<h1 style="color:white;margin:0">
New Course Order Received
</h1>

<p style="color:white">
A new course enrollment has been confirmed successfully.
</p>

</td>
</tr>



<tr>
<td style="padding:25px">


<table width="100%" border="1" cellpadding="8" cellspacing="0">


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
<strong>Payment Status</strong>
</td>

<td style="color:green;font-weight:bold">
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
Course Details
</h2>


<table width="100%" border="1" cellpadding="10" cellspacing="0">


<tr style="background:#f8f8f8">

<th align="left">
Course
</th>

<th>
Quantity
</th>

<th>
Price
</th>

<th>
Total
</th>

</tr>


${courseRows}


</table>


</td>
</tr>






<tr>

<td style="padding:25px">


<h2 style="color:#6a1b4d">
Package & Modules
</h2>



<table width="100%" border="1" cellpadding="10" cellspacing="0">


<tr style="background:#f8f8f8">


<th align="left">
Modules
</th>


<th>
Package Price
</th>


<th>
Date
</th>


</tr>


${packageRows}


</table>


</td>

</tr>






<tr>

<td style="padding:25px">


<table align="right" width="300" border="1" cellpadding="8" cellspacing="0">


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

<strong>Name:</strong><br>

${order.customer.firstName}
${order.customer.lastName}

</p>


<p>

<strong>Email:</strong><br>

${order.customer.email}

</p>


</td>




<td width="50%" valign="top" style="border:1px solid #ddd;padding:15px">


<h3>
Billing Information
</h3>


<p>

<strong>Name:</strong><br>

${order.fullName || `${order.firstName} ${order.lastName}`}

</p>


<p>

<strong>Email:</strong><br>

${order.email}

</p>

<p>

<strong>Spouse Name:</strong><br>

${order.spouseName || "N/A"}

</p>

<p>

<strong>How Did You Hear About Us?</strong><br>

${order.howDidYouHearAboutUs || "N/A"}

</p>


<p>

${order.streetAddress}

<br>

${order.apartment || ""}

<br>

${order.city},
${order.state}

<br>

${order.country}
-
${order.zip}

</p>


<p>

<strong>Phone:</strong>

${order.phoneNumber}

</p>


</td>



</tr>


</table>


</td>


</tr>





<tr>

<td style="padding:25px;background:#f8f8f8;text-align:center">


<p>
<a href="https://ohelmiriam.org/dashboard/e-learning/orders/${order._id}">
View Complete Order
</a>
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

<body style="margin:0;padding:40px;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif">


<table width="900" align="center" cellpadding="0" cellspacing="0" style="background:white;border:1px solid #ddd">


<tr>

<td style="background:#6a1b4d;padding:25px;text-align:center">


<h1 style="color:white;margin:0">
Thank You For Your Course Order!
</h1>


<p style="color:white">

Your enrollment has been confirmed successfully.

</p>


</td>

</tr>





<tr>

<td style="padding:25px">


<table width="100%" border="1" cellpadding="8" cellspacing="0">


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


<td style="color:green;font-weight:bold">
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
Your Courses
</h2>


<table width="100%" border="1" cellpadding="10" cellspacing="0">


<tr style="background:#f8f8f8">


<th align="left">
Course
</th>


<th>
Quantity
</th>


<th>
Price
</th>


<th>
Total
</th>


</tr>


${courseRows}


</table>


</td>


</tr>







<tr>

<td style="padding:25px">


<h2 style="color:#6a1b4d">
Your Packages & Modules
</h2>


<table width="100%" border="1" cellpadding="10" cellspacing="0">


<tr style="background:#f8f8f8">


<th align="left">
Modules
</th>


<th>
Package Price
</th>


<th>
Date
</th>


</tr>


${packageRows}


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


<h3>
Billing Information
</h3>


<p>


<strong>Name:</strong>

${order.fullName || `${order.firstName} ${order.lastName}`}

<br>

<strong>Email:</strong>

${order.email}

<br><br>


${order.streetAddress}

<br>

${order.apartment || ""}

<br>

${order.city},
${order.state}

<br>

${order.country}
-
${order.zip}


<br><br>


<strong>Phone:</strong>

${order.phoneNumber}


</p>



<p>

<strong>How Did You Hear About Us?</strong><br>

${order.howDidYouHearAboutUs || "N/A"}

</p>
<p>

<strong>Spouse Name:</strong>

${order.spouseName || "N/A"}

</p>


<p>

<strong>Order Notes:</strong><br>

${order.orderNotes || "N/A"}

</p>


</td>


</tr>






<tr>

<td style="background:#f8f8f8;padding:25px;text-align:center">


<h3>
Need Help?
</h3>


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
            toEmail: order?.email || order?.customer?.email,
            subject: `Enrollment Confirmation - Order - #${order.orderId}`,
            message: customerTemplate,
        })

        // Email send to the admin
        await sendEmail({
            fromEmail: `${process.env.EMAIL_USERNAME}`,
            toEmail: `${process.env.EMAIL_USERNAME}`,
            subject: `New Enrollment Received - Order - #${order.orderId}`,
            message: adminTemplate,
        })
        return console.log("Email sent successfully");
    } catch (error) {
        return console.error("Error sending email:", error);
    }
    
}

export default CourseOrderEmail;