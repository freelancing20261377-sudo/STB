import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Heart, X, LogIn, UserPlus } from "lucide-react";

interface SignInPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourTitle?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function SignInPromptModal({
  isOpen,
  onClose,
  tourTitle,
  title,
  subtitle,
  icon,
}: SignInPromptModalProps) {
  const location = useLocation();
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden">
              {/* Header gradient */}
              <div className="relative bg-gradient-to-br from-rose-500 to-rose-600 px-8 pt-8 pb-10 text-white text-center">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  {icon || <Heart className="w-8 h-8 fill-white text-white" />}
                </motion.div>

                <h2 className="text-2xl font-bold mb-1">{title || "Save to Wishlist"}</h2>
                <p className="text-rose-100 text-sm">
                  {subtitle || (tourTitle
                    ? `Sign in to save "${tourTitle}"`
                    : "Sign in to save your favourite tours")}
                </p>
              </div>

              {/* Body */}
              <div className="px-8 py-7 space-y-4">
                <p className="text-center text-sm text-gray-500">
                  Create a free account or sign in to save tours to your wishlist
                  and access them any time.
                </p>

                <Link
                  to="/login/customer"
                  state={{ returnTo: location.pathname }}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full bg-[#0058BE] hover:bg-[#004a9e] text-white font-bold py-3.5 rounded-2xl transition-colors shadow-md hover:shadow-lg"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>

                <Link
                  to="/register"
                  state={{ returnTo: location.pathname }}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold py-3.5 rounded-2xl border border-gray-200 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Create Free Account
                </Link>

                <button
                  onClick={onClose}
                  className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
                >
                  Continue browsing without signing in
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
