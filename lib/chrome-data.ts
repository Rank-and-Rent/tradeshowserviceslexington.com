export const business = {
  name: "Trade Show Services of Lexington",
  legalName: "Trade Show Services of Lexington",
  city: "Lexington",
  state: "KY",
  domain: "tradeshowserviceslexington.com",
  address: "300 W Vine St, Suite 200, Lexington, KY 40507",
  phone: "859-555-0147",
  email: "info@tradeshowserviceslexington.com"
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
      title: "A service stack built around the venue, not around a template",
      text: "From booth design to labor, AV, freight, and show-site leadership, the right mix depends on the room, the calendar, and the venue rules already in play.",
      href: "/services",
      buttonLabel: "See services"
    }
  },
  {
    label: "Venues",
    href: "/venues",
    children: [
      { label: "Central Bank Center", href: "/venues/central-bank-center" },
      { label: "Hyatt Regency Lexington", href: "/venues/hyatt-regency-lexington" },
      { label: "Hilton Lexington/Downtown", href: "/venues/hilton-lexington-downtown" },
      { label: "Lexington Marriott City Center", href: "/venues/lexington-marriott-city-center" }
    ],
    panel: {
      title: "Venue guidance for downtown halls, suburban hotels, and fairgrounds buildings",
      text: "Each Des Moines venue changes the way freight moves, labor is ordered, and guest traffic feels on the floor, so the building should shape the plan from the start.",
      href: "/venues",
      buttonLabel: "Browse venues"
    }
  },
  {
    label: "Locations",
    href: "/locations",
    children: [
      { label: "Downtown Lexington", href: "/locations/downtown-lexington" },
      { label: "Newtown Pike Corridor", href: "/locations/newtown-pike-corridor" },
      { label: "Hamburg", href: "/locations/hamburg" },
      { label: "South Lexington", href: "/locations/south-lexington" }
    ],
    panel: {
      title: "Metro coverage that reflects real planning differences",
      text: "Downtown, the west corridor, the fairgrounds and Altoona cluster, and the north metro each create their own routing, parking, and hotel behavior.",
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
      title: "Format coverage for trade shows, conferences, and activation programs",
      text: "Use the event-type stack when the room needs to support exhibitors, sponsors, registration, and general-session work without losing the thread.",
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
      title: "Booth formats with different build, sightline, and labor needs",
      text: "Inline, island, custom, rental, and modular booths each create a different production path, so the format should match the footprint and the show objective.",
      href: "/booth-types",
      buttonLabel: "Explore booth types"
    }
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Healthcare Trade Show Services", href: "/industries/healthcare-trade-show-services" },
      { label: "Manufacturing Expo Services", href: "/industries/manufacturing-expo-services" },
      { label: "Agriculture and AgTech Expo Services", href: "/industries/agriculture-and-agtech-expo-services" },
      { label: "Education and Association Event Services", href: "/industries/education-and-association-event-services" }
    ],
    panel: {
      title: "Buyer-specific planning paths for real industries",
      text: "Healthcare, manufacturing, agriculture, education, and other verticals need different language, pacing, and exhibit priorities than a generic event page can offer.",
      href: "/industries",
      buttonLabel: "Browse industries"
    }
  },
  {
    label: "About",
    href: "/about"
  }
];
