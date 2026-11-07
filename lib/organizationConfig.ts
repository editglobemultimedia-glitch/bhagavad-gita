/**
 * Centralized Organization Contact Configuration
 * Aishwarya Sarvahith Foundation (ASF) & Bhagavadgita Vishwa Mahotsav 2027
 * All pages and legal documents import contact details from here.
 */

export interface RegisteredAddress {
  line1: string;
  line2: string;
  landmark: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  full: string;
  short: string;
}

export interface GrievanceOfficer {
  name: string;
  designation: string;
  organization: string;
  email: string;
  secondaryEmail?: string;
  phone: string;
  postalAddress: string;
}

export interface OrganizationConfig {
  organizationName: string;
  shortName: string;
  eventTitle: string;
  curtainRaiserTitle: string;
  tagline: string;
  officialEmail: string;
  secondaryEmail: string;
  officialPhone: string;
  secondaryPhone: string;
  websiteUrl: string;
  websiteDisplay: string;
  registeredAddress: RegisteredAddress;
  grievanceOfficer: GrievanceOfficer;
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
  };
}

export const organizationConfig: OrganizationConfig = {
  organizationName: "Aishwarya Sarvahith Foundation (ASF)",
  shortName: "ASF",
  eventTitle: "Bhagavadgita Vishwa Mahotsav 2027",
  curtainRaiserTitle: "Bhagavadgita Vishwa Ahvanam – Curtain Raiser",
  tagline: "ONE GITA • ONE WORLD • ONE UNIVERSAL MESSAGE",
  officialEmail: "Sasi8372@gmail.com",
  secondaryEmail: "divineauraworld9@gmail.com",
  officialPhone: "+91 73967 56590",
  secondaryPhone: "+91 7331176156",
  websiteUrl: "https://www.bhagavadgitavishwamahotsav.com",
  websiteDisplay: "www.bhagavadgitavishwamahotsav.com",
  registeredAddress: {
    line1: "P. No. 3, 4, 5, 6, Sy. No. 14, Eureka Court, Y R Guda",
    line2: "Srinagar Colony, Khairatabad",
    landmark: "Eureka Court",
    city: "Hyderabad",
    pincode: "500073",
    state: "Telangana",
    country: "India",
    full: "P. No. 3, 4, 5, 6, Sy. No. 14, Eureka Court, Y R Guda, Srinagar Colony, Khairatabad, Hyderabad – 500073, Telangana, India",
    short: "Eureka Court, Srinagar Colony, Khairatabad, Hyderabad – 500073, Telangana, India",
  },
  grievanceOfficer: {
    name: "Grievance Officer / Secretarial Desk",
    designation: "Legal & Grievance Redressal Desk",
    organization: "Aishwarya Sarvahith Foundation (ASF)",
    email: "Sasi8372@gmail.com",
    secondaryEmail: "divineauraworld9@gmail.com",
    phone: "+91 73967 56590",
    postalAddress: "P. No. 3, 4, 5, 6, Sy. No. 14, Eureka Court, Y R Guda, Srinagar Colony, Khairatabad, Hyderabad – 500073, Telangana, India",
  },
  socials: {
    instagram: "https://instagram.com/bhagavad_gita_vishwa_mahotsav",
    facebook: "https://facebook.com/BhagavadGitaVishwaMahotsav",
    twitter: "https://x.com/gita_event",
    youtube: "https://youtube.com/@bhagavadgitavishwamahotsav",
  },
};

export default organizationConfig;

