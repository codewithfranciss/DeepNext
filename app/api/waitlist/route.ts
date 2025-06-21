import { supabase } from "@/lib/supabase";
import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/email-template";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request){
const {email} = await req.json();

if (!email) {
  return NextResponse.json({ error: "Email is required" }, { status: 400 });
}

const {data: emailExisting, error: finderror} = await supabase
    .from("waitlist")
    .select("*")
    .eq("email", email)
    .single();

if(emailExisting){
return NextResponse.json({error: "Already Joined"}, {status: 400})
}

//insert into db
const {data, error} = await supabase
    .from("waitlist")
    .insert({ email });

    if(error){
        return NextResponse.json({error: "Failed to Join Waitlist"}, {status: 500})
    }

    //send email
    try{
   await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: '🎉 You are on the DeepNext Waitlist!',
        react: EmailTemplate({ firstName: email }),
      });
    }catch(err){
        return NextResponse.json({ error: "Failed to send confirmation email" }, { status: 500 });
    }
  

}