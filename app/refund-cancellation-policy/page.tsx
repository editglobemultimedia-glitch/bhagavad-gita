import type { Metadata } from "next";
import PolicyPageView from "@/components/ui/PolicyPageView";
import { refundCancellationPolicy } from "@/lib/policiesData";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy — Bhagavad Gita Vishwa Mahotsav 2027",
  description:
    "Official Refund & Cancellation Policy of Aishwarya Sarvahith Foundation (ASF) for the Bhagavad Gita Vishwa Mahotsav 2027.",
};

export default function RefundCancellationPolicyPage() {
  return (
    <PolicyPageView
      policy={refundCancellationPolicy}
      badge="Refund &amp; Cancellation Policy"
    />
  );
}

