/**
 * Cricket Turf - Business Information & Website Data Configuration
 * Makum Road, Tinsukia, Assam, India
 * 
 * Edit this file to easily update business contact details, pricing, slots, reviews, and gallery items.
 */

const TURF_CONFIG = {
  business: {
    name: "Cricket Turf",
    legalName: "Cricket Turf Tinsukia",
    tagline: "Makum Road's Premier Floodlit Box Cricket Arena",
    category: "Sports Complex / Cricket Turf",
    address: {
      street: "Near By-pass Crossing, Makum Road",
      city: "Tinsukia",
      state: "Assam",
      postalCode: "786125",
      country: "India",
      fullAddress: "Makum Road, Near By-pass Crossing, Tinsukia, Assam 786125, India"
    },
    contact: {
      phone: "+91 98765 43210",       // [PHONE] placeholder / editable
      phoneDisplay: "+91 98765 43210",
      phoneRaw: "+919876543210",
      whatsapp: "+91 98765 43210",    // [WHATSAPP] placeholder / editable
      whatsappRaw: "919876543210",
      email: "booking@cricketturftinsukia.com",
      instagram: "cricketturf_tinsukia", // [INSTAGRAM]
      instagramUrl: "https://instagram.com/cricketturf_tinsukia",
      mapsUrl: "https://maps.google.com/?q=Makum+Road+Tinsukia+Assam", // [MAPS LINK]
      embedMapQuery: "Makum+Road+Tinsukia+Assam"
    },
    timings: {
      open: "06:00 AM",
      close: "01:00 AM",
      display: "Open 7 Days: 6:00 AM – 1:00 AM (Midnight matches available)",
      days: "Monday - Sunday"
    },
    meta: {
      rating: "4.9",
      reviewCount: "480+",
      matchesPlayed: "2,200+",
      tournamentsHosted: "65+",
      turfGrade: "ICC & FIFA Certified 40mm Monofilament AstroTurf"
    }
  },

  pitches: [
    {
      id: "pitch-1",
      name: "Pitch 1: Grand Box Cricket Arena",
      badge: "Most Popular",
      dimensions: "120 ft x 65 ft x 40 ft Net Height",
      capacity: "7v7 to 8v8 Matches (Up to 16 players)",
      features: [
        "40mm High-Density Shock Absorption AstroTurf",
        "1000W Anti-Glare Shadowless LED Floodlights",
        "Heavy-Duty 40ft Enclosed Perimeter Netting",
        "Air-Conditioned Dugout with Live Viewing Window",
        "Digital Boundary Ropes & Stumps Provided"
      ],
      dayRate: 800,
      nightRate: 1200,
      image: "assets/images/hero-stadium.jpg",
      description: "Our flagship box cricket pitch engineered for high-energy T-10/T-20 matches. Features true bounce, quick outfield response, and stadium-grade floodlighting."
    },
    {
      id: "pitch-2",
      name: "Pitch 2: Pro Training & Box Arena",
      badge: "Practice & Matches",
      dimensions: "105 ft x 55 ft x 35 ft Net Height",
      capacity: "6v6 Matches or Net Practice (Up to 12 players)",
      features: [
        "Programmable Automated Bowling Machine Compatible",
        "True-Seam Pitch Matting with Accurate Ball Rebound",
        "Full Safety Enclosure with High-Impact Netting",
        "Dedicated Warm-up & Practice Bowling Run-up",
        "Free Cricket Bats & Practice Balls Included"
      ],
      dayRate: 700,
      nightRate: 1000,
      image: "assets/images/box-cricket-action.jpg",
      description: "Perfect for fast-paced box cricket matches, club practice sessions, or intensive 1-on-1 batting practice against our high-speed bowling machine."
    }
  ],

  services: [
    {
      id: "box-cricket",
      title: "Box Cricket League Matches",
      icon: "trophy",
      badge: "Prime Evening",
      shortDesc: "Fast-paced, adrenaline-packed enclosed cricket under stadium-grade floodlights with your squad.",
      features: ["Complimentary gear & balls", "Live digital scoring app", "Refreshing chilled hydration available"],
      priceDay: "₹800/hr (Day)",
      priceNight: "₹1,200/hr (Floodlights)",
      ctaText: "Book Match Slot"
    },
    {
      id: "bowling-machine",
      title: "Bowling Machine Practice",
      icon: "target",
      badge: "Skill Builder",
      shortDesc: "Master your strokes against consistent line & length. Speeds from 60 km/h to 140 km/h with spin & swing.",
      features: ["Inswing, outswing & spin modes", "Over 150 balls per hour session", "Speed radar analysis"],
      priceDay: "₹500/hr + Turf Slot",
      priceNight: "₹500/hr + Turf Slot",
      ctaText: "Reserve Machine"
    },
    {
      id: "midnight-cricket",
      title: "Midnight Cricket Madness",
      icon: "moon",
      badge: "10 PM - 1 AM",
      shortDesc: "Beat the heat and workday stress. Enjoy late-night weekend cricket under bright floodlights with friends.",
      features: ["Cool Assam night breeze", "Music system connectivity", "Snacks & energy drink bar open"],
      priceDay: "—",
      priceNight: "₹1,000/hr (Special Night Offer)",
      ctaText: "Book Midnight Slot"
    },
    {
      id: "tournaments",
      title: "Corporate & Club Tournaments",
      icon: "flag",
      badge: "Full Venue",
      shortDesc: "Host full-day or weekend tournaments for your company, college, or local sports club with turnkey management.",
      features: ["Trophy & medals package", "Live streaming & commentary setup", "Professional certified umpires"],
      priceDay: "Starting at ₹5,999/day",
      priceNight: "Custom packages available",
      ctaText: "Plan Tournament"
    },
    {
      id: "coaching-academy",
      title: "Junior & Adult Cricket Coaching",
      icon: "award",
      badge: "Certified Mentors",
      shortDesc: "Weekend batting and bowling clinics led by seasoned district cricketers for aspiring talent.",
      features: ["Batting grip & stance analysis", "Pace & spin bowling drills", "Weekly match simulations"],
      priceDay: "Monthly passes from ₹2,499",
      priceNight: "Flexible batches",
      ctaText: "Inquire Coaching"
    },
    {
      id: "private-events",
      title: "Birthday & Private Celebrations",
      icon: "sparkles",
      badge: "Celebration",
      shortDesc: "Celebrate birthdays and team wins with private turf access, party dugout lounge, and catering options.",
      features: ["Private lounge access", "Decorations allowed", "Exclusive whole-turf booking"],
      priceDay: "Contact for tailored quote",
      priceNight: "Contact for tailored quote",
      ctaText: "Request Event Quote"
    }
  ],

  pricingSlots: [
    { time: "06:00 AM – 11:00 AM", type: "Morning Dew", rate: 800, tag: "Fresh Energy" },
    { time: "11:00 AM – 04:00 PM", type: "Afternoon Saver", rate: 700, tag: "Best Value" },
    { time: "04:00 PM – 10:00 PM", type: "Prime Floodlight", rate: 1200, tag: "Peak Match Hours" },
    { time: "10:00 PM – 01:00 AM", type: "Midnight League", rate: 1000, tag: "Night Owl Favorite" }
  ],

  addOns: [
    { id: "heavy-tennis-balls", name: "Extra Box of 6 Heavy Tennis Balls (Vicky/Nivia)", price: 250 },
    { id: "bowling-machine-addon", name: "Robotic Bowling Machine with Operator (1 hr)", price: 500 },
    { id: "umpire", name: "Professional Match Umpire & Live Scorer (1 hr)", price: 300 },
    { id: "live-stream", name: "HD Match Video Recording / YouTube Live Stream", price: 600 }
  ],

  whyChooseUs: [
    {
      icon: "shield-check",
      title: "All-Weather ICC-Grade Turf",
      desc: "40mm monofilament shock-absorption turf engineered with smart sub-base drainage. Play 15 minutes after Assam monsoons."
    },
    {
      icon: "sun",
      title: "1000W Shadowless Floodlights",
      desc: "Uniform stadium-grade lux lighting across all corners of the pitch. Zero dark spots or blinding glare for batsmen and fielders."
    },
    {
      icon: "zap",
      title: "Fast & Instant WhatsApp Booking",
      desc: "Check live slot availability, customize your duration and add-ons, and secure your slot via UPI advance in under 60 seconds."
    },
    {
      icon: "coffee",
      title: "AC Dugout & Refreshment Lounge",
      desc: "Air-conditioned spectator dugout, chilled hydration, energy drinks, and comfortable seating with glass match views."
    },
    {
      icon: "crosshair",
      title: "Automated Bowling Machine",
      desc: "Dial in real match situations with programmable swing, seam, bounce, and pace from 60 to 140 km/h."
    },
    {
      icon: "map-pin",
      title: "Makum Road Prime Location",
      desc: "Situated right off the Tinsukia bypass with hassle-free access, 20+ bike parking and 8+ car parking slots on premises."
    }
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Under The Lights - Pitch 1 Night Match",
      category: "Night Matches",
      image: "assets/images/hero-stadium.jpg",
      caption: "High-intensity night box cricket match under 1000W stadium floodlights at Makum Road."
    },
    {
      id: "gal-2",
      title: "Crucial Match-Winning Boundary",
      category: "Match Action",
      image: "assets/images/box-cricket-action.jpg",
      caption: "A batsman executing a clean lofted drive on our 40mm cushioned astro-turf."
    },
    {
      id: "gal-3",
      title: "Automated Bowling Machine Setup",
      category: "Amenities",
      image: "assets/images/bowling-machine.jpg",
      caption: "Sharpening batting reflexes against 130 km/h seam bowling in Pitch 2."
    },
    {
      id: "gal-4",
      title: "VIP Players Dugout & Lounge",
      category: "Amenities",
      image: "assets/images/dugout-lounge.jpg",
      caption: "Air-conditioned players pavilion with glass viewing panel, chilled beverages & LED scoreboard."
    },
    {
      id: "gal-5",
      title: "Tinsukia Premier League Champions",
      category: "Tournaments",
      image: "assets/images/tournament-champions.jpg",
      caption: "Annual corporate tournament trophy presentation and team celebration."
    },
    {
      id: "gal-6",
      title: "Aerial View of Twin Turfs & Tea Gardens",
      category: "Venue",
      image: "assets/images/aerial-view.jpg",
      caption: "State-of-the-art dual pitches set amidst scenic greenery along Makum Road, Tinsukia."
    }
  ],

  reviews: [
    {
      name: "Rohit Agarwal",
      team: "Captain, Tinsukia Strikers",
      rating: 5,
      date: "Last week",
      comment: "Easily the best cricket turf in Upper Assam! The pitch bounce is remarkably consistent, and the floodlights are so bright you never lose sight of the ball even for high catches. We book Friday night slots every week.",
      avatar: "RA"
    },
    {
      name: "Debojit Baruah",
      team: "Makum Super Kings",
      rating: 5,
      date: "2 weeks ago",
      comment: "During monsoon, every mud ground in Tinsukia gets ruined, but this turf's drainage is magical. Rain stopped and we were batting 20 minutes later! WhatsApp booking is super smooth.",
      avatar: "DB"
    },
    {
      name: "Pooja Sharma",
      team: "Corporate HR, Oil India Ltd",
      rating: 5,
      date: "1 month ago",
      comment: "Organized our departmental 8-team weekend tournament here. The team provided umpires, digital scoring, and trophy setup. The AC lounge for spectators made a huge difference. Highly recommended!",
      avatar: "PS"
    },
    {
      name: "Vikramjit Singh",
      team: "Club All-Rounder",
      rating: 5,
      date: "3 weeks ago",
      comment: "The programmable bowling machine is top notch. Helped me correct my front-foot cover drive before the district selection matches. Great staff and ample parking right on Makum Road.",
      avatar: "VS"
    }
  ],

  faqs: [
    {
      q: "What type of footwear is permitted on the turf?",
      a: "Only flat rubber-soled turf shoes or normal sports sneakers are allowed. Metal spikes, football studs, or hard leather shoes are strictly prohibited to preserve the integrity and cushioning of the astro-turf."
    },
    {
      q: "Can we continue playing if it starts raining?",
      a: "Yes! The turf has a specialized multi-layer drainage sub-base that quickly filters rainwater away. In light drizzle, play continues normally. For heavy downpours, the pitch is fully playable within 10 to 15 minutes once the rain ceases."
    },
    {
      q: "Are cricket bats, balls, and wickets provided?",
      a: "Yes! High-quality tennis cricket bats, practice balls, wooden stumps, and bails are provided complimentary with every slot booking. You can also bring your personal gear or rent heavy tennis tournament balls and bowling machines."
    },
    {
      q: "How many players can play in a single slot?",
      a: "Pitch 1 comfortably supports 7v7 to 8v8 box cricket matches (up to 16-18 players including substitutes). Pitch 2 is optimal for 6v6 matches or individual net practice sessions."
    },
    {
      q: "What are your operational hours for booking?",
      a: "We are open 7 days a week from 6:00 AM in the morning until 1:00 AM past midnight. Midnight slots (10:00 PM to 1:00 AM) are highly popular and should ideally be reserved 24–48 hours in advance."
    },
    {
      q: "How do I confirm and pay for my slot?",
      a: "You can use our interactive website calculator to select your date, time, and pitch, then tap 'Book via WhatsApp' or submit the booking form. A minimal 20% advance via UPI (Google Pay, PhonePe, Paytm) secures your slot, with the balance payable at the venue."
    },
    {
      q: "What is the cancellation and rescheduling policy?",
      a: "We offer 100% free slot rescheduling if notified at least 4 hours before your slot time. In case of unexpected server weather or technical emergencies, your slot will be gladly rescheduled to any mutually available future date."
    },
    {
      q: "Is vehicle parking available at the venue?",
      a: "Yes, we have dedicated, well-lit parking space on our Makum Road premises with room for 25+ two-wheelers and 8+ four-wheelers with security monitoring."
    }
  ]
};

// Export to window
window.TURF_CONFIG = TURF_CONFIG;
