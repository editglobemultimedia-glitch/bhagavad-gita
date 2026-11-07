import type { Metadata } from "next";
import PolicyPageView from "@/components/ui/PolicyPageView";
import { privacyPolicy } from "@/lib/policiesData";

export const metadata: Metadata = {
  title: "Privacy Policy — Bhagavad Gita Vishwa Mahotsav 2027",
  description:
    "Official Privacy Policy of Aishwarya Sarvahith Foundation (ASF) — how we collect, protect, and respect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageView
      policy={privacyPolicy}
      badge="Privacy Policy"
    />
  );
}

