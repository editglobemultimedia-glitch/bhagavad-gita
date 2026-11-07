import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import {
  ShieldCheck,
  Calendar,
  ArrowLeft,
  Printer,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Globe,
  UserCheck,
  FileText,
  CheckCircle2,
} from "lucide-react";
import type { PolicyDocument } from "@/lib/policiesData";
import { organizationConfig } from "@/lib/organizationConfig";

interface PolicyPageViewProps {
  policy: PolicyDocument;
  badge?: string;
}

export default function PolicyPageView({
  policy,
  badge = "Legal & Governance",
}: PolicyPageViewProps) {
  const isTerms = policy.title.toLowerCase().includes("terms");
  const isPrivacy = policy.title.toLowerCase().includes("privacy");

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      {/* Top Page Hero */}
      <PageHero
        badge={badge}
        title={policy.title}
        subtitle={`${policy.organization} • Dedicated to truth, dharma, and ethical stewardship.`}
      />

      {/* Meta Bar */}
      <div className="bg-[#FAF6EE] border-b border-gold/20 py-3.5 px-4 sm:px-8">
        <div className="container-main max-w-5xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-sans text-ink-muted">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 text-gold-dark font-semibold">
              <Calendar size={14} className="text-gold" />
              Effective Date: {policy.effectiveDate || policy.lastUpdated}
            </span>
            <span className="hidden sm:inline text-gold/40">•</span>
            <span>
              Last Updated: <strong className="text-ink">{policy.lastUpdated}</strong>
            </span>
            <span className="hidden sm:inline text-gold/40">•</span>
            <span>
              Version: <strong className="text-ink">{policy.version}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/participate/register"
              className="inline-flex items-center gap-1.5 text-gold-dark hover:text-ink font-semibold transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Registration</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Document Body Container */}
      <section className="section-pad bg-transparent">
        <div className="container-main max-w-5xl space-y-10">
          {/* Official Document Framed Container (Design echoing the gold filigree border of reference) */}
          <div className="bg-white rounded-2xl border-2 border-gold/30 shadow-md p-6 sm:p-10 md:p-12 relative overflow-hidden">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gold pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-gold pointer-events-none" />

            {/* Document Header Plaque */}
            <div className="text-center pb-8 border-b border-gold/20 mb-8 space-y-2">
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] font-sans font-bold text-gold-dark">
                {organizationConfig.tagline}
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#7D1D1D] tracking-wide uppercase">
                {organizationConfig.eventTitle}
              </h1>

              {/* Dark Blue Ribbon Header for Document Title */}
              <div className="inline-block my-3">
                <div className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-[#0B1E40] via-[#143264] to-[#0B1E40] text-gold font-serif text-lg sm:text-2xl font-bold tracking-wider uppercase border border-gold/50 shadow-md">
                  {policy.title}
                </div>
              </div>

              <p className="text-xs sm:text-sm font-sans text-ink-muted">
                Organised by <strong className="text-ink">{policy.organization}</strong>
              </p>
            </div>

            {/* Introductory Statement */}
            <div className="bg-[#FCF9F2] border-l-4 border-gold p-5 sm:p-6 rounded-r-xl space-y-2 mb-10 shadow-sm">
              {policy.intro.map((p, i) => (
                <p
                  key={i}
                  className="text-ink-body font-sans text-sm sm:text-base leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Terms and Conditions 2-Column Poster Grid */}
            {isTerms ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-10">
                {policy.sections.map((sec) => (
                  <div
                    key={sec.id}
                    id={sec.id}
                    className="p-5 sm:p-6 rounded-xl bg-[#FCFAF5] border border-gold/30 flex flex-col justify-between shadow-xs hover:border-gold transition-colors"
                  >
                    <div>
                      {/* Section Title Pill */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gold/20 to-gold/5 border border-gold/40 text-gold-dark font-sans text-xs sm:text-sm font-bold uppercase tracking-wider mb-3.5">
                        <span className="w-5 h-5 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {sec.number}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </div>

                      {sec.paragraphs?.map((p, pi) => (
                        <p
                          key={pi}
                          className="text-ink/85 font-sans text-xs sm:text-sm leading-relaxed mb-2"
                        >
                          {p}
                        </p>
                      ))}

                      {sec.bullets && sec.bullets.length > 0 && (
                        <ul className="space-y-2 my-2 pl-2">
                          {sec.bullets.map((b, bi) => (
                            <li
                              key={bi}
                              className="flex items-start gap-2 text-ink/85 font-sans text-xs sm:text-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-1.5" />
                              <span className="leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Standard Longitudinal Sections (Privacy Policy & Refund Policy) */
              <div className="space-y-8 mb-10">
                {policy.sections.map((sec) => (
                  <article
                    key={sec.id}
                    id={sec.id}
                    className="scroll-mt-24 pb-6 border-b border-gray-100 last:border-b-0 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      {sec.number && (
                        <span className="w-7 h-7 rounded-full bg-gold/20 text-gold-dark text-xs sm:text-sm font-sans font-bold flex items-center justify-center flex-shrink-0">
                          {sec.number}
                        </span>
                      )}
                      <h2 className="font-serif text-lg sm:text-xl font-bold text-ink">
                        {sec.title}
                      </h2>
                    </div>

                    {sec.paragraphs?.map((p, pi) => (
                      <p
                        key={pi}
                        className="text-ink-body font-sans text-sm sm:text-base leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}

                    {sec.bullets && sec.bullets.length > 0 && (
                      <ul className="space-y-2 my-3 pl-4 sm:pl-6">
                        {sec.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            className="flex items-start gap-2.5 text-ink-body font-sans text-sm sm:text-base"
                          >
                            <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-2" />
                            <span className="leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {sec.subsections?.map((sub, subi) => (
                      <div
                        key={subi}
                        className="mt-4 space-y-2.5 pl-4 sm:pl-6 border-l-2 border-gold/30"
                      >
                        {sub.subtitle && (
                          <h3 className="font-sans font-bold text-sm sm:text-base text-gold-dark">
                            {sub.subtitle}
                          </h3>
                        )}
                        {sub.paragraphs?.map((sp, spi) => (
                          <p
                            key={spi}
                            className="text-ink-body font-sans text-sm sm:text-base leading-relaxed"
                          >
                            {sp}
                          </p>
                        ))}
                        {sub.bullets && sub.bullets.length > 0 && (
                          <ul className="space-y-1.5 my-2 pl-2">
                            {sub.bullets.map((sb, sbi) => (
                              <li
                                key={sbi}
                                className="flex items-start gap-2 text-ink-body font-sans text-sm sm:text-base"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-gold/70 flex-shrink-0 mt-2" />
                                <span>{sb}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </article>
                ))}
              </div>
            )}

            {/* Concluding Maroon/Gold Ribbon (From Poster) */}
            {policy.concludingBanner && (
              <div className="my-8">
                <div className="bg-gradient-to-r from-[#501214] via-[#751A1E] to-[#501214] text-white p-4 sm:p-5 rounded-xl border border-gold/40 shadow-md text-center">
                  <p className="font-serif text-sm sm:text-base md:text-lg italic text-gold-light leading-relaxed">
                    &ldquo;{policy.concludingBanner}&rdquo;
                  </p>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* DEDICATED CONTACT DETAILS SECTION AT BOTTOM OF DOCUMENT */}
            {/* ======================================================== */}
            <div className="mt-10 pt-8 border-t-2 border-gold/30 bg-[#FAF7F0] -mx-6 sm:-mx-10 md:-mx-12 -mb-6 sm:-mb-10 md:-mb-12 p-6 sm:p-10 md:p-12">
              <div className="text-center max-w-2xl mx-auto mb-6">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-gold-dark">
                  Institutional Contact Information
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mt-1">
                  {policy.contactDetails.organization}
                </h3>
                {policy.contactDetails.organizerRole && (
                  <p className="text-xs sm:text-sm font-sans text-ink-muted mt-0.5">
                    {policy.contactDetails.organizerRole}
                  </p>
                )}
                {isPrivacy && policy.contactDetails.grievanceOfficer && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-sans font-semibold">
                    <UserCheck size={13} className="text-gold" />
                    <span>Privacy Contact / Grievance Officer: {policy.contactDetails.grievanceOfficer}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm font-sans">
                {/* Organization & Address */}
                <div className="p-4 bg-white rounded-xl border border-gold/25 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-gold-dark font-semibold text-xs uppercase tracking-wider mb-2">
                      <MapPin size={16} className="text-gold flex-shrink-0" />
                      <span>Registered Office</span>
                    </div>
                    <address className="not-italic text-ink/80 leading-relaxed text-xs">
                      {policy.contactDetails.address}
                    </address>
                  </div>
                </div>

                {/* Email Address */}
                <div className="p-4 bg-white rounded-xl border border-gold/25 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-gold-dark font-semibold text-xs uppercase tracking-wider mb-2">
                      <Mail size={16} className="text-gold flex-shrink-0" />
                      <span>Official Email</span>
                    </div>
                    <div className="space-y-1">
                      {policy.contactDetails.emails.map((email, idx) => (
                        <div key={email}>
                          <a
                            href={`mailto:${email}`}
                            className="text-gold-dark hover:text-ink font-medium underline text-xs sm:text-sm break-all"
                          >
                            {email}
                          </a>
                          {idx === 0 && (
                            <span className="text-[10px] text-ink-muted ml-1 font-sans">
                              (Primary)
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Phone / Mobile */}
                <div className="p-4 bg-white rounded-xl border border-gold/25 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-gold-dark font-semibold text-xs uppercase tracking-wider mb-2">
                      <Phone size={16} className="text-gold flex-shrink-0" />
                      <span>Telephone</span>
                    </div>
                    <div className="space-y-1">
                      {policy.contactDetails.phones.map((phone, idx) => (
                        <div key={phone}>
                          <a
                            href={`tel:${phone.replace(/\s+/g, "")}`}
                            className="text-ink/80 hover:text-gold font-medium text-xs sm:text-sm"
                          >
                            {phone}
                          </a>
                          {idx === 0 && (
                            <span className="text-[10px] text-ink-muted ml-1 font-sans">
                              (Primary)
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Website */}
                <div className="p-4 bg-white rounded-xl border border-gold/25 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-gold-dark font-semibold text-xs uppercase tracking-wider mb-2">
                      <Globe size={16} className="text-gold flex-shrink-0" />
                      <span>Official Website</span>
                    </div>
                    <div>
                      <a
                        href={policy.contactDetails.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-dark hover:text-ink font-semibold underline text-xs sm:text-sm break-all"
                      >
                        {policy.contactDetails.website.replace("https://", "")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {policy.contactDetails.note && (
                <p className="text-center text-xs text-gold-dark font-sans font-medium italic mt-5">
                  ℹ️ {policy.contactDetails.note}
                </p>
              )}

              {policy.closingStatement && (
                <div className="text-center text-[11px] sm:text-xs text-ink/60 font-sans tracking-wide uppercase mt-6 pt-4 border-t border-gold/15">
                  {policy.closingStatement}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
