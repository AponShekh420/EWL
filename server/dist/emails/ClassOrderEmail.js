"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const ClassOrderEmail = async (order) => {
    const classRows = order.classes.map((item) => `

<tr>

<td>
<strong>${item._id.title}</strong>

<br>

<small>${item._id.category || ""}</small>
</td>

<td align="center">
${item.quantity || 1}
</td>

<td align="center">
$${Number(item.price).toFixed(2)}
</td>

<td align="center">
$${(Number(item.price) * Number(item.quantity || 1)).toFixed(2)}
</td>

</tr>

`).join("");
    const adminTemplate = `
<!DOCTYPE html>
<html>

<body style="margin:0;padding:40px;background:#f4f4f4;font-family:Arial">

<table width="900" align="center" style="background:#fff;border:1px solid #ddd;border-collapse:collapse;">

    <!-- Header -->
    <tr>
        <td style="background:#6a1b4d;padding:25px;text-align:center;">
            <h1 style="color:#fff;margin:0;">
                New Class Registration Received
            </h1>

            <p style="color:#fff;margin-top:10px;">
                A new class registration has been completed successfully.
            </p>
        </td>
    </tr>

    <!-- Order Information -->
    <tr>
        <td style="padding:25px;">

            <table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">

                <tr>
                    <td><strong>Order Number</strong></td>
                    <td>#${order.orderId}</td>

                    <td><strong>Date</strong></td>
                    <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>

                <tr>
                    <td><strong>Payment Status</strong></td>
                    <td style="color:green;text-transform:capitalize;">
                        ${order.paymentStatus}
                    </td>

                    <td><strong>Total Paid</strong></td>
                    <td>$${order.totalPrice.toFixed(2)}</td>
                </tr>

            </table>

        </td>
    </tr>

    <!-- Classes -->
    <tr>
        <td style="padding:0 25px 25px;">

            <h2 style="color:#6a1b4d;">
                Registered Classes
            </h2>

            <table width="100%" border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">

                <tr style="background:#f7f7f7;">
                    <th>Class</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>

                ${classRows}

            </table>

        </td>
    </tr>

    <!-- Total -->
    <tr>
        <td style="padding:0 25px 25px;">

            <table align="right" width="320" border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">

                <tr>
                    <td>Subtotal</td>
                    <td align="right">
                        $${order.subtotal.toFixed(2)}
                    </td>
                </tr>

                <tr>
                    <td><strong>Total</strong></td>
                    <td align="right">
                        <strong>
                            $${order.totalPrice.toFixed(2)}
                        </strong>
                    </td>
                </tr>

            </table>

        </td>
    </tr>

    <!-- Customer + Billing -->
    <tr>
        <td style="padding:25px;">

            <table width="100%" cellpadding="0" cellspacing="0">

                <tr>

                    <!-- Customer -->
                    <td width="48%" valign="top" style="border:1px solid #ddd;padding:15px;">

                        <h3 style="margin-top:0;">
                            Customer Details
                        </h3>

                        <p>
                            <strong>Name:</strong><br>
                            ${order.customer.fullName}
                        </p>

                        <p>
                            <strong>Email:</strong><br>
                            ${order.customer.email}
                        </p>

                    </td>

                    <td width="4%"></td>

                    <!-- Billing -->
                    <td width="48%" valign="top" style="border:1px solid #ddd;padding:15px;">

                        <h3 style="margin-top:0;">
                            Billing Information
                        </h3>

                        <p>
                            <strong>Full Name:</strong><br>
                            ${order.firstName} ${order.lastName}
                        </p>

                        <p>
                            <strong>Email:</strong><br>
                            ${order.email || order.customer.email}
                        </p>

                        <p>
                            <strong>Phone:</strong><br>
                            ${order.phoneNumber}
                        </p>

                        <p>
                            <strong>Phone 2:</strong><br>
                            ${order.otherPhoneNumber || "N/A"}
                        </p>

                        <p>
                            <strong>Spouse Name:</strong><br>
                            ${order.spouseName || "N/A"}
                        </p>

                        <p>
                            <strong>Address:</strong><br>
                            ${order.streetAddress}<br>
                            ${order?.apartment || ""}<br>
                            ${order.city}, ${order.state} ${order.zip}<br>
                            ${order.country}
                        </p>

                        <p>
                            <strong>How Did You Hear About Us?</strong><br>
                            ${order.howDidYouHearAboutUs || "N/A"}
                        </p>

                        <p>
                            <strong>Order Notes:</strong><br>
                            ${order.orderNotes || "N/A"}
                        </p>

                    </td>

                </tr>

            </table>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td style="background:#f8f8f8;text-align:center;padding:25px;">

            <p style="margin:0;">
                <a href="https://ohelmiriam.org/dashboard/e-learning/class-orders/${order._id}">
                    View this registration in the Admin Dashboard
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

<body style="margin:0;padding:40px;background:#f4f4f4;font-family:Arial">

<table width="900" align="center" style="background:#fff;border:1px solid #ddd;border-collapse:collapse;">

    <!-- Header -->
    <tr>
        <td style="background:#6a1b4d;padding:25px;text-align:center;">

            <h1 style="color:#fff;margin:0;">
                Thank You for Registering!
            </h1>

            <p style="color:#fff;margin-top:10px;">
                Your class registration has been confirmed successfully. We're excited to have you join us!
            </p>

        </td>
    </tr>

    <!-- Registration Info -->
    <tr>
        <td style="padding:25px;">

            <table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">

                <tr>
                    <td><strong>Registration #</strong></td>
                    <td>#${order.orderId}</td>

                    <td><strong>Date</strong></td>
                    <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>

                <tr>
                    <td><strong>Payment Status</strong></td>
                    <td style="color:green;text-transform:capitalize;">
                        ${order.paymentStatus}
                    </td>

                    <td><strong>Total Paid</strong></td>
                    <td>$${order.totalPrice.toFixed(2)}</td>
                </tr>

            </table>

        </td>
    </tr>

    <!-- Classes -->
    <tr>
        <td style="padding:0 25px 25px;">

            <h2 style="color:#6a1b4d;">
                Registered Classes
            </h2>

            <table width="100%" border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">

                <tr style="background:#f7f7f7;">
                    <th>Class</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>

                ${classRows}

            </table>

        </td>
    </tr>

    <!-- Totals -->
    <tr>
        <td style="padding:0 25px 25px;">

            <table align="right" width="320" border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">

                <tr>
                    <td>Subtotal</td>
                    <td align="right">
                        $${order.subtotal.toFixed(2)}
                    </td>
                </tr>

                <tr>
                    <td><strong>Total Paid</strong></td>
                    <td align="right">
                        <strong>$${order.totalPrice.toFixed(2)}</strong>
                    </td>
                </tr>

            </table>

        </td>
    </tr>

    <!-- Registration Details -->
    <tr>
        <td style="padding:25px;">

            <table width="100%" cellpadding="0" cellspacing="0">

                <tr>

                    <!-- Account -->
                    <td width="48%" valign="top" style="border:1px solid #ddd;padding:15px;">

                        <h3 style="margin-top:0;">
                            Your Account
                        </h3>

                        <p>
                            <strong>Name:</strong><br>
                            ${order.customer.firstName} ${order.customer.lastName}
                        </p>

                        <p>
                            <strong>Email:</strong><br>
                            ${order.customer.email}
                        </p>

                    </td>

                    <td width="4%"></td>

                    <!-- Registration -->
                    <td width="48%" valign="top" style="border:1px solid #ddd;padding:15px;">

                        <h3 style="margin-top:0;">
                            Registration Information
                        </h3>

                        <p>
                            <strong>Full Name:</strong><br>
                            ${order.firstName} ${order.lastName}
                        </p>

                        <p>
                            <strong>Email:</strong><br>
                            ${order.email || order.customer.email}
                        </p>

                        <p>
                            <strong>Phone:</strong><br>
                            ${order.phoneNumber}
                        </p>

                        <p>
                            <strong>Phone 2:</strong><br>
                            ${order.otherPhoneNumber || "N/A"}
                        </p>

                        <p>
                            <strong>Spouse Name:</strong><br>
                            ${order.spouseName || "N/A"}
                        </p>

                        <p>
                            <strong>Address:</strong><br>
                            ${order.streetAddress}<br>
                            ${order?.apartment || ""}<br>
                            ${order.city}, ${order.state} ${order.zip}<br>
                            ${order.country}
                        </p>

                    </td>

                </tr>

            </table>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td style="background:#f8f8f8;text-align:center;padding:30px;">

            <h3 style="margin:0;color:#6a1b4d;">
                Need Help?
            </h3>

            <p style="margin:10px 0 5px;">
                If you have any questions regarding your registration, please contact us.
            </p>

            <p style="margin:5px;">
                <strong>Email:</strong> ohelmiriam@gmail.com
            </p>

            <p style="margin-top:20px;color:#888;font-size:13px;">
                Thank you for choosing Ohel Miriam. We look forward to seeing you in class!
            </p>

        </td>
    </tr>

</table>

</body>
</html>
`;
    try {
        // Email send to the user
        await (0, sendEmail_1.default)({
            fromEmail: `${process.env.EMAIL_USERNAME}`,
            toEmail: order?.email || order?.customer?.email,
            subject: `Class Registration Confirmed - #${order.orderId}`,
            message: customerTemplate,
        });
        // Email send to the admin
        await (0, sendEmail_1.default)({
            fromEmail: `${process.env.EMAIL_USERNAME}`,
            toEmail: `${process.env.EMAIL_USERNAME}`,
            subject: `New Class Registration Received - #${order.orderId}`,
            message: adminTemplate,
        });
        return console.log("Email sent successfully");
    }
    catch (error) {
        return console.error("Error sending email:", error);
    }
};
exports.default = ClassOrderEmail;
