export const SUBMISSION_STATUSES = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-800" },
  { value: "reviewed", label: "Reviewed", color: "bg-yellow-100 text-yellow-800" },
  { value: "generating", label: "Generating", color: "bg-purple-100 text-purple-800" },
  { value: "generated", label: "Generated", color: "bg-green-100 text-green-800" },
  { value: "deployed", label: "Deployed", color: "bg-emerald-100 text-emerald-800" },
] as const;

export const INDUSTRIES = [
  "Auto Detailing",
  "Pressure Washing",
  "Lawn Care",
  "Cleaning Service",
  "Mobile Mechanic",
  "Pet Grooming",
  "Painting",
  "Handyman",
  "Junk Removal",
  "Law Firm",
  "Dental",
  "Chiropractic",
  "Real Estate",
  "Accounting",
  "Med Spa",
  "Therapy",
  "Restaurant",
  "Food Truck",
  "Catering",
  "Barber Shop",
  "Salon",
  "Gym / Fitness",
  "Tattoo Shop",
  "Boutique / Retail",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "$99–$149/mo",
  "$149–$249/mo",
  "$249–$399/mo",
  "$399+/mo",
  "Not sure yet",
] as const;

export const PAGES_OPTIONS = [
  "Home",
  "About",
  "Services",
  "Contact",
  "Booking / Scheduling",
  "Portfolio / Gallery",
  "Reviews / Testimonials",
  "Blog",
  "FAQ",
  "Pricing",
  "Careers",
  "Legal / Privacy",
] as const;

export const FEATURES_OPTIONS = [
  "Contact form",
  "Google Maps / Directions",
  "Photo gallery",
  "Online booking / scheduling",
  "Payment processing",
  "Customer accounts / login",
  "Admin dashboard",
  "Email notifications",
  "Live chat / chatbot",
  "Social media integration",
  "SEO optimization",
  "Mobile app",
] as const;

export const GOALS_OPTIONS = [
  "Generate more leads",
  "Accept online bookings",
  "Sell products online",
  "Build trust / credibility",
  "Replace outdated website",
  "Rank higher on Google (SEO)",
  "Get a mobile app",
  "Accept payments online",
  "Showcase portfolio / work",
  "Other",
] as const;

export const STYLE_OPTIONS = [
  "Modern & Minimal",
  "Bold & Colorful",
  "Professional & Corporate",
  "Warm & Friendly",
  "Luxury & Elegant",
  "Rustic & Natural",
] as const;

export const DEFAULT_SERVICE_TEMPLATE = [
  { name: "Service One", price: "", duration: "" },
  { name: "Service Two", price: "", duration: "" },
  { name: "Service Three", price: "", duration: "" },
] as const;

