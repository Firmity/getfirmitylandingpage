import type { Metadata } from "next";
import { ThankYouView } from "@/components/landing/ThankYouView";
import { surveyThankYou } from "@/lib/landing";

export const metadata: Metadata = {
  title: "Survey Requested | Firmity",
  description: "Your free facility survey request is in. Here is what happens next.",
  robots: { index: false, follow: false },
};

export default function SurveyThankYouPage() {
  return <ThankYouView copy={surveyThankYou} />;
}
