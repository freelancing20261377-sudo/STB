export const tours = [
  {
    id: "1",
    slug: "singapore-night-experience",
    title: "Singapore Night Experience",
    subtitle:
      "Explore Marina Bay Sands, Gardens by the Bay, and the city's iconic skyline after dark.",
    duration: "6 Hours",
    price: "SGD 129",
    heroImage: "/singapore-night-exp.avif",
    coverImage: "/singapore-night-exp.avif",
    thumbnail: "/singapore-night-exp.avif",
    galleryImages: [],
    description:
      "Experience the magic of Singapore after dark. This comprehensive evening tour takes you through the city's most spectacular nighttime attractions, from the world-famous Marina Bay Sands to the illuminated wonders of Gardens by the Bay.",
    highlights: [
      "Marina Bay Sands SkyPark",
      "Gardens by the Bay (Light Show)",
      "Merlion Park",
      "Spectra Light & Water Show",
      "Clarke Quay Night Walk",
      "Singapore River Drive",
    ],
    included: [
      "Hotel Pickup & Drop",
      "Private Air-conditioned Vehicle",
      "Professional Chauffeur",
      "Bottled Water",
      "Parking & Toll Charges",
    ],
    excluded: [
      "Food & Beverages",
      "Attraction Admission Tickets",
      "Gratuities",
    ],
    itinerary: [
      { time: "5:00 PM", title: "Hotel Pickup" },
      { time: "5:30 PM", title: "Marina Bay Sands SkyPark" },
      { time: "6:30 PM", title: "Gardens by the Bay" },
      { time: "7:45 PM", title: "Light & Sound Show" },
      { time: "8:30 PM", title: "Dinner Break (Optional)" },
      { time: "9:30 PM", title: "Clarke Quay & Singapore River" },
      { time: "10:30 PM", title: "Merlion Park Night Photography" },
      { time: "11:00 PM", title: "Drop Back to Hotel" },
    ],
    reviews: [
      {
        author: "Michael T.",
        rating: 5,
        date: "October 2023",
        comment:
          "Incredible evening. The driver was right on time and navigating the city at night in a private car is the best way to see the lights.",
      },
      {
        author: "Sarah W.",
        rating: 5,
        date: "September 2023",
        comment:
          "The light show at Gardens by the Bay was breathtaking. Our chauffeur went above and beyond to ensure a great experience.",
      },
    ],
    faqs: [
      {
        question: "Are admission tickets included?",
        answer:
          "No, the price covers the private vehicle and chauffeur. You must purchase tickets for Marina Bay Sands SkyPark separately.",
      },
      {
        question: "Can we adjust the itinerary?",
        answer:
          "Yes, this is a private tour so the itinerary is fully flexible within the 6-hour duration.",
      },
    ],
  },
  {
    id: "2",
    slug: "city-discovery-tour",
    title: "City Discovery Tour",
    subtitle:
      "Visit Singapore's must-see attractions with personalized travel plans for enthusiasts.",
    duration: "9 Hours",
    price: "SGD 159",
    heroImage: "/city-discovery-tour.jpg",
    coverImage: "/city-discovery-tour.jpg",
    thumbnail: "/city-discovery-tour.jpg",
    galleryImages: [],
    description:
      "Discover the vibrant contrast of modern marvels and rich heritage that makes Singapore totally unique. This full-day guided loop covers all essential landmarks across the city-state.",
    highlights: [
      "Merlion Park",
      "Marina Bay Sands",
      "Chinatown",
      "Little India",
      "Kampong Glam",
      "Orchard Road",
      "Singapore Flyer",
      "Gardens by the Bay",
    ],
    included: [
      "Hotel Pickup & Drop",
      "Private Luxury Vehicle",
      "English Speaking Driver",
      "Complimentary Water",
      "Parking & ERP Charges",
    ],
    excluded: ["Lunch", "Attraction Admission Tickets"],
    itinerary: [
      { time: "9:00 AM", title: "Hotel Pickup" },
      { time: "9:30 AM", title: "Merlion Park" },
      { time: "10:15 AM", title: "Marina Bay" },
      { time: "11:30 AM", title: "Chinatown" },
      { time: "1:00 PM", title: "Lunch Break" },
      { time: "2:00 PM", title: "Little India" },
      { time: "3:00 PM", title: "Kampong Glam" },
      { time: "4:30 PM", title: "Gardens by the Bay" },
      { time: "6:00 PM", title: "Return to Hotel" },
    ],
    reviews: [
      {
        author: "David P.",
        rating: 5,
        date: "November 2023",
        comment:
          "Perfect overview of the city. We saw so much in one day that we could never have done on our own using public transport.",
      },
      {
        author: "Emma L.",
        rating: 4,
        date: "August 2023",
        comment:
          "Great driver, very knowledgeable. Little India and Kampong Glam were the highlights!",
      },
    ],
    faqs: [
      {
        question: "Where do we stop for lunch?",
        answer:
          "The driver can recommend excellent local food courts, usually around Chinatown or Little India.",
      },
      {
        question: "Are we rushed at each attraction?",
        answer:
          "No, you set the pace. If you prefer to spend more time at one location, we can adapt on the fly.",
      },
    ],
  },
  {
    id: "3",
    slug: "family-adventure-package",
    title: "Family Adventure Package",
    subtitle:
      "Comfortable travel and memorable experiences for the whole family across Singapore.",
    duration: "2 Days / 1 Night",
    price: "SGD 399",
    heroImage: "/family-adventure-package.jpeg",
    coverImage: "/family-adventure-package.jpeg",
    thumbnail: "/family-adventure-package.jpeg",
    galleryImages: [],
    description:
      "The ultimate Sentosa getaway curated for families with children. Save the hassle of navigating transport with strollers and let our kid-friendly chauffeurs handle the point-to-point transfers.",
    highlights: [
      "Universal Studios Singapore",
      "S.E.A Aquarium",
      "Sentosa Island",
      "Adventure Cove Waterpark",
      "Cable Car Ride",
      "Wings of Time Show",
    ],
    included: [
      "Hotel Pickup & Drop",
      "Family-Friendly Vehicle",
      "Child Safety Seats",
      "Attraction Transfers",
      "Driver Assistance",
      "Complimentary Snacks & Water",
    ],
    excluded: [
      "Hotel Accommodation",
      "Meals & Dining",
      "Attraction Admission Tickets",
    ],
    itinerary: [
      { time: "Day 1", title: "Hotel Pickup" },
      { time: "Day 1", title: "Universal Studios" },
      { time: "Day 1", title: "Lunch" },
      { time: "Day 1", title: "Cable Car Ride" },
      { time: "Day 1", title: "Wings of Time" },
      { time: "Day 2", title: "S.E.A Aquarium" },
      { time: "Day 2", title: "Adventure Cove" },
      { time: "Day 2", title: "Sentosa Beach" },
      { time: "Day 2", title: "Return Hotel" },
    ],
    reviews: [
      {
        author: "The Patel Family",
        rating: 5,
        date: "December 2023",
        comment:
          "A lifesaver with two toddlers! The child car seats were pre-installed, driver was super patient. Sentosa was amazing.",
      },
      {
        author: "Jenna",
        rating: 5,
        date: "October 2023",
        comment:
          "Universal Studios took all our energy, so stepping into an air-conditioned luxury van with cold water waiting was priceless.",
      },
    ],
    faqs: [
      {
        question: "Are child seats compulsory?",
        answer:
          "By law, passengers below 1.35m must use child restraints, which we provide complimentary upon request.",
      },
      {
        question: "Do you book the hotel?",
        answer:
          "No, this package covers ground transfers and itinerary management. Accommodation must be booked separately.",
      },
    ],
  },
  {
    id: "4",
    slug: "luxury-singapore-experience",
    title: "Luxury Singapore Experience",
    subtitle:
      "VIP vehicles, private chauffeur, local expertise, and world-class premium service.",
    duration: "8 Hours",
    price: "SGD 499",
    heroImage: "/luxury-singapore-experience.jpg",
    coverImage: "/luxury-singapore-experience.jpg",
    thumbnail: "/luxury-singapore-experience.jpg",
    galleryImages: [],
    description:
      "An uncompromising journey through Singapore's finest establishments. Traverse the island in supreme comfort inside an executive-class vehicle while a discreet personal chauffeur caters to your timeline and preferences.",
    highlights: [
      "Mercedes S-Class / BMW 7 Series / Toyota Alphard",
      "VIP Meet & Greet",
      "Fullerton Hotel",
      "Marina Bay Sands",
      "Michelin-Star Dining Drops",
      "Rooftop Bar Circuit",
    ],
    included: [
      "Personal Chauffeur",
      "Airport Pickup",
      "VIP Meet & Greet",
      "Premium Bottled Water",
      "Wi-Fi Onboard",
      "Phone Chargers",
      "Flexible Stops",
      "Personalized Itinerary",
    ],
    excluded: ["Dining Expenses", "Event/Club Cover Charges"],
    itinerary: [
      { time: "Flexible", title: "Marina Bay Sands" },
      { time: "Flexible", title: "Fullerton Hotel" },
      { time: "Flexible", title: "Orchard Road" },
      { time: "Flexible", title: "National Gallery" },
      { time: "Flexible", title: "Gardens by the Bay" },
      { time: "Flexible", title: "Sentosa Cove" },
      { time: "Flexible", title: "Michelin-Star Restaurant" },
      { time: "Flexible", title: "Rooftop Bar" },
    ],
    reviews: [
      {
        author: "Mr. Thompson",
        rating: 5,
        date: "January 2024",
        comment:
          "Flawless service. The S-Class was pristine, driver was thoroughly professional. The perfect way to entertain visiting executives.",
      },
      {
        author: "Alice G.",
        rating: 5,
        date: "November 2023",
        comment:
          "Booked this for our VIP clients and they were absolutely thrilled. Top tier luxury and no detail was overlooked.",
      },
    ],
    faqs: [
      {
        question: "Can we request a specific vehicle?",
        answer:
          "Yes, you may request models like the Mercedes S-Class or Toyota Alphard. We guarantee that exact class or higher depending on availability.",
      },
      {
        question: "Are airport transfers included?",
        answer:
          "This package can easily substitute the start or end point of the 8 hours with an airport transfer.",
      },
    ],
  },
];
