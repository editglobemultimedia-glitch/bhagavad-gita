import type { Metadata } from "next";
import PolicyPageView from "@/components/ui/PolicyPageView";
import { refundCancellationPolicy } from "@/lib/policiesData";

export const metadata: Metadata = {
  title: "Cancellation and Refund Policy — Bhagavad Gita Vishwa Mahotsav 2027",
  description:
    "Official Cancellation and Refund Policy of Aishwarya Sarvahith Foundation (ASF) for the Bhagavad Gita Vishwa Mahotsav 2027 — covers donations, registrations, and timelines.",
};

export default function CancellationRefundPolicyPage() {
  return (
    <PolicyPageView
      policy={refundCancellationPolicy}
      badge="Cancellation &amp; Refund Policy"
    />
  );
}

