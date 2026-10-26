import type { Metadata } from "next";
import { ThankYouView } from "@/components/landing/ThankYouView";
import { thankYou } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request Received | Firmity",
  description: "Your Firmity request is in. Here is what happens next.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouView copy={thankYou} />;
}
