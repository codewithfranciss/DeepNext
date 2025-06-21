import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Check if already exists
    const { data: emailExisting } = await supabase
      .from("waitlist")
      .select("*")
      .eq("email", email)
      .single();

    if (emailExisting) {
      return NextResponse.json({ message: "Already Joined" }, { status: 400 });
    }

    // Insert new email
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ email });

    if (insertError) {
      return NextResponse.json({ error: "Failed to Join Waitlist" }, { status: 500 });
    }

    // Send confirmation email
    await resend.emails.send({
      from: "DeepNext <onboarding@resend.dev>",
      to: email,
      subject: "🎉 You are on the DeepNext Waitlist!",
      html: `
     <div style="font-family: Arial, sans-serif; padding: 24px; background: #0f172a; color: white; border-radius: 12px;">
  <h1 style="font-size: 28px; color: #38bdf8;">🎉 You're In!</h1>
  <p style="font-size: 16px; line-height: 1.5;">
    Welcome to <strong>DeepNext</strong>, the elite zone for Next.js content.
    <br /><br />
    You're officially on the waitlist. As soon as we go live, you’ll be the first to know. 🚀
  </p>

  <p style="font-size: 15px; margin-top: 24px;">
    In the meantime, why not join us on Twitter and see what we’re building in real-time?
  </p>

  <a 
    href="https://twitter.com/deepnextdev"
    style="display: inline-block; margin-top: 12px; padding: 12px 20px; background: linear-gradient(to right, #3b82f6, #9333ea); color: white; border-radius: 8px; text-decoration: none; font-weight: bold;"
    target="_blank"
  >
    Follow us on X
  </a>

  <p style="font-size: 13px; color: #94a3b8; margin-top: 32px;">
    Thanks for being an early supporter 🙌<br />
    The DeepNext Team
  </p>
</div>

    `
    });

    return NextResponse.json({ message: "Successfully joined waitlist" }, { status: 200 });
  } catch (err: any) {
    console.error("Waitlist handler error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
