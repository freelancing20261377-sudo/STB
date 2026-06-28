import React, { useState } from "react";

export default function ReviewsFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I book a service?",
      answer:
        "You can book directly through our online portal or contact our customer support for assistance.",
    },
    {
      question: "What types of vehicles are available?",
      answer:
        "We offer a diverse fleet ranging from luxury sedans and SUVs to premium minibuses for larger groups.",
    },
    {
      question: "Are the tours customizable?",
      answer:
        "Yes, all our private tours can be customized to suit your preferences and schedule.",
    },
    {
      question: "Do you provide airport transfers?",
      answer:
        "Absolutely. We offer premium airport transfer services with flight tracking and meet & greet.",
    },
  ];

  return (
    <div className="w-full">
      {/* Reviews Section */}
      <section className="pt-24 pb-16 px-4 max-w-[1000px] mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-[#6495ED] text-xs font-semibold tracking-widest uppercase mb-4">
            REVIEWS
          </h3>
          <h2 className="text-[36px] font-medium leading-tight text-[#0B1A3A]">
            What Our Guests Say
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {/* Review Card 1 */}
          <div className="bg-white rounded-[16px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex-1 min-w-[280px]">
            <div className="flex gap-1 text-[#FBBF24] mb-6 text-lg">
              ☆ ☆ ☆ ☆ ☆
            </div>
            <p className="text-[#334155] text-[15px] leading-relaxed mb-8 quote-text">
              "The most professional chauffeur service I've used. The night tour
              was breathtaking and perfectly timed."
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#475569] text-sm reviewer-initials">
                IT
              </div>
              <span className="text-[#475569] text-[10px] uppercase reviewer-role">
                INTERNATIONAL TOURIST
              </span>
            </div>
          </div>

          {/* Review Card 2 */}
          <div className="bg-white rounded-[16px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex-1 min-w-[280px]">
            <div className="flex gap-1 text-[#FBBF24] mb-6 text-lg">
              ☆ ☆ ☆ ☆ ☆
            </div>
            <p className="text-[#334155] text-[15px] leading-relaxed mb-8 quote-text">
              "Traveling with kids is hard, but STB made it effortless. The
              large SUV was immaculate and the driver was so patient."
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#475569] text-sm reviewer-initials">
                FT
              </div>
              <span className="text-[#475569] text-[10px] uppercase reviewer-role">
                FAMILY TRAVELER
              </span>
            </div>
          </div>

          {/* Review Card 3 */}
          <div className="bg-white rounded-[16px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex-1 min-w-[280px]">
            <div className="flex gap-1 text-[#FBBF24] mb-6 text-lg">
              ☆ ☆ ☆ ☆ ☆
            </div>
            <p className="text-[#334155] text-[15px] leading-relaxed mb-8 quote-text">
              "Punctual, reliable, and discreet. Exactly what we need for our
              corporate transfers and visiting executives."
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#475569] text-sm reviewer-initials">
                CT
              </div>
              <span className="text-[#475569] text-[10px] uppercase reviewer-role">
                CORPORATE TRAVELER
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pt-16 pb-24 px-4 max-w-[700px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[36px] font-medium leading-tight text-[#0B1A3A]">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-[#E2E8F0] rounded-[12px] shadow-sm hover:border-[#CBD5E1] transition-colors overflow-hidden"
            >
              <div
                className="p-5 flex justify-between items-center cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-[#1E293B] font-medium text-[15px]">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-[#64748B] transition-transform duration-200 ${openFaqIndex === index ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
              {openFaqIndex === index && (
                <div className="px-5 pb-5 text-[#64748B] text-[14px] leading-relaxed border-t border-[#E2E8F0] pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
