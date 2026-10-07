# Cricket Turf - Makum Road, Tinsukia, Assam
### Agency-Grade Production Business Website & Slot Booking Engine

---

## 📌 Business Profile
* **Business Name:** Cricket Turf (Cricket Turf Tinsukia)
* **Category:** Sports Venue / Box Cricket Turf Arena
* **Location:** Near By-pass Crossing, Makum Road, Tinsukia, Assam 786125, India
* **Primary Contacts:**
  * Phone: `+91 98765 43210` (Configurable in `assets/js/data.js`)
  * WhatsApp: `+91 98765 43210` (Configurable in `assets/js/data.js`)
  * Instagram: `@cricketturf_tinsukia`
  * Timings: 6:00 AM – 1:00 AM Daily (Open 7 Days a week)

---

## 🚀 Key Conversion & Experience Features

1. **Interactive Real-Time Slot Calculator**:
   * Pitch selection (Pitch 1: Grand Box Arena vs Pitch 2: Pro Training Arena).
   * Live match date picker with minimum date constraint.
   * Match duration selector (1h, 2h, 3h, 4h).
   * Time slot bands (Morning Dew, Afternoon Saver, Prime Floodlights, Midnight Madness).
   * Add-on gear options (heavy tennis balls, automated bowling machine with operator, match umpire, HD live stream).
   * Live price breakdown in Indian Rupees (₹) with 20% advance calculation.

2. **Dual High-Conversion Booking Channels**:
   * **Instant WhatsApp Booking**: Generates an encoded message with pitch name, date, time slot, duration, add-ons, and total amount, opening directly into WhatsApp.
   * **Online Reservation Modal**: Captures captain/team name, WhatsApp number, and match format, generates a unique booking reference ID (`#CT-XXXXXX`), and triggers celebratory confetti!

3. **Agency-Standard Visual & Sports Identity**:
   * Floodlight stadium aesthetics with deep onyx surfaces (`#070A08`) and high-energy emerald accents (`#10B981`, `#00E676`).
   * Custom high-resolution photorealistic imagery (Pitch under stadium lights, dynamic box cricket batting action, automated bowling machine, VIP dugout lounge, tournament trophy celebration, and aerial drone perspective of twin turfs in Assam tea gardens).
   * Modern typography pairing: **Outfit** for athletic bold headlines and **Plus Jakarta Sans** for crisp UI reading.

4. **Mobile-First Experience**:
   * Sticky glassmorphism header with live status pill ("OPEN 6 AM – 1 AM").
   * Mobile slide-over navigation drawer.
   * **Sticky bottom action bar** on mobile for instant 1-tap Call and WhatsApp booking.

5. **Engaging Sections**:
   * **Hero Section** with high-impact value proposition and specifications strip.
   * **Social Proof Bar** (4.9 ★ Google Rating, 2,200+ matches, 100% rain drainage, 65+ tournaments).
   * **Pitches & Services Showcase** with dimension tags and rate cards.
   * **Why Choose Us** highlighting 6 technical USPs (ICC turf, 1000W LED lights, sub-base drainage, AC lounge).
   * **About Us** with local community story and Assam landscape aerial view.
   * **Responsive Gallery with Filter & Fullscreen Lightbox** supporting keyboard navigation (Escape, Left/Right arrows).
   * **Player Testimonials** with verified player badges from local clubs.
   * **Smooth FAQ Accordion** addressing shoes, rain, pricing, gear, and parking.
   * **Location & Contact** featuring interactive Google Maps preview, direct click-to-call, and a validated contact form.

---

## 🛠 How to Configure Business Details

All business details are centralized in `assets/js/data.js`. To customize information:

```javascript
// assets/js/data.js
const TURF_CONFIG = {
  business: {
    name: "Cricket Turf",
    contact: {
      phone: "+91 98765 43210",       // Replace with actual phone
      phoneRaw: "+919876543210",
      whatsapp: "+91 98765 43210",    // Replace with actual WhatsApp number
      whatsappRaw: "919876543210",
      email: "booking@cricketturftinsukia.com",
      instagram: "cricketturf_tinsukia",
      mapsUrl: "https://maps.google.com/?q=Makum+Road+Tinsukia+Assam"
    },
    // Update rates, hours, pitches, reviews, and FAQs here
  }
};
```

---

## 📁 Directory Structure

```
cricket-turf-tinsukia/
├── index.html              # Semantic HTML5, SEO meta tags, LocalBusiness Schema
├── robots.txt              # Search engine crawler instructions
├── sitemap.xml             # XML Sitemap for Google Search Console
├── README.md               # Documentation and handover guide
└── assets/
    ├── css/
    │   └── styles.css      # CSS variables, glassmorphism, responsive grid, animations
    ├── js/
    │   ├── data.js         # Centralized business configuration
    │   └── app.js          # Interactive calculator, WhatsApp generator, lightbox, FAQ
    └── images/
        ├── favicon.svg             # Custom cricket turf icon
        ├── hero-stadium.jpg        # High-res floodlit arena
        ├── box-cricket-action.jpg  # Action batting shot
        ├── bowling-machine.jpg     # Automated training machine
        ├── dugout-lounge.jpg       # AC players lounge
        ├── tournament-champions.jpg# Tournament celebration
        └── aerial-view.jpg         # Aerial drone perspective
```

---

## 🌐 Free Production Hosting Options

Since this website is built with vanilla HTML5, CSS3, and ES6 JavaScript, it has **zero build dependencies** and can be deployed instantly to:

1. **Netlify**: Drag-and-drop the `cricket-turf-tinsukia` folder into the Netlify app.
2. **Vercel**: Deploy directly or connect via GitHub repository.
3. **GitHub Pages**: Push repository and activate GitHub Pages in repository settings.
4. **Firebase Hosting**: Run `firebase deploy` within the folder.
