import React, { useState, useEffect } from "react";
import { MessageCirclePlus, ArrowUp } from "lucide-react";
export function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // رقم الواتساب - غيره برقمك
  const whatsappNumber = "966554881035"; // بدون + أو 00
  const whatsappMessage = "مرحباً، أريد الاستفسار عن خدماتكم";

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-7 z-50 flex flex-col gap-3">
      {/* زر الواتساب */}
      <button
        onClick={openWhatsApp}
        className="group relative w-14 h-14 bg-linear-to-br from-green-500 to-green-600 rounded-full shadow-lg hover:shadow-2xl  hover:scale-110 transition-all  flex items-center justify-center"
        aria-label="تواصل عبر واتساب"
      >
        <MessageCirclePlus size={26} className="text-white" />
        <span className="absolute right-16 bg-green-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          تواصل معنا
        </span>
        {/* تأثير النبض */}
        {/* <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span> */}
      </button>

      {/* زر العودة للأعلى */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="group relative w-14 h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
          style={{
            animation: "fadeIn 0.3s ease-out",
          }}
          aria-label="العودة للأعلى"
        >
          <ArrowUp size={24} className="text-white" />
          <span className="absolute right-16 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            للأعلى
          </span>
        </button>
      )}
    </div>
  );
}
