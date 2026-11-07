import type { Metadata } from "next";
import PolicyPageView from "@/components/ui/PolicyPageView";
import { termsAndConditions } from "@/lib/policiesData";

export const metadata: Metadata = {
  title: "Terms and Conditions — Bhagavad Gita Vishwa Mahotsav 2027",
  description:
    "Official Terms and Conditions for participation, event attendance, and use of the digital platforms for the Bhagavad Gita Vishwa Mahotsav 2027.",
};

export default function TermsConditionsPage() {
  return (
    <PolicyPageView
      policy={termsAndConditions}
      badge="Terms &amp; Conditions"
    />
  );
}

