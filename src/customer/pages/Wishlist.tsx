import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Trash2, Clock, ArrowRight, PackageOpen } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { tours } from "../../data/tours";
import ImageWithFallback from "../../components/ImageWithFallback";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist, count, markAllSeen } = useWishlist();
  const wishlisted = tours.filter((t) => wishlist.includes(t.id));

  // Mark all current wishlist items as seen the moment this page mounts
  useEffect(() => {
    markAllSeen();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            My Wishlist
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {count === 0
              ? "No saved tours yet"
              : `${count} tour${count > 1 ? "s" : ""} saved`}
          </p>
        </div>
        {count > 0 && (
          <button
            onClick={clearWishlist}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors px-3 py-2 rounded-xl hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Empty State */}
      <AnimatePresence mode="wait">
        {wishlisted.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-5">
              <PackageOpen className="w-9 h-9 text-rose-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Nothing saved yet
            </h2>
            <p className="text-sm text-gray-500 max-w-sm mb-8">
              Browse our Singapore tour packages and tap the heart icon to save
              your favourites here.
            </p>
            <Link
              to="/#experiences"
              className="inline-flex items-center gap-2 bg-[#0058BE] text-white font-semibold text-sm px-6 py-3 rounded-2xl hover:bg-[#004a9e] transition-colors shadow-md"
            >
              Explore Tours
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            <AnimatePresence>
              {wishlisted.map((tour) => (
                <motion.article
                  key={tour.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={tour.coverImage || tour.heroImage}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Remove button */}
                    <button
                      onClick={() => removeFromWishlist(tour.id)}
                      title="Remove from wishlist"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-rose-500 hover:text-white transition-all group/btn"
                    >
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500 group-hover/btn:fill-white group-hover/btn:text-white transition-colors" />
                    </button>
                    {/* Price badge */}
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {tour.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-gray-900 text-base mb-1 leading-snug">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                      {tour.subtitle}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {tour.duration}
                      </div>
                      <Link
                        to={`/tours/${tour.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0058BE] hover:text-[#004a9e] transition-colors"
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
