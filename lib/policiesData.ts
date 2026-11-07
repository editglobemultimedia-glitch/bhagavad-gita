import { organizationConfig } from "./organizationConfig";

export interface PolicySection {
  id: string;
  number?: number;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: {
    subtitle?: string;
    paragraphs?: string[];
    bullets?: string[];
  }[];
}

export interface PolicyDocument {
  title: string;
  subtitle?: string;
  organization: string;
  effectiveDate?: string;
  lastUpdated: string;
  version: string;
  intro: string[];
  sections: PolicySection[];
  contactDetails: {
    organization: string;
    organizerRole?: string;
    address: string;
    emails: string[];
    phones: string[];
    website: string;
    grievanceOfficer?: string;
    note?: string;
  };
  concludingBanner?: string;
  closingStatement?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. REFUND & CANCELLATION POLICY (11 Sections)
// ─────────────────────────────────────────────────────────────────────────────
export const refundCancellationPolicy: PolicyDocument = {
  title: "Refund & Cancellation Policy",
  subtitle: "Bhagavadgita Vishwa Mahotsav 2027 • Organised by Aishwarya Sarvahith Foundation",
  organization: organizationConfig.organizationName,
  effectiveDate: "5 November 2026",
  lastUpdated: "5 November 2026",
  version: "2026-11-05",
  intro: [
    "Aishwarya Sarvahith Foundation (ASF) is committed to transparency, accountability and the responsible use of funds entrusted to us. Every contribution supports our efforts towards humanitarian welfare, healthcare, education, environmental sustainability, community development and the promotion of ethical values inspired by the Bhagavadgita.",
    "This Refund & Cancellation Policy explains how donations, event registrations, sponsorships and other payments made to ASF through its website or authorized payment channels are handled."
  ],
  sections: [
    {
      id: "charitable-donations",
      number: 1,
      title: "Charitable Donations",
      paragraphs: [
        "Voluntary donations made to ASF are intended to support its charitable objectives and programs. Accordingly, donations are generally non-refundable once received, except in the following circumstances:"
      ],
      bullets: [
        "A duplicate payment has been made.",
        "A payment has been made in error and a refund is approved following verification.",
        "A refund is required under applicable law.",
        "An event-specific contribution is subject to the cancellation provisions outlined in Section 4 below."
      ],
      subsections: [
        {
          paragraphs: [
            "Donors are encouraged to review the purpose of their contribution and verify the payment details before completing a transaction."
          ]
        }
      ]
    },
    {
      id: "event-registration-fees",
      number: 2,
      title: "Event Registration Fees",
      paragraphs: [
        "For events, seminars, conferences, awareness programs, cultural initiatives and other activities organized by ASF:"
      ],
      bullets: [
        "Registration fees, where applicable, will be governed by the terms communicated for the relevant event.",
        "If a participant cancels their registration, the refund eligibility and applicable deadlines will be those stated in the event-specific announcement or registration terms.",
        "If ASF postpones an event, the registration may be transferred to the rescheduled date, subject to the participant’s agreement.",
        "If ASF cancels an event, participants who have paid a registration fee will be offered a refund of the eligible amount or another reasonable option communicated by ASF."
      ],
      subsections: [
        {
          paragraphs: [
            "Where an event is rescheduled, participants will be informed of the revised arrangements as soon as reasonably practicable."
          ]
        }
      ]
    },
    {
      id: "event-postponement-or-cancellation",
      number: 3,
      title: "Event Postponement or Cancellation Due to Unforeseen Circumstances",
      paragraphs: [
        "An event may be postponed, rescheduled or cancelled due to circumstances beyond ASF’s reasonable control, including natural disasters, extreme weather, public safety concerns, government restrictions, venue unavailability, public emergencies or other unforeseen circumstances.",
        "In such cases, ASF will:"
      ],
      bullets: [
        "Communicate the postponement or cancellation through available contact details and official communication channels.",
        "Inform registered participants and relevant contributors of the available options.",
        "Offer eligible participants the option of transferring their registration to a rescheduled event or receiving a refund, as applicable.",
        "Process approved refunds within the stated processing period, subject to verification and payment-service-provider requirements."
      ],
      subsections: [
        {
          paragraphs: [
            "ASF will make reasonable efforts to minimise inconvenience and handle all eligible refund requests fairly and transparently."
          ]
        }
      ]
    },
    {
      id: "earmarked-donations",
      number: 4,
      title: "Donations Specifically Earmarked for an Event That Does Not Take Place",
      paragraphs: [
        "Where a donor has made a contribution specifically and expressly for an identified ASF event, and that event cannot be conducted, ASF will contact the donor, wherever reasonably practicable, to explain the circumstances and discuss the available options.",
        "Depending on the nature of the contribution, applicable legal requirements and the donor’s original terms, the options may include:"
      ],
      bullets: [
        "Redirection: With the donor’s consent, redirecting the unutilised contribution towards another charitable activity consistent with the donor’s stated intention.",
        "Refund: Refunding the eligible unutilised amount where a refund is appropriate and legally permissible.",
        "Alternative arrangement: Agreeing upon another suitable arrangement with the donor."
      ],
      subsections: [
        {
          paragraphs: [
            "Any non-recoverable expenditure or other adjustment will be handled transparently and only in accordance with the applicable terms, the donor’s consent where required, and applicable law. ASF will not treat a voluntary charitable donation as an event registration fee merely because the donor supported an event.",
            "General donations made to support ASF’s wider charitable objectives will ordinarily remain available for those objectives even if a particular programme or event is postponed or cancelled."
          ]
        }
      ]
    },
    {
      id: "sponsorships-contributions",
      number: 5,
      title: "Sponsorships and Institutional Contributions",
      paragraphs: [
        "Sponsorships, corporate contributions, institutional partnerships and contributions involving specific deliverables, recognition or other agreed benefits may be governed by a separate sponsorship agreement or written understanding.",
        "In the event of postponement or cancellation, the terms of that agreement will apply, subject to applicable law. Sponsors are encouraged to obtain written confirmation of the refund, rescheduling and alternative-benefit arrangements before making payment."
      ]
    },
    {
      id: "incorrect-duplicate-transactions",
      number: 6,
      title: "Incorrect, Duplicate or Unauthorized Transactions",
      paragraphs: [
        "If you believe a payment was duplicated, incorrectly processed or made without authorization, please contact ASF promptly with the relevant transaction details.",
        "ASF will review the request and, where appropriate, coordinate with the payment gateway or bank to resolve the issue. Refunds for verified duplicate or erroneous payments will be processed in accordance with the applicable payment terms and legal requirements."
      ]
    },
    {
      id: "how-to-request-refund",
      number: 7,
      title: "How to Request a Refund",
      paragraphs: [
        "To request a refund, please contact ASF using the official contact details published on this website and provide the following information:"
      ],
      bullets: [
        "Full name of the donor or participant",
        "Registered email address and contact number",
        "Date and amount of payment",
        "Transaction ID or payment reference number",
        "Purpose of the payment",
        "Reason for the refund request",
        "Relevant supporting documents, if required"
      ],
      subsections: [
        {
          paragraphs: [
            "Please do not send passwords, PINs, CVVs or other confidential banking credentials.",
            "ASF may request additional information where necessary to verify the transaction and prevent fraudulent refund claims."
          ]
        }
      ]
    },
    {
      id: "processing-time",
      number: 8,
      title: "Refund Processing Time",
      paragraphs: [
        "Once a refund request is approved, ASF will ordinarily initiate the refund within 7–15 working days, unless a different period is communicated for the relevant event or circumstances require additional verification.",
        "The time taken for the refunded amount to appear in the payer’s account may depend on the bank, card issuer, UPI provider or payment gateway. ASF cannot guarantee the exact date on which a third-party payment provider will credit the funds."
      ]
    },
    {
      id: "tax-benefits-80g",
      number: 9,
      title: "Tax Benefits and Donations Under Section 80G",
      paragraphs: [
        "ASF’s registrations and approvals under the applicable provisions of the Income-tax Act, including Sections 12AB and 80G where valid and applicable, are subject to the conditions and validity periods prescribed under law.",
        "An income-tax deduction is not automatically available for every payment made to ASF. Eligibility depends on the nature of the payment, the applicable legal requirements and the validity of the relevant approval. Event registration fees, sponsorship payments and payments made in exchange for benefits should not automatically be treated as eligible charitable donations.",
        "Where applicable, ASF will issue donation acknowledgements and prescribed tax documentation in accordance with the relevant requirements.",
        "If a donation for which tax documentation has been issued is subsequently refunded or reversed, ASF may make the necessary corrections to its records and tax-related reporting, as required by law. Donors should consult their tax adviser regarding the treatment of any deduction previously claimed."
      ]
    },
    {
      id: "policy-amendments",
      number: 10,
      title: "Policy Amendments",
      paragraphs: [
        "ASF reserves the right to update this policy when necessary to reflect changes in its activities, payment procedures or applicable legal requirements. The revised policy will be published on this website with the updated date.",
        "The terms specifically communicated for an event or set out in a written sponsorship agreement will also be considered, subject to applicable law."
      ]
    },
    {
      id: "contact-us",
      number: 11,
      title: "Contact Us",
      paragraphs: [
        "For questions relating to donations, event cancellations, sponsorships or refund requests, please contact:"
      ]
    }
  ],
  contactDetails: {
    organization: organizationConfig.organizationName,
    organizerRole: "Organiser – Bhagavadgita Vishwa Ahvanam & Bhagavadgita Vishwa Mahotsav 2027",
    address: organizationConfig.registeredAddress.full,
    emails: [organizationConfig.officialEmail, organizationConfig.secondaryEmail],
    phones: [organizationConfig.officialPhone, organizationConfig.secondaryPhone],
    website: organizationConfig.websiteUrl,
    note: "Please mention “Refund Request” or “Event Cancellation” in the subject line of your communication."
  },
  closingStatement: "ASF is committed to treating donors, participants and partners with fairness, respect and transparency, while ensuring that charitable funds are used responsibly and in accordance with the Foundation’s objectives and applicable law."
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. TERMS AND CONDITIONS (12 Sections - Exact from Official Document)
// ─────────────────────────────────────────────────────────────────────────────
export const termsAndConditions: PolicyDocument = {
  title: "Terms and Conditions",
  subtitle: "Bhagavadgita Vishwa Mahotsav 2027 • ONE GITA • ONE WORLD • ONE UNIVERSAL MESSAGE",
  organization: organizationConfig.organizationName,
  effectiveDate: "5 November 2026",
  lastUpdated: "5 November 2026",
  version: "2026-11-05",
  intro: [
    `These Terms and Conditions (“Terms”) govern the use of the website, registrations, participation, donations and related services for “Bhagavadgita Vishwa Ahvanam – Curtain Raiser” and “Bhagavadgita Vishwa Mahotsav 2027”, organised by ${organizationConfig.organizationName} (“ASF”, “we”, “our” or “us”).`
  ],
  sections: [
    {
      id: "acceptance-of-terms",
      number: 1,
      title: "Acceptance of Terms",
      bullets: [
        "By accessing our website, registering for the event, participating in programme activities or making a donation, you agree to these Terms and our Privacy Policy.",
        "If you do not agree, please do not use the website or associated services."
      ]
    },
    {
      id: "eligibility-registration",
      number: 2,
      title: "Eligibility & Registration",
      bullets: [
        "The event is open to individuals, institutions and organisations from India and abroad, subject to the organisers’ selection and confirmation.",
        "Provide accurate, complete and up-to-date information while registering. The organisers reserve the right to accept, reject or cancel any registration without assigning a reason."
      ]
    },
    {
      id: "event-participation",
      number: 3,
      title: "Event Participation",
      bullets: [
        "All registered international participants must participate online on 20th Dec 2026 (Vishwa Ahvanam) by reciting six (6) designated shlokas in their mother tongue and in Sanskrit.",
        "The selected participants shall participate in the live stage event on 27th Feb 2027 at Hyderabad, India, reciting at least two (2) shlokas from the given six, in their mother tongue and in Sanskrit.",
        "The organisers will provide shloka selection, training material and guidance for preparation."
      ]
    },
    {
      id: "travel-accommodation-hospitality",
      number: 4,
      title: "Travel, Accommodation & Hospitality",
      bullets: [
        "For selected international participants, the Organising Team will provide accommodation, food and local transportation in Hyderabad, India for four (4) days after the participant’s arrival.",
        "International airfare, visa fees, travel insurance and other personal expenses are the responsibility of the participant, unless specifically agreed in writing by the organisers."
      ]
    },
    {
      id: "donations-payments",
      number: 5,
      title: "Donations & Payments",
      bullets: [
        "Donations made to ASF are voluntary and will be used for the purposes of the event and the Foundation’s charitable objectives.",
        "All payments are processed through authorised and secure payment gateways/bank channels.",
        "Donations are generally non-refundable, except in case of duplicate payments or transactional errors, subject to verification."
      ]
    },
    {
      id: "intellectual-property",
      number: 6,
      title: "Intellectual Property",
      bullets: [
        "All content on the website, including text, images, logos, designs, videos, event materials and documentation, is the property of ASF or its respective owners and is protected by applicable copyright and intellectual property laws.",
        "It may not be copied, reproduced, modified or used for commercial purposes without prior written permission."
      ]
    },
    {
      id: "photography-videography-publicity",
      number: 7,
      title: "Photography, Videography & Publicity",
      bullets: [
        "The event will be photographed, video-recorded and may be livestreamed.",
        "By participating, you grant ASF the right to use your name, image, voice and performance for event promotion, documentation, media coverage and related communications (print, digital and social media), without any monetary claim.",
        "If you have specific restrictions, please inform the organisers in writing in advance."
      ]
    },
    {
      id: "code-of-conduct",
      number: 8,
      title: "Code of Conduct",
      bullets: [
        "All participants are expected to maintain decorum, respect cultural and spiritual sentiments, and follow the instructions of the organising team.",
        "Any conduct that is disruptive, inappropriate or against the spirit of the event may result in cancellation of participation."
      ]
    },
    {
      id: "privacy-data-use",
      number: 9,
      title: "Privacy & Data Use",
      bullets: [
        "Personal information collected during registration or participation will be used only for event coordination, communication and legitimate organisational purposes, in accordance with our Privacy Policy."
      ]
    },
    {
      id: "changes-postponement-cancellation",
      number: 10,
      title: "Changes, Postponement or Cancellation",
      bullets: [
        "The organisers reserve the right to modify the event schedule, format, venue, participation guidelines or other arrangements as necessary.",
        "In case of postponement or cancellation due to unforeseen circumstances (e.g., force majeure, government regulations, natural calamities or public health situations), the organisers will inform all registered participants at the earliest. Further action, including refunds (if applicable), will be communicated as per the event policy."
      ]
    },
    {
      id: "limitation-of-liability",
      number: 11,
      title: "Limitation of Liability",
      bullets: [
        "While every effort will be made to ensure a safe and well-organised event, ASF and its partners shall not be liable for any loss, injury, illness, delay or inconvenience arising during travel, stay or participation, except to the extent required by applicable law."
      ]
    },
    {
      id: "governing-law-jurisdiction",
      number: 12,
      title: "Governing Law & Jurisdiction",
      bullets: [
        "These Terms shall be governed by the laws of India.",
        "Any disputes shall be subject to the exclusive jurisdiction of the courts at Hyderabad, Telangana, India."
      ]
    }
  ],
  concludingBanner: "By using this website or participating in the event, you acknowledge that you have read, understood and agree to these Terms and Conditions.",
  contactDetails: {
    organization: organizationConfig.organizationName,
    organizerRole: "Organiser – Bhagavadgita Vishwa Ahvanam & Bhagavadgita Vishwa Mahotsav 2027",
    address: organizationConfig.registeredAddress.full,
    emails: [organizationConfig.officialEmail, organizationConfig.secondaryEmail],
    phones: [organizationConfig.officialPhone, organizationConfig.secondaryPhone],
    website: organizationConfig.websiteUrl,
    note: "For questions relating to event terms, registrations, partnerships or governance, please reach out to the organizing team."
  },
  closingStatement: "Bhagavadgita Vishwa Mahotsav 2027 • ONE GITA • ONE WORLD • ONE UNIVERSAL MESSAGE • Organised by Aishwarya Sarvahith Foundation"
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. PRIVACY POLICY (15 Sections - Verbatim from Document with Real Contacts)
// ─────────────────────────────────────────────────────────────────────────────
export const privacyPolicy: PolicyDocument = {
  title: "Privacy Policy",
  subtitle: "Bhagavadgita Vishwa Mahotsav 2027 • Organised by Aishwarya Sarvahith Foundation",
  organization: organizationConfig.organizationName,
  effectiveDate: "5 November 2026",
  lastUpdated: "5 November 2026",
  version: "2026-11-05",
  intro: [
    `Aishwarya Sarvahith Foundation (“ASF”, “we”, “our” or “us”), the organising foundation of Bhagavadgita Vishwa Ahvanam – Curtain Raiser and Bhagavadgita Vishwa Mahotsav 2027, respects the privacy of individuals who visit our website, register for our programmes, participate in our events, make donations or communicate with our team.`,
    `This Privacy Policy explains how we collect, use, store, disclose and protect personal information provided through our website and associated event-related activities.`,
    `Our events aim to promote the universal wisdom of the Bhagavadgita, cultural exchange, spiritual learning and global participation. We are committed to handling personal information responsibly and transparently.`,
    `By using our website or voluntarily providing information to us, you acknowledge that you have read this Privacy Policy.`
  ],
  sections: [
    {
      id: "introduction",
      number: 1,
      title: "Introduction",
      paragraphs: [
        "Aishwarya Sarvahith Foundation (“ASF”, “we”, “our” or “us”), the organising foundation of Bhagavadgita Vishwa Ahvanam – Curtain Raiser and Bhagavadgita Vishwa Mahotsav 2027, respects the privacy of individuals who visit our website, register for our programmes, participate in our events, make donations or communicate with our team.",
        "This Privacy Policy explains how we collect, use, store, disclose and protect personal information provided through our website and associated event-related activities.",
        "Our events aim to promote the universal wisdom of the Bhagavadgita, cultural exchange, spiritual learning and global participation. We are committed to handling personal information responsibly and transparently.",
        "By using our website or voluntarily providing information to us, you acknowledge that you have read this Privacy Policy."
      ]
    },
    {
      id: "information-we-collect",
      number: 2,
      title: "Information We Collect",
      paragraphs: [
        "Depending on your interaction with us, we may collect the following information:"
      ],
      subsections: [
        {
          subtitle: "A. Personal and Contact Information",
          bullets: [
            "Full name.",
            "Email address and mobile number.",
            "Country, state and city of residence.",
            "Organisation, institution or country represented, where applicable."
          ]
        },
        {
          subtitle: "B. Event Registration Information",
          bullets: [
            "Registration and participation details.",
            "Language preference and mother tongue.",
            "Information relating to shloka recitation, training and stage participation.",
            "Travel, arrival and accommodation details where required for event coordination.",
            "Emergency contact details, if voluntarily provided and necessary for event arrangements."
          ]
        },
        {
          subtitle: "C. International Delegate Information",
          paragraphs: [
            "For international delegates participating in Bhagavadgita Vishwa Mahotsav 2027, we may request passport or other travel-related information when necessary for coordination, accommodation or other legitimate event requirements.",
            "Such information will be requested only through appropriate channels and handled with reasonable safeguards. Please do not send passport copies or other sensitive documents unless specifically requested through an authorised channel."
          ]
        },
        {
          subtitle: "D. Donation and Payment Information",
          paragraphs: [
            "If you make a donation we may collect information necessary to identify and reconcile the transaction, such as donor name, contact details, amount, date and transaction reference.",
            "Payments may be processed through authorised banks or third-party payment service providers. We do not intend to collect or store complete payment-card credentials, banking passwords, UPI PINs or similar authentication secrets."
          ]
        },
        {
          subtitle: "E. Technical Information",
          paragraphs: [
            "When you visit our website, certain technical information may be collected automatically, including IP address, browser type, device information, pages visited, access times and basic website usage information. Cookies or similar technologies may be used where enabled."
          ]
        }
      ]
    },
    {
      id: "how-we-use-information",
      number: 3,
      title: "How We Use Your Information",
      paragraphs: [
        "We may use your information for the following purposes:"
      ],
      bullets: [
        "Processing event registrations and participation requests.",
        "Communicating event schedules, updates, instructions and announcements.",
        "Coordinating shloka selection, training, rehearsals and performances.",
        "Managing international delegate travel coordination, accommodation, food and local transportation arrangements.",
        "Processing and acknowledging donations and maintaining appropriate financial records.",
        "Responding to enquiries, feedback and requests for assistance.",
        "Maintaining event security and preventing fraudulent or unauthorised activities.",
        "Improving our website, registration process and event administration.",
        "Meeting applicable legal, accounting, regulatory and reporting requirements.",
        "Sending newsletters, future event invitations or promotional communications where permitted and, where required, with your consent."
      ],
      subsections: [
        {
          paragraphs: [
            "We will seek to use personal information only for purposes that are disclosed to you or otherwise permitted by applicable law."
          ]
        }
      ]
    },
    {
      id: "media-coverage",
      number: 4,
      title: "Photographs, Videos and Media Coverage",
      paragraphs: [
        "Bhagavadgita Vishwa Ahvanam and Bhagavadgita Vishwa Mahotsav may involve photography, videography, livestreaming, interviews and media coverage.",
        "Photographs, audio recordings or videos may capture participants, delegates, dignitaries, speakers and audience members. Selected event content may be published through our official website, social media channels, promotional materials, reports, press releases and other event-related communications.",
        "Where appropriate, we will provide event notices and obtain specific consent or other required permissions for identifiable promotional use, particularly where required by law or where the circumstances call for it.",
        "If you have a concern about the use of your image or recording, please contact us using the details provided below. We will review the request and take appropriate action where reasonably possible and legally permissible. Please note that removing material from third-party publications, livestream recordings or content already distributed by independent media may not always be possible."
      ]
    },
    {
      id: "sharing-of-information",
      number: 5,
      title: "Sharing of Information",
      paragraphs: [
        "We do not sell personal information to third parties.",
        "Where necessary for the purposes described in this Policy, we may share relevant information with:"
      ],
      bullets: [
        "Authorised members of the organising committee and event coordination teams.",
        "Venue, accommodation, catering and local transportation providers.",
        "Banks and authorised payment gateway providers.",
        "Website hosting, registration, email, communications and technical service providers.",
        "Event production, photography, videography and media partners, as appropriate.",
        "Government authorities, regulators, law enforcement agencies or other parties where required or permitted by applicable law."
      ],
      subsections: [
        {
          paragraphs: [
            "We aim to share only the information reasonably necessary for the relevant purpose. Third-party service providers may process information under their own privacy policies and contractual arrangements."
          ]
        }
      ]
    },
    {
      id: "international-participation",
      number: 6,
      title: "International Participation and Cross-Border Data",
      paragraphs: [
        "Bhagavadgita Vishwa Mahotsav welcomes participation from individuals and organisations across different countries.",
        "Where international delegates register or participate, their information may be accessed or processed in India and, where necessary, by service providers located in other countries. Any applicable cross-border transfer requirements will be followed.",
        "Participants are encouraged to review this Policy before submitting personal or travel-related information."
      ]
    },
    {
      id: "data-retention-security",
      number: 7,
      title: "Data Storage, Retention and Security",
      paragraphs: [
        "We use reasonable technical, administrative and organisational measures designed to protect personal information against unauthorised access, disclosure, alteration, loss or misuse.",
        "Access to personal information is intended to be limited to authorised persons who need it for event administration, communication, financial management or other legitimate purposes.",
        "We retain information only for as long as reasonably necessary to fulfil the purposes for which it was collected, administer the event, maintain required financial and organisational records, resolve disputes and comply with applicable law.",
        "Information may be retained for a longer period where required by law or necessary to establish, exercise or defend legal claims. When information is no longer required, we will take appropriate steps to delete or anonymise it, subject to applicable retention obligations.",
        "No online platform or method of electronic transmission can be guaranteed to be completely secure."
      ]
    },
    {
      id: "cookies-analytics",
      number: 8,
      title: "Cookies and Website Analytics",
      paragraphs: [
        "Our website may use cookies and similar technologies to support essential website functions, understand visitor activity, improve performance and enhance user experience.",
        "You may be able to manage cookies through your browser settings or through any cookie preference tool provided on our website. Disabling certain cookies may affect the availability or functionality of some website features.",
        "Where required, we will seek consent before using non-essential cookies or similar technologies."
      ]
    },
    {
      id: "privacy-rights",
      number: 9,
      title: "Your Privacy Rights and Choices",
      paragraphs: [
        "Subject to applicable law, you may have the right to:"
      ],
      bullets: [
        "Request information about the personal data we process about you.",
        "Request correction or updating of inaccurate or incomplete information.",
        "Request deletion of personal information where applicable.",
        "Withdraw consent for processing where consent is the basis for such processing.",
        "Opt out of non-essential promotional communications.",
        "Raise a complaint or grievance regarding the handling of your information."
      ],
      subsections: [
        {
          paragraphs: [
            "Withdrawal of consent does not affect processing already carried out lawfully before withdrawal. We may need to retain certain information to meet legal, financial, security or event-administration requirements.",
            "To exercise your rights, please contact us using the contact details listed in this Policy. We may request reasonable information to verify your identity before acting on a request."
          ]
        }
      ]
    },
    {
      id: "children-privacy",
      number: 10,
      title: "Children’s Privacy",
      paragraphs: [
        "Our programmes may be open to participants of different age groups. Where personal information relates to a child, registration and participation should be completed with the involvement and appropriate consent of a parent or lawful guardian, as required by applicable law.",
        "We do not knowingly seek to collect children's personal information beyond what is reasonably necessary for the stated event purposes. Where required, appropriate parental consent and safeguards will be implemented.",
        "Parents or lawful guardians who have questions or concerns about a child's information may contact our team."
      ]
    },
    {
      id: "third-party-links",
      number: 11,
      title: "Third-Party Websites and Services",
      paragraphs: [
        "Our website may contain links to external websites, registration platforms, payment gateways, social media services or other third-party resources.",
        "These external services operate independently and may have their own privacy policies, terms and security practices. Aishwarya Sarvahith Foundation is not responsible for the privacy practices of third-party websites that it does not operate.",
        "We encourage users to review the relevant third-party policies before submitting personal information or completing a transaction."
      ]
    },
    {
      id: "donations-records",
      number: 12,
      title: "Donations and Financial Records",
      paragraphs: [
        "Donations made to support the Foundation or its programmes may be subject to applicable financial, accounting and regulatory requirements.",
        "Information associated with donations may be used to verify transactions, issue acknowledgements or receipts where applicable, maintain accounts, administer donor communications and fulfil reporting obligations.",
        "Donor information will not be published or shared for unrelated promotional purposes without an appropriate lawful basis or consent, where required."
      ]
    },
    {
      id: "policy-changes",
      number: 13,
      title: "Changes to This Privacy Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time to reflect changes in our event activities, website features, service providers or applicable legal requirements.",
        "The revised version will be published on this page with an updated “Last Updated” date. We encourage visitors and participants to review this page periodically."
      ]
    },
    {
      id: "contact-grievance",
      number: 14,
      title: "Contact Us and Grievance Redressal",
      paragraphs: [
        "For privacy-related questions, requests, corrections, withdrawal of consent or complaints, please contact:",
        "We will review privacy-related requests and respond within the time required under applicable law."
      ]
    },
    {
      id: "governing-law",
      number: 15,
      title: "Governing Law",
      paragraphs: [
        "This Privacy Policy is intended to be governed by the laws applicable in India, including applicable data protection and privacy legislation. Any disputes shall be addressed in accordance with applicable law and the jurisdiction of the competent courts."
      ]
    }
  ],
  concludingBanner: "Bhagavadgita Vishwa Mahotsav 2027 • ONE GITA • ONE WORLD • ONE UNIVERSAL MESSAGE",
  contactDetails: {
    organization: organizationConfig.organizationName,
    organizerRole: "Organiser – Bhagavadgita Vishwa Ahvanam & Bhagavadgita Vishwa Mahotsav 2027",
    address: organizationConfig.registeredAddress.full,
    emails: [organizationConfig.officialEmail, organizationConfig.secondaryEmail],
    phones: [organizationConfig.officialPhone, organizationConfig.secondaryPhone],
    website: organizationConfig.websiteUrl,
    grievanceOfficer: organizationConfig.grievanceOfficer.name + " (" + organizationConfig.grievanceOfficer.designation + ")"
  },
  closingStatement: "Bhagavadgita Vishwa Mahotsav 2027 • ONE GITA • ONE WORLD • ONE UNIVERSAL MESSAGE • Organised by Aishwarya Sarvahith Foundation"
};
