import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Organising Body | Aishwarya Sarvahith Foundation",
  description:
    "The Aishwarya Sarvahith Foundation — the institutional foundation of the Bhagavad Gita Vishwa Mahotsav 2027.",
};

export default function OrganisingBodyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Hero */}
      <PageHero
        badge="Organising Body"
        title="About the Organising Body"
        subtitle="The Aishwarya Sarvahith Foundation — the institutional foundation of the world's largest Gita celebration."
      />

      {/* Official Foundation Banner */}
      <section className="w-full bg-[#FAF8F2] border-b border-gold/20">
        <div className="container-main max-w-5xl py-6 md:py-10">
          <div className="overflow-hidden rounded-2xl shadow-md border border-gold/30">
            <img
              src="/bh7.png"
              alt="Aishwarya Sarvahith Foundation - Organizing Bhagavadgita Vishwa Mahotsav 2027"
              className="w-full h-auto block object-cover"
            />
          </div>
        </div>
      </section>

      {/* Institutional Overview */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-main max-w-4xl">
          <div className="space-y-5 text-ink-body font-sans text-base sm:text-lg leading-relaxed">
            <p>
              The Bhagavad Gita Vishwa Mahotsav 2027 is organised by the{" "}
              <strong className="font-semibold text-ink">
                Aishwarya Sarvahith Foundation
              </strong>{" "}
              — a not-for-profit organisation established specifically for the
              purpose of planning, executing, and sustaining the Mahotsav and its
              legacy initiatives.
            </p>
            <p>
              The Foundation is governed by a Board of Trustees drawn from
              spiritual, academic, cultural, and civic life — bringing together
              the diverse expertise required to execute an event of this scale
              and complexity.
            </p>
            <p>
              The Foundation works in close collaboration with the Spiritual
              Advisory Council, the Global Organising Committee, and a network of
              institutional partners across all 18 host countries.
            </p>
            <p>
              All financial accounts of the Foundation are independently audited
              and publicly available. The Foundation is committed to the highest
              standards of transparency, accountability, and ethical governance.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* OUR VISION SECTION                                       */}
      {/* ======================================================== */}
      <section className="bg-[#FAF8F3] py-16 md:py-20 border-t border-b border-gold/20">
        <div className="container-main max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold/50" />
            <span className="text-xs sm:text-sm font-sans uppercase tracking-[0.25em] text-gold-dark font-semibold">
              Our Vision
            </span>
            <span className="h-px w-8 bg-gold/50" />
          </div>

          {/* Vision Quote Card */}
          <div className="bg-[#FCF9F2] border border-gold/30 rounded-2xl p-8 sm:p-12 shadow-sm my-6">
            <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#5B1315] leading-relaxed">
              &ldquo;To inspire a world where timeless wisdom guides responsible
              living, compassionate Seva and respect for all creation — nurturing
              individuals, communities and a sustainable future.&rdquo;
            </p>
          </div>

          {/* Supporting Narrative */}
          <div className="space-y-4 max-w-3xl mx-auto pt-4 text-ink-body font-sans text-base sm:text-lg leading-relaxed text-center">
            <p>
              This vision is not merely an aspiration. It is a call to action —
              for scholars, educators, volunteers, communities, and individuals
              who believe that wisdom and service can shape a better world.
            </p>
            <p className="text-ink-muted">
              ASF seeks to be a bridge — between ancient wisdom and modern life,
              between philosophical knowledge and practical service, between
              individual well-being and collective flourishing.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* OUR MISSION STATEMENT SECTION                            */}
      {/* ======================================================== */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-main max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-gold/50" />
            <span className="text-xs sm:text-sm font-sans uppercase tracking-[0.25em] text-gold-dark font-semibold">
              Our Mission Statement
            </span>
            <span className="h-px w-8 bg-gold/50" />
          </div>

          {/* Maroon Mission Statement Box */}
          <div className="bg-[#651919] text-white rounded-2xl p-8 sm:p-12 shadow-lg mb-8 text-center">
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-white/95 leading-relaxed font-normal">
              To promote the knowledge of Sanatana Dharma and the Bhagavadgita
              through research, education, cultural dialogue and meaningful Seva,
              while nurturing youth, supporting communities, respecting nature
              and working towards the welfare of all.
            </p>
          </div>

          {/* Bottom Quote Card */}
          <div className="bg-[#FAF6EE] border-l-4 border-gold border-t border-r border-b border-gold/25 rounded-r-xl p-6 sm:p-8 shadow-sm max-w-3xl mx-auto">
            <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#5B1315] leading-relaxed">
              &ldquo;When wisdom becomes understanding, understanding becomes
              responsibility, and responsibility becomes Seva — we move closer
              to Sarvahith.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Pancha Mahabhuta Image Section */}
      <section className="w-full bg-[#FAF8F3] py-12 md:py-16 border-t border-gold/15">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="relative mx-auto w-full overflow-hidden rounded-xl shadow-sm">
            <Image
              src="/bh9.png"
              alt="The Pancha Mahabhuta - Akasha, Vayu, Agni, Apah and Prithvi"
              width={1672}
              height={941}
              priority
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
