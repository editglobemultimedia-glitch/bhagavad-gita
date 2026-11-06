export type NavItem = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    // Mahotsav pages are grouped under Home.
    label: "Home",
    href: "/",
    children: [
      { label: "Overview", href: "/mahotsav" },
      { label: "Vision & Mission", href: "/mahotsav/vision" },
      { label: "Event Philosophy", href: "/mahotsav/philosophy" },
      { label: "Why Bhagavad Gita?", href: "/mahotsav/why-gita" },
      { label: "Significance of 18", href: "/mahotsav/significance-of-18" },
      { label: "The Legacy", href: "/mahotsav/legacy" },
    ],
  },
  {
    // Journey combines the former The Journey and Experience sections.
    label: "Journey",
    href: "/global-journey",
    children: [
      { label: "Curtain Raiser", href: "/global-journey/curtain-raiser" },
      {
        label: "18 Countries – 18 Chapters – 18 Languages",
        href: "/global-journey/18-countries",
      },
      { label: "Venue", href: "/experience/venue" },
      { label: "Four Paths", href: "/experience/four-pathways" },
      { label: "Centre Stage", href: "/experience/central-stage" },
      { label: "Zones", href: "/experience/zones" },
    ],
  },
  {
    label: "Program",
    href: "/programme",
    children: [
      { label: "Curtain Raiser", href: "/programme/curtain-raiser" },
      {
        label: "Bhagavad Gita Vishwa Mahotsav",
        href: "/programme/mega-mahotsav",
      },
      { label: "Grand Parayana", href: "/programme/grand-parayana" },
      { label: "Youth Gita", href: "/programme/youth-gita" },
      { label: "Global Connect", href: "/programme/global-connect" },
      { label: "Gita Sankalpa", href: "/programme/gita-sankalpa" },
    ],
  },
  {
    // Participate and Partners pages are grouped under Participation.
    label: "Participation",
    href: "/participate",
    children: [
      { label: "Participation", href: "/participate/global" },
      {
        label: "Institution Participation",
        href: "/participate/institution",
      },
      { label: "Youth Participation", href: "/participate/youth" },
      { label: "Volunteer", href: "/participate/volunteer" },
      { label: "Gita Parayana", href: "/participate/host-parayana" },
      { label: "Donor", href: "/participate/donor" },
      { label: "Why Partner?", href: "/partners/why-partner" },
      { label: "Founding Patron", href: "/partners/founding-patron" },
      {
        label: "Partnership Opportunities",
        href: "/partners/opportunities",
      },
      { label: "Sponsorship", href: "/partners/sponsorship" },
      { label: "CSR Partnership", href: "/partners/csr" },
      { label: "Knowledge Partner", href: "/partners/knowledge" },
      { label: "Youth Partner", href: "/partners/youth" },
      { label: "Media Partner", href: "/partners/media" },
      { label: "Partnership Proposal", href: "/partners/proposal" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "News", href: "/media/news" },
      { label: "Gallery", href: "/media/gallery" },
      { label: "Videos", href: "/media/videos" },
      { label: "Media Coverage", href: "/media/press-kit" },
      { label: "Up Coming", href: "/upcoming events" },
      { label: "Connect With Us", href: "/connect" },
    ],
  },
  {
    // About pages are grouped under Our Leadership.
    label: "Our Leadership",
    href: "/about",
    children: [
      { label: "Organising Body", href: "/about/organising-body" },
      { label: "Advisory Council", href: "/about/advisory-council" },
      {
        label: "Spiritual Leadership",
        href: "/about/spiritual-leadership",
      },
      {
        label: "Organising Committee",
        href: "/about/organising-committee",
      },
      {
        label: "Institutional Partners",
        href: "/about/institutional-partners",
      },
      { label: "Our Values", href: "/about/values" },
      { label: "Contact", href: "/about/contact" },
    ],
  },
];
