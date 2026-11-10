"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, FileText, ArrowRight } from "lucide-react";
import ReceiptTicket from "@/components/ui/ReceiptTicket";
import PolicyModal, { type PolicyType } from "@/components/modals/PolicyModal";

// ── Schemas ────────────────────────────────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required").optional().or(z.literal('')),
  phone: z.string().min(7, "Phone number required"),
  country: z.string().min(1, "Country required"),
  city: z.string().min(1, "City required"),
  registrationType: z.enum(["Single", "Group", "Institute", "Foreigner"], {
    message: "Please select a registration type"
  }),
  noOfPersons: z.coerce.number().optional(),
  donationAmount: z
    .union([z.string(), z.number()])
    .transform((val) => String(val).trim())
    .refine((val) => val.length > 0, "Donation amount is required")
    .refine((val) => !isNaN(Number(val)), "Please enter a valid numerical amount")
    .refine((val) => Number(val) > 0, "Donation amount must be greater than zero")
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val),
      "Donation amount can have up to 2 decimal places only"
    ),
  assistance: z.array(z.string()).optional(),
  registerForEvent: z.array(z.string()).min(1, "Select at least one event"),
  consentAccepted: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms & Conditions, Privacy Policy, and Refund & Cancellation Policy to proceed."
  }),
});

type FormData = z.infer<typeof formSchema>;

const countries = [
  "India", "United Kingdom", "United States", "Australia", "Canada", "Germany",
  "Japan", "Brazil", "South Africa", "France", "Russia", "Singapore", "Israel",
  "New Zealand", "UAE", "Kenya", "Argentina", "Other",
];

