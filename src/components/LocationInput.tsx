import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (lat: number, lon: number, address: string) => void;
  placeholder?: string;
  required?: boolean;
}

interface OsmResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
}

export default function LocationInput({
  value,
  onChange,
  onSelect,
  placeholder = "Search anywhere in Singapore",
  required = false,
}: LocationInputProps) {
  const [results, setResults] = useState<OsmResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!value || value.length < 3) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Restricting search to Singapore using countrycodes=sg
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: value,
              format: "json",
              countrycodes: "sg",
              limit: 5,
              addressdetails: 1,
            },
          },
        );
        setResults(response.data);
      } catch (error) {
        console.error("OSM search error", error);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [value]);

  const handleSelect = (result: OsmResult) => {
    onChange(result.display_name);
    setShowResults(false);
    if (onSelect) {
      onSelect(
        parseFloat(result.lat),
        parseFloat(result.lon),
        result.display_name,
      );
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowResults(true);
        }}
        onFocus={() => {
          if (value.length >= 3) setShowResults(true);
        }}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary bg-white"
        placeholder={placeholder}
      />
      {showResults && (results.length > 0 || isLoading) && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
          {isLoading ? (
            <li className="px-4 py-3 text-sm text-gray-500 text-center">
              Searching...
            </li>
          ) : (
            results.map((result) => (
              <li
                key={result.place_id}
                onClick={() => handleSelect(result)}
                className="px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 truncate"
              >
                {result.display_name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
