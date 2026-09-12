const courseNotificationEmail = (data: any) => {
  const {
    // Course
    courseTitle,
    courseSlug,

    // Customer
    fullName,
    email,
    spouseName,
    howDidYouHearAboutUs,
    phoneNumber,
    otherPhoneNumber,
    country,
    state,
    city,
    zip,
    streetAddress,
    apartment,
    orderNotes: additionalInformation,
  } = data;

  const courseUrl = `https://ohelmiriam.org/course/${courseSlug}`;

  return {
    subject: `New Notification - Course Registration - ${courseTitle || "Course"}`,

    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>New Notification - Course Registration</title>
        </head>

        <body style="
          margin: 0;
          padding: 0;
          background-color: #f5f6f8;
          font-family: Arial, Helvetica, sans-serif;
          color: #333333;
        ">

          <div style="
            max-width: 700px;
            margin: 30px auto;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
          ">

            <!-- Header -->
            <div style="
              background-color: #1f2937;
              padding: 25px 30px;
              color: #ffffff;
            ">
              <h1 style="
                margin: 0;
                font-size: 24px;
                font-weight: 600;
              ">
                New Notification - Course Registration
              </h1>

              <p style="
                margin: 8px 0 0;
                font-size: 14px;
                color: #d1d5db;
              ">
                A new student has registered for a course.
              </p>
            </div>


            <!-- Course Information -->
            <div style="padding: 30px 30px 0;">

              <h2 style="
                margin: 0 0 15px;
                font-size: 18px;
                color: #111827;
              ">
                Course Information
              </h2>

              <div style="
                background-color: #f9fafb;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 20px;
              ">

                <p style="
                  margin: 0 0 18px;
                  font-size: 16px;
                  color: #111827;
                ">
                  <strong>Course Title:</strong>
                  ${courseTitle || "N/A"}
                </p>

                ${
                  courseSlug
                    ? `
                      <a
                        href="${courseUrl}"
                        target="_blank"
                        style="
                          display: inline-block;
                          padding: 11px 18px;
                          background-color: #2563eb;
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 6px;
                          font-size: 14px;
                          font-weight: 600;
                        "
                      >
                        Click here to visit the course
                      </a>
                    `
                    : ""
                }

              </div>

            </div>


            <!-- Customer Information -->
            <div style="padding: 30px;">

              <h2 style="
                margin: 0 0 15px;
                font-size: 18px;
                color: #111827;
              ">
                Customer Information
              </h2>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="border-collapse: collapse;"
              >

                <tr>
                  <td style="${labelStyle}">
                    Full Name
                  </td>
                  <td style="${valueStyle}">
                    ${fullName || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="${labelStyle}">
                    Email
                  </td>
                  <td style="${valueStyle}">
                    ${email || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="${labelStyle}">
                    Spouse Name
                  </td>
                  <td style="${valueStyle}">
                    ${spouseName || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="${labelStyle}">
                    How Did You Hear About Us?
                  </td>
                  <td style="${valueStyle}">
                    ${howDidYouHearAboutUs || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="${labelStyle}">
                    Phone Number
                  </td>
                  <td style="${valueStyle}">
                    ${phoneNumber || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="${labelStyle}">
                    Other Phone Number
                  </td>
                  <td style="${valueStyle}">
                    ${otherPhoneNumber || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="${labelStyle}">
                    Country
                  </td>
                  <td style="${valueStyle}">
                    ${country || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="${labelStyle}">
                    Street Address
                  </td>
                  <td style="${valueStyle}">
                    ${streetAddress || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="${labelStyle}">
                    Apartment
                  </td>
                  <td style="${valueStyle}">
                    ${apartment || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="${labelStyle}">
                    State
                  </td>
                  <td style="${valueStyle}">
                    ${state || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="${labelStyle}">
                    Town / City
                  </td>
                  <td style="${valueStyle}">
                    ${city || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="${labelStyle}">
                    ZIP Code
                  </td>
                  <td style="${valueStyle}">
                    ${zip || "N/A"}
                  </td>
                </tr>

              </table>


              ${
                additionalInformation
                  ? `
                    <div style="margin-top: 25px;">

                      <h3 style="
                        margin: 0 0 10px;
                        font-size: 15px;
                        color: #111827;
                      ">
                        Additional Information
                      </h3>

                      <div style="
                        background-color: #f9fafb;
                        border: 1px solid #e5e7eb;
                        border-radius: 6px;
                        padding: 15px;
                        font-size: 14px;
                        line-height: 1.6;
                        color: #4b5563;
                      ">
                        ${additionalInformation}
                      </div>

                    </div>
                  `
                  : ""
              }

            </div>


            <!-- Footer -->
            <div style="
              background-color: #f9fafb;
              border-top: 1px solid #e5e7eb;
              padding: 18px 30px;
              text-align: center;
            ">
              <p style="
                margin: 0;
                font-size: 12px;
                color: #9ca3af;
              ">
                This is an automated notification from Ohel Miriam.
              </p>
            </div>

          </div>

        </body>
      </html>
    `,
  };
};


const labelStyle = `
  width: 40%;
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  vertical-align: top;
`;

const valueStyle = `
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
  font-size: 14px;
  color: #111827;
  vertical-align: top;
`;

export default courseNotificationEmail;