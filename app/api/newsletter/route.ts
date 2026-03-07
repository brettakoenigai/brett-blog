import { NextRequest, NextResponse } from "next/server";

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Add contact to SendGrid contact list
    const contactData = {
      list_ids: [process.env.SENDGRID_CONTACT_LIST_ID],
      contacts: [
        {
          email: email,
        },
      ],
    };

    const response = await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("SendGrid API error:", errorData);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    // Send welcome email
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: "Welcome to Brett Koenig's Newsletter",
      text: `Thanks for subscribing to my newsletter! You'll receive updates about my latest blog posts, videos, and insights.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to My Newsletter!</h1>
          <p>Thanks for subscribing! I'm excited to share my thoughts on leadership, technology, and life with you.</p>
          <p>You'll receive updates about:</p>
          <ul>
            <li>New blog posts</li>
            <li>YouTube videos</li>
            <li>Podcast episodes</li>
            <li>Exclusive insights and tips</li>
          </ul>
          <p>Stay tuned!</p>
          <p>Best,<br>Brett Koenig</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
