import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import LiveVisitorCount from "@/components/ui/LiveVisitorCount";
import { Mail, Phone, MapPin, Users, MessageCircle, Camera, PlayCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Bhagavad Gita Vishwa Mahotsav 2027 team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact"
        title="Get in Touch"
        subtitle="We welcome your enquiries, suggestions, and expressions of interest. The Mahotsav team will respond within 2 working days."
      />

      <section className="bg-white section-pad">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-10">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-ink mb-6">Office Address &amp; Contact</h2>
                <div className="gold-rule-left mb-8" />
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-ink text-sm mb-1">Registered Office</p>
                      <address className="not-italic text-sm font-sans text-ink-muted leading-relaxed">
                        P. No. 3, 4, 5, 6, Sy. No. 14,<br />
                        Eureka Court, Y R Guda,<br />
                        Srinagar Colony, Khairatabad,<br />
                        Hyderabad – 500073, Telangana
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-ink text-sm mb-1">Mobile / Phone</p>
                      <div className="space-y-1">
                        <div>
                          <span className="text-xs text-ink-muted mr-2">Primary:</span>
                          <a href="tel:+917396756590" className="text-gold hover:underline text-sm font-sans font-medium">
                            +91 73967 56590
                          </a>
                        </div>
                        <div>
                          <span className="text-xs text-ink-muted mr-2">Secondary:</span>
                          <a href="tel:+917331176156" className="text-gold hover:underline text-sm font-sans font-medium">
                            +91 7331176156
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-ink text-sm mb-1">Email</p>
                      <div className="space-y-1">
                        <div>
                          <span className="text-xs text-ink-muted mr-2">Primary:</span>
                          <a href="mailto:Sasi8372@gmail.com" className="text-gold hover:underline text-sm font-sans">
                            Sasi8372@gmail.com
                          </a>
                        </div>
                        <div>
                          <span className="text-xs text-ink-muted mr-2">Secondary:</span>
                          <a href="mailto:Divineauraworld9@gmail.com" className="text-gold hover:underline text-sm font-sans">
                            Divineauraworld9@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-semibold text-ink mb-6">Social Media Accounts</h2>
                <div className="gold-rule-left mb-8" />
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-ink text-sm mb-1">Facebook</p>
                      <a href="https://facebook.com/BhagavadGitaVishwaMahotsav" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline text-sm font-sans">
                        @BhagavadGitaVishwaMahotsav
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-ink text-sm mb-1">X (Twitter)</p>
                      <a href="https://x.com/gita_event" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline text-sm font-sans">
                        @gita_event
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Camera size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-ink text-sm mb-1">Instagram</p>
                      <a href="https://instagram.com/bhagavad_gita_vishwa_mahotsav" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline text-sm font-sans">
                        @bhagavad_gita_vishwa_mahotsav
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <PlayCircle size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-ink text-sm mb-1">YouTube</p>
                      <a href="https://youtube.com/@bhagavadgitavishwamahotsav" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline text-sm font-sans">
                        @bhagavadgitavishwamahotsav
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <LiveVisitorCount />
            </div>

            {/* Contact form */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink mb-6">Send a Message</h2>
              <div className="gold-rule-left mb-8" />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