export default function RegistrationForm({ isDonorFlow = false }: { isDonorFlow?: boolean }) {
  const router = useRouter();
  const [submittedData, setSubmittedData] = useState<(FormData & { id: string }) | null>(null);
  const [loading, setLoading] = useState(false);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType>("refund");

  const openPolicy = (type: PolicyType) => {
    setSelectedPolicy(type);
    setPolicyModalOpen(true);
  };

  const form = useForm<FormData>({ 
    resolver: zodResolver(formSchema) as any,
    mode: "onSubmit",
    defaultValues: {
      donationAmount: "",
      assistance: [],
      registerForEvent: [],
      consentAccepted: false,
    }
  });
  
  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        donationAmount: Number(data.donationAmount),
        refund_policy_accepted: true,
        refund_policy_accepted_at: new Date().toISOString(),
        refund_policy_version: "2026-11-05",
        terms_accepted: true,
        privacy_policy_accepted: true,
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        // Preserve registration details in sessionStorage so data is retained for future gateway
        try {
          if (typeof window !== "undefined") {
            sessionStorage.setItem(
              "bgvm_pending_registration",
              JSON.stringify({
                id: json.id,
                donationAmount: json.donationAmount ?? Number(data.donationAmount),
                currency: json.currency || "INR",
                name: data.name,
                email: data.email,
                phone: data.phone,
                country: data.country,
                city: data.city,
                registrationType: data.registrationType,
                noOfPersons: data.noOfPersons,
                assistance: data.assistance,
                registerForEvent: data.registerForEvent,
                paymentStatus: "PENDING",
                registrationDate: new Date().toISOString(),
              })
            );
          }
        } catch {
          // ignore storage quota errors
        }
        // Redirect to dedicated payment route
        router.push(`/payment?ref=${encodeURIComponent(json.id)}`);
      } else {
        const err = await res.json();
        toast.error(err.message || "Registration failed. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submittedData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl mx-auto py-8 px-4"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-gold" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-ink mb-2">Registration Complete!</h2>
          <p className="text-ink-muted font-sans text-sm max-w-md mx-auto">
            A confirmation email has been sent to your inbox. Please keep your receipt safe.
          </p>
        </div>

        <ReceiptTicket
          registrationId={submittedData.id}
          name={submittedData.name}
          email={submittedData.email || ""}
          type={submittedData.registrationType}
          country={submittedData.country}
        />
        
        <div className="text-center mt-12">
          <p className="text-gold font-sans text-sm font-semibold tracking-wider uppercase">
            🔱 Hare Krishna • Welcome to the Movement
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-semibold text-ink mb-2">
          {isDonorFlow ? "Donor Registration & Contribution" : "Registration Details"}
        </h2>
        <p className="text-ink-muted text-sm font-sans">
          {isDonorFlow
            ? "Complete your donor registration and pledge your contribution to the Mahotsav."
            : "Please fill out the form below to register for the Mahotsav."}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Full Name *
              </label>
              <input
                {...register("name")}
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                placeholder="Your full name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Phone Number *
              </label>
              <input
                {...register("phone")}
                type="tel"
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                placeholder="+91 00000 00000"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                No of Persons
              </label>
              <input
                {...register("noOfPersons")}
                type="number"
                min="1"
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                placeholder="1"
              />
              {errors.noOfPersons && <p className="text-red-500 text-xs mt-1">{errors.noOfPersons?.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
              DONATION AMOUNT (₹) *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-ink-muted text-sm font-semibold pointer-events-none select-none">
                ₹
              </span>
              <input
                {...register("donationAmount")}
                type="number"
                step="0.01"
                min="0.01"
                className="w-full border border-gray-200 rounded-sm pl-8 pr-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                placeholder="Enter donation amount"
              />
            </div>
            {errors.donationAmount && (
              <p className="text-red-500 text-xs mt-1">{errors.donationAmount?.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Registration Type *
              </label>
              <select
                {...register("registrationType")}
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors bg-white"
              >
                <option value="">Select type</option>
                <option value="Single">Single</option>
                <option value="Group">Group</option>
                <option value="Institute">Institute</option>
                <option value="Foreigner">Foreigner</option>
              </select>
              {errors.registrationType && <p className="text-red-500 text-xs mt-1">{errors.registrationType?.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Country *
              </label>
              <select
                {...register("country")}
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors bg-white"
              >
                <option value="">Select country</option>
                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country?.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
              City *
            </label>
            <input
              {...register("city")}
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
              placeholder="Your city"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city?.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Assistance Required
              </label>
              <div className="space-y-2 mt-2">
                {["Visa", "Accommodation", "Local Transport"].map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={item}
                      {...register("assistance")}
                      className="w-4 h-4 text-gold focus:ring-gold border-gray-300 rounded"
                    />
                    <span className="text-sm font-sans text-ink-body">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Register For Event *
              </label>
              <div className="space-y-2 mt-2">
                {["Curtain Raiser", "Mahotsav"].map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={item}
                      {...register("registerForEvent")}
                      className="w-4 h-4 text-gold focus:ring-gold border-gray-300 rounded"
                    />
                    <span className="text-sm font-sans text-ink-body">{item}</span>
                  </label>
                ))}
              </div>
              {errors.registerForEvent && <p className="text-red-500 text-xs mt-1">{errors.registerForEvent?.message}</p>}
            </div>
          </div>

          {/* Refund & Cancellation Policy Notice & Mandatory Consent */}
          <div className="pt-2">
            <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F3] border border-gold/30 space-y-3.5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gold/15 pb-2.5">
                <span className="text-xs font-sans font-semibold text-gold-dark uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-gold" />
                  Transparency &amp; Governance
                </span>
                <button
                  type="button"
                  onClick={() => openPolicy("refund")}
                  className="text-xs text-gold-dark hover:text-ink font-semibold underline text-left sm:text-right"
                >
                  Read Refund &amp; Cancellation Policy ↗
                </button>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="consentCheckbox"
                  type="checkbox"
                  {...register("consentAccepted")}
                  className="w-4 h-4 mt-1 text-gold focus:ring-gold border-gray-300 rounded cursor-pointer flex-shrink-0"
                />
                <label
                  htmlFor="consentCheckbox"
                  className="text-xs sm:text-sm font-sans text-ink leading-relaxed cursor-pointer select-none"
                >
                  I have read and agree to the{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openPolicy("terms");
                    }}
                    className="text-gold-dark font-semibold underline hover:text-ink transition-colors inline"
                  >
                    Terms &amp; Conditions
                  </button>
                  ,{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openPolicy("privacy");
                    }}
                    className="text-gold-dark font-semibold underline hover:text-ink transition-colors inline"
                  >
                    Privacy Policy
                  </button>
                  , and{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openPolicy("refund");
                    }}
                    className="text-gold-dark font-semibold underline hover:text-ink transition-colors inline"
                  >
                    Refund &amp; Cancellation Policy
                  </button>
                  .
                </label>
              </div>

              {errors.consentAccepted && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-sans rounded-md px-3 py-2">
                  ⚠️ {errors.consentAccepted.message}
                </div>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "MAKE PAYMENT →"}
            </button>
          </div>

          <p className="text-center text-xs text-ink-muted font-sans pt-2">
            A confirmation receipt will be sent immediately after successful payment.
          </p>
        </form>
      </motion.div>

      {/* Interactive Policy Modal */}
      <PolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        initialPolicy={selectedPolicy}
      />
    </div>
  );
}
