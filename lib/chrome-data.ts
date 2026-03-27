export const business = {
  name: "Trade Show Services of Des Moines",
  legalName: "Trade Show Services of Des Moines",
  city: "Des Moines",
  state: "IA",
  domain: "tradeshowservicesdesmoines.com",
  address: "699 Walnut St, Suite 400, Des Moines, IA 50309",
  phone: "555-555-5615",
  email: "info@tradeshowdisplaydesmoines.com"
} as const;

export type HeaderNavItem = {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
  }>;
  panel?: {
    title: string;
    text: string;
    href: string;
    buttonLabel: string;
  };
};

export type HeaderUtilityAction = {
  label: string;
  href: string;
  variant: "phone" | "secondary";
};

export const headerUtilityActions: HeaderUtilityAction[] = [
  {
    label: "contact",
    href: "/contact",
    variant: "secondary"
  }
];

export const headerNavigation: HeaderNavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Turnkey Trade Show Services", href: "/services/turnkey-trade-show-services" },
      { label: "Trade Show General Contracting", href: "/services/trade-show-general-contracting" },
      { label: "Trade Show AV Production", href: "/services/trade-show-av-production" },
      { label: "Expo Logistics and Shipping", href: "/services/expo-logistics-and-shipping" }
    ],
    panel: {
      title: "Project-led execution for Central Iowa show calendars",
      text: "Map the service mix across booths, labor, AV, logistics, graphics, and venue coordination before show week compresses the schedule.",
      href: "/services",
      buttonLabel: "See services"
    }
  },
  {
    label: "Venues",
    href: "/venues",
    children: [
      { label: "Community Choice Convention Center", href: "/venues/community-choice-convention-center" },
      { label: "EMC Expo Center", href: "/venues/emc-expo-center" },
      { label: "Ron Pearson Center", href: "/venues/ron-pearson-center" },
      { label: "Richard O. Jacobson Exhibition Center", href: "/venues/richard-o-jacobson-exhibition-center" }
    ],
    panel: {
      title: "Venue playbooks across downtown, west, and east-side halls",
      text: "Start with the building so utilities, labor posture, access, and room flow shape the plan early.",
      href: "/venues",
      buttonLabel: "Browse venues"
    }
  },
  {
    label: "Locations",
    href: "/locations",
    children: [
      { label: "Downtown Des Moines", href: "/locations/downtown-des-moines" },
      { label: "West Des Moines", href: "/locations/west-des-moines" },
      { label: "Ankeny", href: "/locations/ankeny" },
      { label: "Altoona", href: "/locations/altoona" }
    ],
    panel: {
      title: "Metro coverage with real submarket differences",
      text: "Downtown, the west corridor, the fairgrounds and Altoona cluster, and the north metro do not operate like the same venue district.",
      href: "/locations",
      buttonLabel: "View locations"
    }
  },
  {
    label: "Event Types",
    href: "/event-types",
    children: [
      { label: "Trade Show Services", href: "/event-types/trade-show-services" },
      { label: "Conference Services", href: "/event-types/conference-services" },
      { label: "Brand Activation Services", href: "/event-types/brand-activation-services" },
      { label: "User Conference Services", href: "/event-types/user-conference-services" }
    ],
    panel: {
      title: "Formats across trade shows, conferences, and activations",
      text: "Keep exhibit, sponsor, registration, and general-session work under one readable operating model.",
      href: "/event-types",
      buttonLabel: "See event types"
    }
  },
  {
    label: "Booth Types",
    href: "/booth-types",
    children: [
      { label: "Custom Exhibit Booths", href: "/booth-types/custom-exhibit-booths" },
      { label: "Island Exhibit Booths", href: "/booth-types/island-exhibit-booths" },
      { label: "Inline Booth Displays", href: "/booth-types/inline-booth-displays" },
      { label: "Rental Exhibit Booths", href: "/booth-types/rental-exhibit-booths" }
    ],
    panel: {
      title: "Exhibit formats that stay venue-ready",
      text: "Compare booth geometry, fabrication pressure, sightlines, and install requirements without flattening every format into the same answer.",
      href: "/booth-types",
      buttonLabel: "Explore booth types"
    }
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Agriculture and AgTech Expo Services", href: "/industries/agriculture-and-agtech-expo-services" },
      { label: "Healthcare Trade Show Services", href: "/industries/healthcare-trade-show-services" },
      { label: "Manufacturing Expo Services", href: "/industries/manufacturing-expo-services" },
      { label: "Education and Association Event Services", href: "/industries/education-and-association-event-services" }
    ],
    panel: {
      title: "Buyer-specific planning paths",
      text: "Use the industry stack when the project needs to sound like the buyer's market instead of generic trade-show copy.",
      href: "/industries",
      buttonLabel: "Browse industries"
    }
  },
  {
    label: "About",
    href: "/about"
  }
];
