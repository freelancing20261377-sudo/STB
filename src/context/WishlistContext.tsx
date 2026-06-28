import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "stb_tour_wishlist";
const SEEN_KEY = "stb_wishlist_seen_ids";

interface WishlistContextType {
  wishlist: string[];
  isWishlisted: (tourId: string) => boolean;
  toggleWishlist: (tourId: string) => void;
  addToWishlist: (tourId: string) => void;
  removeFromWishlist: (tourId: string) => void;
  clearWishlist: () => void;
  count: number;
  /** Number of items added since the wishlist page was last visited */
  unreadCount: number;
  /** Call this when the user lands on the Wishlist page to clear the badge */
  markAllSeen: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(() =>
    loadFromStorage<string[]>(STORAGE_KEY, [])
  );

  // seenIds = IDs the user has already "seen" by visiting the Wishlist page
  const [seenIds, setSeenIds] = useState<string[]>(() =>
    loadFromStorage<string[]>(SEEN_KEY, [])
  );

  // Persist wishlist changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  // Persist seen IDs changes
  useEffect(() => {
    localStorage.setItem(SEEN_KEY, JSON.stringify(seenIds));
  }, [seenIds]);

  const isWishlisted = useCallback(
    (tourId: string) => wishlist.includes(tourId),
    [wishlist]
  );

  const addToWishlist = useCallback((tourId: string) => {
    setWishlist((prev) => (prev.includes(tourId) ? prev : [...prev, tourId]));
    // NOTE: Do NOT add to seenIds here — new additions stay "unread"
  }, []);

  const removeFromWishlist = useCallback((tourId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== tourId));
    // Clean up from seenIds too so counts stay consistent
    setSeenIds((prev) => prev.filter((id) => id !== tourId));
  }, []);

  const toggleWishlist = useCallback((tourId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(tourId)
        ? prev.filter((id) => id !== tourId)
        : [...prev, tourId];

      // If we're removing, also remove from seenIds
      if (prev.includes(tourId)) {
        setSeenIds((s) => s.filter((id) => id !== tourId));
      }
      // If adding, do NOT add to seenIds — the new item should appear as unread
      return next;
    });
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    setSeenIds([]);
  }, []);

  /** Mark every currently-wishlisted item as seen. Called when the wishlist page mounts. */
  const markAllSeen = useCallback(() => {
    setSeenIds((prev) => {
      const merged = Array.from(new Set([...prev, ...wishlist]));
      return merged;
    });
  }, [wishlist]);

  // unreadCount = items in wishlist that are NOT yet in seenIds
  const unreadCount = wishlist.filter((id) => !seenIds.includes(id)).length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isWishlisted,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        count: wishlist.length,
        unreadCount,
        markAllSeen,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
