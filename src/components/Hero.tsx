import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import { motion, AnimatePresence } from "motion/react";
import ImageWithFallback from "./ImageWithFallback";

const slides = [
  {
    image: "/never.avif",
    text: "Experience Singapore like never before.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=2000",
    text: "Discover the magic of Gardens by the Bay.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&q=80&w=2000",
    text: "Iconic views from Marina Bay Sands.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542640244-7e672d6cb466?auto=format&fit=crop&q=80&w=2000",
    text: "Immerse yourself in nature's beauty.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1574227492706-f65b24c3688a?auto=format&fit=crop&q=80&w=2000",
    text: "Explore the vibrant streets of Chinatown.",
  },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("vehicle");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x < -50) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (info.offset.x > 50) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div className="relative font-['Inter'] bg-slate-50 text-gray-800">
      <section className="relative w-full min-h-[100svh] lg:h-[850px] flex items-end md:items-center pt-[120px] pb-[130px] md:pb-[200px] lg:pt-[80px] lg:pb-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
          >
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
              className="w-full h-full pointer-events-none"
            >
              <ImageWithFallback
                alt="Singapore Scenic View"
                className="w-full h-full object-cover object-center"
                src={slides[currentSlide].image}
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-10 md:pt-20 md:-mt-10 pointer-events-none">
          <div className="max-w-4xl text-white mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl sm:text-2xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.3] md:leading-[1.1] lg:leading-[1.05] drop-shadow-lg"
              >
                {slides[currentSlide].text}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-[108px] md:bottom-[240px] lg:bottom-40 left-0 right-0 z-20 flex justify-center gap-3 pointer-events-none">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"}`}
            />
          ))}
        </div>
      </section>

      <section className="relative z-20 -mt-24 lg:-mt-32 pb-20 w-full max-w-7xl mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <BookingWidget activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>
      </section>
    </div>
  );
}