export const INDUSTRY_SERVICE_TEMPLATES: Record<string, { name: string; price: string; duration: string }[]> = {
  "Auto Detailing": [
    { name: "Express Wash", price: "$45", duration: "30-45 min" },
    { name: "Full Interior + Exterior", price: "$149", duration: "2-3 hrs" },
    { name: "Premium Detail", price: "$249", duration: "4-5 hrs" },
    { name: "Ceramic Coating", price: "$599+", duration: "1 day" },
  ],
  "Pressure Washing": [
    { name: "House Wash", price: "$199+", duration: "2-3 hrs" },
    { name: "Driveway Cleaning", price: "$99+", duration: "1-2 hrs" },
    { name: "Deck / Patio Cleaning", price: "$149+", duration: "2-3 hrs" },
    { name: "Roof Soft Wash", price: "$349+", duration: "3-4 hrs" },
  ],
  "Lawn Care": [
    { name: "Weekly Lawn Mowing", price: "$45+", duration: "30-60 min" },
    { name: "Bi-Weekly Mowing", price: "$55+", duration: "30-60 min" },
    { name: "Lawn Aeration", price: "$129+", duration: "1-2 hrs" },
    { name: "Fertilization Treatment", price: "$79+", duration: "30-45 min" },
  ],
  "Cleaning Service": [
    { name: "Standard Home Cleaning", price: "$129+", duration: "2-3 hrs" },
    { name: "Deep Cleaning", price: "$249+", duration: "4-6 hrs" },
    { name: "Move-In / Move-Out", price: "$299+", duration: "5-7 hrs" },
    { name: "Office Cleaning", price: "Custom", duration: "Varies" },
  ],
  "Mobile Mechanic": [
    { name: "Oil Change", price: "$79", duration: "30-45 min" },
    { name: "Brake Service", price: "$249+", duration: "1-2 hrs" },
    { name: "Battery Replacement", price: "$179+", duration: "30 min" },
    { name: "Diagnostic Scan", price: "$99", duration: "30-45 min" },
  ],
  "Pet Grooming": [
    { name: "Bath & Brush", price: "$45+", duration: "1 hr" },
    { name: "Full Groom (Small Dog)", price: "$65+", duration: "1.5 hrs" },
    { name: "Full Groom (Large Dog)", price: "$95+", duration: "2-3 hrs" },
    { name: "Nail Trim", price: "$15", duration: "15 min" },
  ],
  "Painting": [
    { name: "Interior Room Painting", price: "$399+", duration: "1-2 days" },
    { name: "Exterior House Painting", price: "$2,499+", duration: "3-5 days" },
    { name: "Cabinet Refinishing", price: "$1,499+", duration: "2-4 days" },
    { name: "Trim & Door Painting", price: "$249+", duration: "1 day" },
  ],
  "Handyman": [
    { name: "Hourly Handyman", price: "$75/hr", duration: "1 hr min" },
    { name: "TV Mounting", price: "$129", duration: "30-60 min" },
    { name: "Furniture Assembly", price: "$89+", duration: "1-2 hrs" },
    { name: "Drywall Repair", price: "$149+", duration: "2-3 hrs" },
  ],
  "Junk Removal": [
    { name: "Single Item Pickup", price: "$79+", duration: "20-30 min" },
    { name: "Half Truck Load", price: "$249+", duration: "30-45 min" },
    { name: "Full Truck Load", price: "$449+", duration: "45-60 min" },
    { name: "Estate Cleanout", price: "Custom", duration: "Varies" },
  ],
  "Law Firm": [
    { name: "Initial Consultation", price: "Free", duration: "30 min" },
    { name: "Personal Injury Case", price: "Contingency", duration: "Varies" },
    { name: "Estate Planning", price: "$799+", duration: "2-3 weeks" },
    { name: "Business Formation", price: "$1,499+", duration: "1-2 weeks" },
  ],
  "Dental": [
    { name: "Cleaning & Exam", price: "$129+", duration: "45-60 min" },
    { name: "Whitening", price: "$349+", duration: "1 hr" },
    { name: "Cavity Filling", price: "$199+", duration: "30-60 min" },
    { name: "Crown", price: "$1,099+", duration: "2 visits" },
  ],
  "Chiropractic": [
    { name: "Initial Consultation", price: "$89", duration: "45-60 min" },
    { name: "Adjustment", price: "$65", duration: "20-30 min" },
    { name: "Massage Therapy", price: "$95", duration: "60 min" },
    { name: "Wellness Package (4 visits)", price: "$229", duration: "—" },
  ],
  "Real Estate": [
    { name: "Buyer Representation", price: "Commission", duration: "Varies" },
    { name: "Seller Representation", price: "Commission", duration: "Varies" },
    { name: "Free Market Analysis", price: "Free", duration: "30 min" },
    { name: "Investment Consultation", price: "Free", duration: "1 hr" },
  ],
  "Accounting": [
    { name: "Personal Tax Prep", price: "$249+", duration: "1-2 hrs" },
    { name: "Business Tax Prep", price: "$499+", duration: "Varies" },
    { name: "Monthly Bookkeeping", price: "$249/mo", duration: "Ongoing" },
    { name: "Payroll Service", price: "$99+/mo", duration: "Ongoing" },
  ],
  "Med Spa": [
    { name: "Facial", price: "$99+", duration: "60 min" },
    { name: "Botox", price: "$12/unit", duration: "30 min" },
    { name: "Laser Hair Removal", price: "$149+", duration: "30-60 min" },
    { name: "Chemical Peel", price: "$129+", duration: "45 min" },
  ],
  "Therapy": [
    { name: "Individual Therapy", price: "$150/hr", duration: "50 min" },
    { name: "Couples Therapy", price: "$185/hr", duration: "50 min" },
    { name: "Initial Intake", price: "$200", duration: "60-90 min" },
    { name: "Group Session", price: "$65", duration: "90 min" },
  ],
  "Restaurant": [
    { name: "Lunch Menu", price: "$12-22", duration: "—" },
    { name: "Dinner Menu", price: "$18-45", duration: "—" },
    { name: "Private Events", price: "Custom", duration: "—" },
    { name: "Catering", price: "Custom", duration: "—" },
  ],
  "Food Truck": [
    { name: "Signature Item", price: "$10-15", duration: "—" },
    { name: "Combo Meal", price: "$14-18", duration: "—" },
    { name: "Catering / Events", price: "Custom", duration: "—" },
    { name: "Private Bookings", price: "Custom", duration: "—" },
  ],
  "Catering": [
    { name: "Drop-Off Catering", price: "$15/person", duration: "—" },
    { name: "Full-Service Event", price: "$50/person+", duration: "—" },
    { name: "Wedding Package", price: "Custom", duration: "—" },
    { name: "Corporate Lunch", price: "$18/person+", duration: "—" },
  ],
  "Barber Shop": [
    { name: "Men's Haircut", price: "$30", duration: "30 min" },
    { name: "Beard Trim", price: "$20", duration: "20 min" },
    { name: "Haircut + Beard Combo", price: "$45", duration: "45 min" },
    { name: "Kid's Cut", price: "$25", duration: "30 min" },
  ],
  "Salon": [
    { name: "Women's Haircut", price: "$65+", duration: "60 min" },
    { name: "Hair Color", price: "$129+", duration: "2-3 hrs" },
    { name: "Highlights", price: "$179+", duration: "2-3 hrs" },
    { name: "Blowout", price: "$45+", duration: "45 min" },
  ],
  "Gym / Fitness": [
    { name: "Monthly Membership", price: "$59/mo", duration: "—" },
    { name: "Personal Training", price: "$75/session", duration: "60 min" },
    { name: "Group Class", price: "$25/class", duration: "45-60 min" },
    { name: "10-Class Pack", price: "$199", duration: "—" },
  ],
  "Tattoo Shop": [
    { name: "Small Tattoo (2-3 hrs)", price: "$200+", duration: "2-3 hrs" },
    { name: "Half-Day Session", price: "$600+", duration: "4 hrs" },
    { name: "Full-Day Session", price: "$1,200+", duration: "8 hrs" },
    { name: "Free Consultation", price: "Free", duration: "30 min" },
  ],
  "Boutique / Retail": [
    { name: "In-Store Shopping", price: "Various", duration: "—" },
    { name: "Personal Styling", price: "$99/hr", duration: "1-2 hrs" },
    { name: "Wardrobe Consultation", price: "$199", duration: "2 hrs" },
    { name: "Gift Cards", price: "$25+", duration: "—" },
  ],
};

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Lead Scanner", href: "/admin/leads", icon: "Search" },
  { label: "Intake Forms", href: "/admin/intake-forms", icon: "FileText" },
  { label: "Submissions", href: "/admin/submissions", icon: "Inbox" },
  { label: "Demos", href: "/admin/demos", icon: "Eye" },
  { label: "Generated Sites", href: "/admin/sites", icon: "Globe" },
] as const;
