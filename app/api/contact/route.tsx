import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

function encodeData(data: string): string {
  return Buffer.from(data).toString("base64")
}

function hashEmail(email: string): string {
  // Create a simple hash for logging purposes (not cryptographically secure, but obfuscates email)
  return Buffer.from(email).toString("base64").substring(0, 12) + "..."
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, company } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    console.log("[v0] Contact form submission received:", {
      nameHash: hashEmail(name),
      emailHash: hashEmail(email),
      company,
      timestamp: new Date().toISOString(),
    })

    // Determine recipient email based on company selection
    let recipientEmail: string
    let companyName: string

    switch (company) {
      case "xeno":
        recipientEmail = "contant.xeno.interaction.llc@gmail.com"
        companyName = "Xeno Interactions LLC"
        break
      case "treron":
        recipientEmail = "treronsupport@trerondevelopment.xyz"
        companyName = "Treron Development™ LLC"
        break
      case "both":
        recipientEmail = "contant.xeno.interaction.llc@gmail.com,treronsupport@trerondevelopment.xyz"
        companyName = "Both Companies"
        break
      default:
        recipientEmail = "contant.xeno.interaction.llc@gmail.com"
        companyName = "Xeno Interactions LLC"
    }

    // Create transporter (using Gmail SMTP)
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const sanitizedMessage = message.replace(/[<>]/g, "").trim()
    const sanitizedName = name.replace(/[<>]/g, "").trim()
    const sanitizedSubject = subject.replace(/[<>]/g, "").trim()

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject: `Contact Form: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4F46E5; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Subject:</strong> ${sanitizedSubject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #555;">${sanitizedMessage.replace(/\n/g, "<br>")}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e3f2fd; border-radius: 8px;">
            <p style="margin: 0; color: #1976d2; font-size: 14px;">
              <strong>Reply to:</strong> ${email}
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 10px; background-color: #f5f5f5; border-radius: 4px; font-size: 12px; color: #666;">
            <p style="margin: 0;"><strong>Security Info:</strong> Submission ID: ${encodeData(Date.now().toString())}</p>
          </div>
        </div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    console.log("[v0] Email sent successfully to:", companyName)
    return NextResponse.json(
      {
        message: "Email sent successfully",
        submissionId: encodeData(Date.now().toString()),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error sending email:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
