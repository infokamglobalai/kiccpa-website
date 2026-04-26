"use server";

import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  scope: z.string().min(1),
  message: z.string().min(10),
});

export async function submitContactAction(formData: FormData) {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    scope: formData.get("scope"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid fields. Please check your entries." };
  }

  const { name, email, scope, message } = validatedFields.data;

  try {
    // Calling the standalone MongoDB backend server
    const API = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    const response = await fetch(`${API}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, scope, message }),
    });

    if (!response.ok) {
      throw new Error("Backend response failed");
    }

    const data = await response.json();
    return { success: true, message: data.message || "Message sent successfully!" };
  } catch (err) {
    console.error("Backend Error:", err);
    return { error: "We're experiencing a connection issue. Please try again or contact us directly at marketing.gcc@kiccpa.com." };
  }
}

const DemoBookingSchema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  workEmail: z.string().email("Enter a valid work email."),
  organization: z.string().min(2, "Enter your organization name."),
  jobTitle: z.string().max(120).default(""),
  phone: z.string().max(40).default(""),
  countryRegion: z.string().min(2, "Enter your country or region."),
  productInterest: z.string().min(1, "Choose a product interest."),
  preferredDate: z
    .string()
    .min(1, "Choose a preferred date.")
    .refine((d) => {
      const x = new Date(d);
      if (Number.isNaN(x.getTime())) return false;
      const t = new Date();
      t.setHours(0, 0, 0, 0);
      const s = new Date(x);
      s.setHours(0, 0, 0, 0);
      return s >= t;
    }, "Preferred date must be today or later."),
  timePreference: z.enum(["morning", "afternoon", "evening", "flexible"]),
  timezone: z.string().max(120).default(""),
  goals: z.string().min(10, "Describe your goals (at least 10 characters)."),
  company_website: z.string().default(""),
});

export type DemoBookingResult =
  | { success: true; message: string; referenceId: string }
  | { error: string };

export async function submitDemoBookingAction(formData: FormData): Promise<DemoBookingResult> {
  const validated = DemoBookingSchema.safeParse({
    fullName: formData.get("fullName"),
    workEmail: formData.get("workEmail"),
    organization: formData.get("organization"),
    jobTitle: formData.get("jobTitle") ?? "",
    phone: formData.get("phone") ?? "",
    countryRegion: formData.get("countryRegion"),
    productInterest: formData.get("productInterest"),
    preferredDate: formData.get("preferredDate"),
    timePreference: formData.get("timePreference"),
    timezone: formData.get("timezone") ?? "",
    goals: formData.get("goals"),
    company_website: formData.get("company_website") ?? "",
  });

  if (!validated.success) {
    const first = validated.error.flatten().fieldErrors;
    const msg =
      first.fullName?.[0] ||
      first.workEmail?.[0] ||
      first.organization?.[0] ||
      first.countryRegion?.[0] ||
      first.productInterest?.[0] ||
      first.preferredDate?.[0] ||
      first.timePreference?.[0] ||
      first.goals?.[0] ||
      validated.error.issues[0]?.message ||
      "Please check your entries.";
    return { error: msg };
  }

  const v = validated.data;

  try {
    const API = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    const response = await fetch(`${API}/api/demo-bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: v.fullName,
        workEmail: v.workEmail,
        organization: v.organization,
        jobTitle: v.jobTitle,
        phone: v.phone,
        countryRegion: v.countryRegion,
        productInterest: v.productInterest,
        preferredDate: v.preferredDate,
        timePreference: v.timePreference,
        timezone: v.timezone,
        goals: v.goals,
        company_website: v.company_website,
      }),
    });

    const data = (await response.json()) as {
      success?: boolean;
      error?: string;
      message?: string;
      referenceId?: string;
    };

    if (!response.ok || !data.success) {
      return { error: data.error || "Could not submit your request. Please try again." };
    }

    return {
      success: true,
      message: data.message || "Your demo request has been received.",
      referenceId: data.referenceId || "",
    };
  } catch (err) {
    console.error("Demo booking error:", err);
    return {
      error:
        "We're experiencing a connection issue. Please try again or email marketing.gcc@kiccpa.com with your preferred times.",
    };
  }
}
