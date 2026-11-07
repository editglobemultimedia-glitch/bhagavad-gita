"use client";

import { useEffect, useState } from "react";
import { X, Printer, ShieldCheck, FileText, RefreshCw, ExternalLink } from "lucide-react";
import Link from "next/link";
import {
  refundCancellationPolicy,
  termsAndConditions,
  privacyPolicy,
  type PolicyDocument
} from "@/lib/policiesData";

export type PolicyType = "refund" | "terms" | "privacy";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPolicy?: PolicyType;
}

export default function PolicyModal({
  isOpen,
  onClose,
  initialPolicy = "refund",
}: PolicyModalProps) {
  const [activeTab, setActiveTab] = useState<PolicyType>(initialPolicy);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialPolicy);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialPolicy]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPolicy: PolicyDocument =
    activeTab === "refund"
      ? refundCancellationPolicy
      : activeTab === "terms"
      ? termsAndConditions
      : privacyPolicy;

  const handlePrint = () => {
    window.print();
  };

  const getDedicatedUrl = () => {
    if (activeTab === "refund") return "/cancellation-refund-policy";
    if (activeTab === "terms") return "/terms-conditions";
    return "/privacy-policy";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] bg-white rounded-2xl shadow-2xl border border-gold/30 flex flex-col overflow-hidden z-10 animate-scaleUp">
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-gold/60 via-gold to-gold-dark w-full flex-shrink-0" />

        {/* Modal Header */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-gold/15 bg-[#FAF8F3] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-gold-dark font-semibold mb-1">
              <ShieldCheck size={14} className="text-gold" />
              <span>{currentPolicy.organization}</span>
            </div>
            <h2
              id="policy-modal-title"
              className="font-serif text-xl sm:text-2xl font-bold text-ink"
            >
              {currentPolicy.title}
            </h2>
            <p className="text-xs text-ink-muted font-sans mt-0.5">
              Last Updated: {currentPolicy.lastUpdated} • Version: {currentPolicy.version}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={handlePrint}
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold/30 text-xs font-sans text-ink hover:bg-gold/10 transition-colors"
              title="Print document"
            >
              <Printer size={13} className="text-gold" />
              <span>Print</span>
            </button>
            <Link
              href={getDedicatedUrl()}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold/30 text-xs font-sans text-ink hover:bg-gold/10 transition-colors"
              title="Open full page in new tab"
            >
              <ExternalLink size={13} className="text-gold" />
              <span className="hidden sm:inline">Open in Tab</span>
            </Link>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-ink/70 hover:text-ink hover:bg-black/5 transition-colors ml-1"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Policy Tab Switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 px-4 sm:px-8 flex-shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("refund")}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-sans font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "refund"
                ? "border-gold text-gold-dark font-semibold bg-white"
                : "border-transparent text-ink/70 hover:text-ink hover:border-gray-300"
            }`}
          >
            <RefreshCw size={14} className={activeTab === "refund" ? "text-gold" : "text-gray-400"} />
            <span>Refund &amp; Cancellation</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("terms")}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-sans font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "terms"
                ? "border-gold text-gold-dark font-semibold bg-white"
                : "border-transparent text-ink/70 hover:text-ink hover:border-gray-300"
            }`}
          >
            <FileText size={14} className={activeTab === "terms" ? "text-gold" : "text-gray-400"} />
            <span>Terms &amp; Conditions</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("privacy")}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-sans font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === "privacy"
                ? "border-gold text-gold-dark font-semibold bg-white"
                : "border-transparent text-ink/70 hover:text-ink hover:border-gray-300"
            }`}
          >
            <ShieldCheck size={14} className={activeTab === "privacy" ? "text-gold" : "text-gray-400"} />
            <span>Privacy Policy</span>
          </button>
        </div>

        {/* Scrollable Policy Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-6 text-ink-body font-sans text-sm sm:text-base leading-relaxed">
          {/* Intro Paragraphs */}
          <div className="bg-[#FAF8F3] border-l-4 border-gold p-4 sm:p-5 rounded-r-xl space-y-2.5">
            {currentPolicy.intro.map((p, i) => (
              <p key={i} className="text-ink leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Sections List */}
          <div className="space-y-6 pt-2">
            {currentPolicy.sections.map((sec) => (
              <div
                key={sec.id}
                id={sec.id}
                className="pb-5 border-b border-gray-100 last:border-b-0"
              >
                <h3 className="font-serif text-base sm:text-lg font-bold text-ink mb-2.5 flex items-start gap-2">
                  {sec.number && (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold/15 text-gold-dark text-xs font-sans font-bold flex-shrink-0 mt-0.5">
                      {sec.number}
                    </span>
                  )}
                  <span>{sec.title}</span>
                </h3>

                {sec.paragraphs?.map((p, pi) => (
                  <p key={pi} className="text-ink/85 leading-relaxed mb-2.5">
                    {p}
                  </p>
                ))}

                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="space-y-2 my-3 pl-2 sm:pl-4">
                    {sec.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2.5 text-ink/85">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-2" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {sec.subsections?.map((sub, subi) => (
                  <div key={subi} className="mt-3 space-y-2 pl-2 sm:pl-4 border-l-2 border-gold/20">
                    {sub.subtitle && (
                      <h4 className="font-sans font-semibold text-sm text-ink mb-1">
                        {sub.subtitle}
                      </h4>
                    )}
                    {sub.paragraphs?.map((sp, spi) => (
                      <p key={spi} className="text-ink/85 leading-relaxed">
                        {sp}
                      </p>
                    ))}
                    {sub.bullets && sub.bullets.length > 0 && (
                      <ul className="space-y-1.5 my-2 pl-2">
                        {sub.bullets.map((sb, sbi) => (
                          <li key={sbi} className="flex items-start gap-2 text-ink/85">
                            <span className="w-1 h-1 rounded-full bg-gold/70 flex-shrink-0 mt-2" />
                            <span>{sb}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Concluding Banner if present */}
          {currentPolicy.concludingBanner && (
            <div className="bg-[#501214] text-white p-3.5 sm:p-4 rounded-xl border border-gold/40 text-center shadow-sm">
              <p className="font-serif text-xs sm:text-sm italic text-gold-light leading-relaxed">
                &ldquo;{currentPolicy.concludingBanner}&rdquo;
              </p>
            </div>
          )}

          {/* Section 11 / Contact Us Box */}
          <div className="bg-[#FCF9F2] border border-gold/30 rounded-xl p-5 sm:p-6 space-y-3">
            <h4 className="font-serif text-base sm:text-lg font-bold text-ink">
              Official Contact &amp; Support
            </h4>
            <div className="text-xs sm:text-sm text-ink/80 space-y-1 font-sans">
              <p className="font-semibold text-ink">
                {currentPolicy.contactDetails.organization}
              </p>
              {currentPolicy.contactDetails.organizerRole && (
                <p className="text-ink-muted text-xs">
                  {currentPolicy.contactDetails.organizerRole}
                </p>
              )}
              <p className="pt-0.5">
                <strong className="text-ink font-medium">Registered Address: </strong>
                {currentPolicy.contactDetails.address}
              </p>
              <p>
                <strong className="text-ink font-medium">Email: </strong>
                {currentPolicy.contactDetails.emails.map((e, idx) => (
                  <span key={e}>
                    <a href={`mailto:${e}`} className="text-gold-dark hover:underline font-medium">
                      {e}
                    </a>
                    {idx < currentPolicy.contactDetails.emails.length - 1 ? " / " : ""}
                  </span>
                ))}
              </p>
              <p>
                <strong className="text-ink font-medium">Phone: </strong>
                {currentPolicy.contactDetails.phones.join(" / ")}
              </p>
              <p>
                <strong className="text-ink font-medium">Website: </strong>
                <a
                  href={currentPolicy.contactDetails.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-dark hover:underline font-medium"
                >
                  {currentPolicy.contactDetails.website}
                </a>
              </p>
              {activeTab === "privacy" && currentPolicy.contactDetails.grievanceOfficer && (
                <p className="pt-1 text-gold-dark font-medium">
                  <strong>Privacy Contact / Grievance Officer: </strong>
                  {currentPolicy.contactDetails.grievanceOfficer}
                </p>
              )}
              {currentPolicy.contactDetails.note && (
                <p className="text-gold-dark font-medium italic pt-1">
                  ℹ️ {currentPolicy.contactDetails.note}
                </p>
              )}
            </div>
            {currentPolicy.closingStatement && (
              <p className="text-xs sm:text-sm text-ink-muted italic border-t border-gold/20 pt-3">
                {currentPolicy.closingStatement}
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-8 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between flex-shrink-0">
          <p className="text-[11px] sm:text-xs text-ink-muted font-sans">
            Aishwarya Sarvahith Foundation • Official Policy Document
          </p>
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2 rounded-lg bg-gold text-ink font-sans font-semibold text-xs sm:text-sm hover:bg-gold-dark hover:text-white transition-all shadow-sm"
          >
            I Understand &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}

