import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  Star,
  MapPin,
  CheckCircle,
  XCircle,
  ChevronRight,
  MessageCircle,
  Calendar,
  Heart,
} from "lucide-react";
import { tours } from "../data/tours";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import axios from "axios";
import ImageWithFallback from "../components/ImageWithFallback";
import SignInPromptModal from "../components/SignInPromptModal";

export default function TourDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const tour = tours.find((t) => t.slug === slug);

  const handleWishlistClick = () => {
    if (!user) {
      if (tour) localStorage.setItem("pendingWishlistTourId", tour.id);
      setShowSignInModal(true);
      return;
    }
    if (tour) toggleWishlist(tour.id);
  };

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Tour Not Found
        </h1>
        <p className="text-slate-600 mb-8 text-center max-w-md">
          We couldn't find the tour you're looking for. It might have been
          removed or the URL is incorrect.
        </p>
        <Link
          to="/"
          className="bg-[#0058BE] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#004a9e] transition shadow-lg hover:shadow-xl"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const relatedTours = tours.filter((t) => t.slug !== slug).slice(0, 3);

  const handleBookNow = async () => {
    const searchParams = {
      bookingType: "tour",
      tourSlug: tour.slug,
      pickup: "Hotel Pickup",
      destination: "Return to Hotel",
      date: new Date().toISOString(),
      time: "10:00",
      passengers: 1,
      duration: 1,
    };

    sessionStorage.setItem(
      "bookingSearch",
      JSON.stringify({
        searchParams,
        results: [
          {
            id: tour.slug,
            name: tour.title,
            type: "Private Tour Package",
            capacity: 4,
            luggage: 2,
            estimatedTotal: parseInt(tour.price.replace("SGD ", "")),
            image: tour.heroImage,
          },
        ],
      }),
    );

    if (!user) {
      let sessionId = localStorage.getItem("guestSessionId");
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15);
        localStorage.setItem("guestSessionId", sessionId);
      }
      await axios
        .post("/api/booking-drafts", { sessionId, searchParams })
        .catch(() => {});
      navigate("/login", { state: { returnTo: "/customer/new-booking" } });
    } else {
      navigate("/customer/new-booking");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header Spacer / Navbar Placeholder */}
      <div className="bg-white sticky top-0 z-50 border-b border-gray-100 px-4 md:px-10 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-bold text-xl text-[#0058BE] tracking-tight"
        >
          STB Experiences
        </Link>
        <Link
          to="/"
          className="text-sm font-semibold text-slate-600 hover:text-slate-900 bg-gray-100 px-4 py-2 rounded-full transition"
        >
          Back to All Tours
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-60 mix-blend-overlay">
          <ImageWithFallback
            src={tour.heroImage}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                  Bestseller
                </span>
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white text-sm ml-2 font-medium">
                    5.0 ({tour.reviews.length} Reviews)
                  </span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {tour.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
                {tour.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <button
                  onClick={handleBookNow}
                  className="bg-[#0058BE] hover:bg-[#004a9e] text-white px-8 py-4 rounded-xl font-bold text-sm md:text-base flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Book This Experience
                </button>
                <button
                  onClick={() => alert("Opening WhatsApp...")}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </button>
                {/* Wishlist toggle */}
                <button
                  onClick={handleWishlistClick}
                  title={tour && isWishlisted(tour.id) ? "Remove from wishlist" : "Save to wishlist"}
                  className={`flex items-center gap-2 px-5 py-4 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 border ${
                    tour && isWishlisted(tour.id)
                      ? "bg-rose-500 border-rose-500 text-white hover:bg-rose-600"
                      : "bg-white/10 border-white/30 text-white hover:bg-white/20"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      tour && isWishlisted(tour.id) ? "fill-white" : ""
                    }`}
                  />
                  {tour && isWishlisted(tour.id) ? "Wishlisted" : "Save"}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                Tour Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {tour.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="bg-blue-50 p-3 rounded-full mb-3 text-[#0058BE]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                    Duration
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    {tour.duration}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="bg-orange-50 p-3 rounded-full mb-3 text-orange-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                    Location
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    Singapore
                  </span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="bg-green-50 p-3 rounded-full mb-3 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                    Confirmation
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    Instant
                  </span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="bg-purple-50 p-3 rounded-full mb-3 text-purple-600">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                    Cancellation
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    Free 24h Prior
                  </span>
                </div>
              </div>
            </motion.section>

            {/* Highlights */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Experience Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="bg-orange-100 text-orange-600 p-1 rounded mt-0.5">
                      <Star className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-slate-700">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Itinerary Timeline */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Detailed Itinerary
              </h2>
              <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
                {tour.itinerary.map((step, index) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute w-4 h-4 bg-[#0058BE] rounded-full -left-[9px] top-1.5 ring-4 ring-blue-50"></div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <span className="text-sm font-bold text-[#0058BE] bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap">
                          {step.time}
                        </span>
                        <h4 className="text-lg font-bold text-slate-800">
                          {step.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Included / Excluded Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" /> What's
                  Included
                </h3>
                <ul className="space-y-4">
                  {tour.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" /> What's Not
                  Included
                </h3>
                <ul className="space-y-4">
                  {tour.excluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* Reviews */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Customer Reviews
              </h2>
              <div className="space-y-6">
                {tour.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-slate-800">
                          {review.author}
                        </h4>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* FAQs */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {tour.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  >
                    <h4 className="font-bold text-slate-800 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-end mb-6 pb-6 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Starting from
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-[#0058BE]">
                          {tour.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span>Duration</span>
                      </div>
                      <span className="font-semibold text-slate-900">
                        {tour.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span>Ratings</span>
                      </div>
                      <span className="font-semibold text-slate-900">
                        5.0 / 5
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleBookNow}
                    className="w-full bg-[#0058BE] hover:bg-[#004a9e] text-white font-bold py-4 rounded-xl transition shadow-md hover:shadow-lg mb-4"
                  >
                    Book Now
                  </button>
                  <button className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-4 rounded-xl transition">
                    Contact Agent
                  </button>

                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-green-500" /> No hidden
                    fees • Secure booking
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tours Section */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                You might also like
              </h2>
              <p className="text-gray-600 mt-2">
                Discover other top-rated experiences
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTours.map((t, i) => (
              <motion.div
                key={t.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
                onClick={() => navigate(`/tours/${t.slug}`)}
              >
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={t.coverImage || t.heroImage}
                    alt={t.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    {t.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {t.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-[#0058BE]">{t.price}</span>
                    <span className="text-slate-900 flex items-center hover:text-[#0058BE] transition">
                      View Details <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-in prompt modal for wishlist */}
      <SignInPromptModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        tourTitle={tour?.title}
      />
    </div>
  );
}
