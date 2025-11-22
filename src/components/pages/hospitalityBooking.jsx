import React, { useState, useEffect } from "react";
import { Book, MapPin, Plus } from "lucide-react";
import TopNavbar from "../Nav/TopNavbar";
import BookingCalendar from "../Elements/BookingCalender";
import { useNavigate } from "react-router-dom";
import { eightHours, fourHours, sixHours } from "../constants/staticData";
export default function HospitalityBooking() {
  // ============================
  // STATES
  // ============================
  const [workers, setWorkers] = useState(2);
  const [visitDuration, setVisitDuration] = useState("4hours");
  const [selectedTime, setSelectedTime] = useState("");
  //   const [visitType, setVisitType] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  //   const [mothlyPackage, setMonthlyPackage] = useState("");
  const [hasAddress, setHasAddress] = useState(false);
  const navigate = useNavigate();
  // تنسيق التاريخ المختار
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ============================
  // SCROLL TO TOP ON MOUNT
  // ============================
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(fourHours);
  }, []);
  // ============================
  // FAKE TOTAL PRICE CALCULATION
  // ============================
  // fake calculation
  const totalPrice = workers * (visitDuration === "morning" ? 150 : 140);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 mt-20" dir="rtl">
      {/* ============================ HEADER ============================ */}
      <TopNavbar />
      {/* ============================ STEPS / TITLE BAR ============================ */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center bg-white border-b border-gray-200 p-4">
        {/* Title: hidden on xs, visible on sm+ */}
        <h1 className="hidden sm:block text-3xl font-bold text-blue-900 ml-8 text-center md:text-right">
          خدمات الضيافه
        </h1>

        {/* Center steps (keeps centered on mobile too) */}
        <div className="flex items-center justify-center pt-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
              ✓
            </div>
            <span className="text-sm text-green-600 mt-2 font-semibold">
              الباقة
            </span>
          </div>

          <div className="h-1 w-20 bg-gray-300"></div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-semibold">
              2
            </div>
            <span className="text-sm text-gray-500 mt-2">الدفع</span>
          </div>
        </div>

        {/* Breadcrumbs: visible on sm+ */}
        <div className="max-w-7xl mx-8 hidden sm:block rtl">
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="text-blue-900 font-semibold">الرئيسية</span>
            <span className="text-gray-300">←</span>
            <span className="text-gray-400"> الضيافه</span>
            <span className="text-gray-300">←</span>
            <span className="text-gray-400">إنشاء طلب</span>
          </div>
        </div>
      </div>

      {/* ============================ MAIN GRID ============================ */}
      <div className="max-w-7xl mx-auto px-2 py-8 md:px-4">
        {/* 1 column mobile — 3 columns desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* ============================ COLUMN 1 (MIDDLE OPTIONS) ============================ */}
          <div className="space-y-4">
            {/* WORKERS */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">عدد المدبرات</h3>
                <span className="text-gray-600">{workers}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setWorkers((prev) => (prev > 2 ? prev - 1 : 2))
                  }
                  className="flex-1 py-3 border border-gray-300 rounded-lg"
                >
                  -
                </button>

                <div className="flex-1 py-3 border rounded-lg text-center">
                  {workers}
                </div>

                <button
                  onClick={() =>
                    setWorkers((prev) => (prev < 6 ? prev + 1 : prev))
                  }
                  className="flex-1 py-3 border border-gray-300 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
            {/* VISIT DURATION */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold mb-4">مدة الزيارة</h3>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setVisitDuration("4hours")}
                  className={`py-3 rounded-lg border ${
                    visitDuration === "4hours"
                      ? "bg-orange-50 border-orange-500 text-orange-600"
                      : "border-gray-300"
                  }`}
                >
                  4 ساعات <br />
                  <span className="text-xs">ضيافه</span>
                </button>

                <button
                  onClick={() => setVisitDuration("6hours")}
                  className={`py-3 rounded-lg border ${
                    visitDuration === "6hours"
                      ? "bg-orange-50 border-orange-500 text-orange-600"
                      : "border-gray-300"
                  }`}
                >
                  6 ساعات <br />
                  <span className="text-xs">ضيافه</span>
                </button>

                <button
                  onClick={() => setVisitDuration("8hours")}
                  className={`py-3 rounded-lg border ${
                    visitDuration === "8hours"
                      ? "bg-orange-50 border-orange-500 text-orange-600"
                      : "border-gray-300"
                  }`}
                >
                  8 ساعات <br />
                  <span className="text-xs"> ضيافه</span>
                </button>
              </div>
            </div>
            {/* AVAILABLE TIMES */}

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold mb-4">الفترات الزمنيه</h3>
              {visitDuration === "4hours" && (
                <div className="flex flex-wrap gap-2 ">
                  {fourHours.map((hours, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(hours)}
                      className={`py-3 px-2 rounded-lg border ${
                        selectedTime === hours
                          ? "bg-orange-50 border-orange-500 text-orange-600"
                          : "border-gray-300"
                      }`}
                    >
                      {hours}
                    </button>
                  ))}
                </div>
              )}
              {/* الفتره 6 ساعات */}
              {visitDuration === "6hours" && (
                <div className="flex flex-wrap gap-2 ">
                  {sixHours.map((hours, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(hours)}
                      className={`py-3 px-2 rounded-lg border ${
                        selectedTime === hours
                          ? "bg-orange-50 border-orange-500 text-orange-600"
                          : "border-gray-300"
                      }`}
                    >
                      {hours}
                    </button>
                  ))}
                </div>
              )}
              {/* الفتره8 ساعات */}
              {visitDuration === "8hours" && (
                <div className="flex flex-wrap gap-2 ">
                  {eightHours.map((hours, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(hours)}
                      className={`py-3 px-2 rounded-lg border ${
                        selectedTime === hours
                          ? "bg-orange-50 border-orange-500 text-orange-600"
                          : "border-gray-300"
                      }`}
                    >
                      {hours}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* VISIT TYPE */}
            {/* <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold mb-4">عدد الزيارات</h3>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setVisitType("single")}
                  className={`py-3 rounded-lg border-2 ${
                    visitType === "single"
                      ? "bg-orange-50 border-orange-500 text-orange-600"
                      : "border-gray-300"
                  }`}
                >
                  زيارة واحدة
                </button>

                <button
                  onClick={() => setVisitType("monthly")}
                  className={`py-3 rounded-lg border-2 ${
                    visitType === "monthly"
                      ? "bg-orange-50 border-orange-500 text-orange-600"
                      : "border-gray-300"
                  }`}
                >
                  باقات شهرية
                </button>
              </div>
            </div> */}
          </div>
          {/* ============================ COLUMN 2 (RIGHT SIDE) ============================ */}
          <div className="bg-white rounded-lg shadow-sm h-fit">
            {hasAddress && (
              <div className="space-y-6">
                {/* SELECT ADDRESS */}

                <div className="p-2">
                  <BookingCalendar onSelectDates={setSelectedDates} />
                </div>
              </div>
            )}
            {!hasAddress && (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <MapPin className="w-24 h-24 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-center">
                    لا توجد أي عناوين مسجلة
                  </p>
                  <button
                    onClick={() => setHasAddress(true)}
                    className="mt-6 bg-blue-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition"
                  >
                    إضافة عنوان جديد
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* ============================ COLUMN 3 (SUMMARY) ============================ */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
            <h3 className="font-bold mb-4">ملخص الطلب</h3>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center justify-between">
                <span>الإجمالي</span>
                <span className="text-gray-600">{totalPrice} ر.س</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">عدد العاملات</span>
                <span>{workers}</span>
              </div>
            </div>
            {selectedDates.length > 0 && (
              <div className="">
                <div className="flex flex-col items-start ">
                  <div>
                    <p className="text-[12px] text-primary">
                      التواريخ المختارة:
                    </p>
                    {selectedDates.map((date, index) => (
                      <p index={index} className="text-[10px]  text-secondary">
                        {formatDate(date)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={() => navigate("/confirm-payment")}
              className="w-full bg-brandBlue text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
            >
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
