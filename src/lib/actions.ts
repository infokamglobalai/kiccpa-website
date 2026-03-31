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
    return { error: "We're experiencing a connection issue. Please try again or contact us directly at info@kiccpa.com." };
  }
}
