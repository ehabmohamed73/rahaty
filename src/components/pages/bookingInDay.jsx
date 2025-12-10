import React, { useState, useEffect } from "react";
import { Book, ImageOff, MapPin, Plus } from "lucide-react";
import TopNavbar from "../Nav/TopNavbar";
import BookingCalendar from "../Elements/BookingCalender";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StepBooking from "../Elements/stepBooking";
import AddAddressModal from "../Sections/AddAddress";

export default function BookingInday() {
  // ============================
  // STATES
  // ============================
  const [workers, setWorkers] = useState(1);
  const [visitDuration, setVisitDuration] = useState("morning");
  const [selectedTime, setSelectedTime] = useState("");
  const [visitType, setVisitType] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [mothlyPackage, setMonthlyPackage] = useState("");
  const [hasAddress, setHasAddress] = useState([]);
  const [addressSelected, setAddressSelected] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isSignedIn] = useState(() => {
    return localStorage.getItem("isSignedIn") === "true";
  });
  const [weekDay, setWeekDay] = useState("");
  const navigate = useNavigate();
  const [userId] = useState(() => {
    return localStorage.getItem("userId");
  });
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/address?userId=${userId}`
        );

        if (res.data.success) {
          setHasAddress(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddresses();
  }, [userId]);
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
  /// التحكم في زر المتابعه
  const handelNext = () => {
    visitType === "single" ? handelDayBooking() : handelMonthlyBooking();
  };

  // ============================
  // SCROLL TO TOP ON MOUNT
  // ============================
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("BookingInday mounted");
  }, []);
  // ============================
  // FAKE TOTAL PRICE CALCULATION
  // ============================
  // fake calculation
  const totalPrice = workers * (visitDuration === "morning" ? 150 : 140);

  const handelDayBooking = async () => {
    try {
      const res = await axios.post("http://localhost:3001/booking", {
        user_id: userId,
        address_id: selectedAddress,
        workers: workers,
        visitType: "one_time",
        selectedTime: selectedTime,
        totalPrice: totalPrice,
        oneTimeDate: selectedDates,
        visitDuration:
          visitDuration == "morning" || visitDuration == "evening"
            ? "4_houre"
            : "8_houre",
        period: visitDuration,
      });
      if (res.data.success) {
        navigate("/confirm-payment", {
          state: { bookingId: res.data.booking.id },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handelMonthlyBooking = async () => {
    try {
      const res = await axios.post("http://localhost:3001/booking", {
        user_id: userId,
        address_id: selectedAddress,
        workers: workers,
        visitType: "monthly",
        selectedTime: selectedTime,
        totalPrice: totalPrice,
        monthlyPackage: mothlyPackage,
        selectedDays: [weekDay],
        visitDuration:
          visitDuration == "morning" || visitDuration == "evening"
            ? "4_houre"
            : "8_houre",
        period: visitDuration,
      });
      if (res.data.success) {
        navigate("/confirm-payment", {
          state: { bookingId: res.data.booking.id },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 mt-20" dir="rtl">
      {/* ============================ HEADER ============================ */}
      <TopNavbar />
      <StepBooking text={" التنظيف بالساعة"} />

      {/* ============================ MAIN GRID ============================ */}
      <div className="max-w-7xl mx-auto px-2 py-8 md:px-4">
        {/* 1 column mobile — 3 columns desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* ============================ COLUMN 1 (MIDDLE OPTIONS) ============================ */}
          <div className="space-y-4">
            {/* WORKERS */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">{workers}</span>
                <h3 className="font-bold">عدد العاملات</h3>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setWorkers((prev) => (prev > 1 ? prev - 1 : 1))
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
                    setWorkers((prev) => (prev < 5 ? prev + 1 : prev))
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
                  onClick={() => setVisitDuration("morning")}
                  className={`py-3 rounded-lg border ${
                    visitDuration === "morning"
                      ? "bg-orange-50 border-orange-500 text-orange-600"
                      : "border-gray-300"
                  }`}
                >
                  4 ساعات <br />
                  <span className="text-xs">صباحي</span>
                </button>

                <button
                  onClick={() => setVisitDuration("evening")}
                  className={`py-3 rounded-lg border ${
                    visitDuration === "evening"
                      ? "bg-orange-50 border-orange-500 text-orange-600"
                      : "border-gray-300"
                  }`}
                >
                  4 ساعات <br />
                  <span className="text-xs">مسائي</span>
                </button>

                <button
                  onClick={() => setVisitDuration("full")}
                  className={`py-3 rounded-lg border ${
                    visitDuration === "full"
                      ? "bg-orange-50 border-orange-500 text-orange-600"
                      : "border-gray-300"
                  }`}
                >
                  8 ساعات <br />
                  <span className="text-xs">يوم كامل</span>
                </button>
              </div>
            </div>
            {/* AVAILABLE TIMES */}

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold mb-4">الفترات المتوفرة</h3>
              {visitDuration === "morning" && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedTime("09:00 - 01:00")}
                    className={`py-3 rounded-lg border ${
                      selectedTime === "09:00 - 01:00"
                        ? "bg-orange-50 border-orange-500 text-orange-600"
                        : "border-gray-300"
                    }`}
                  >
                    09:00 - 01:00
                  </button>

                  <button
                    onClick={() => setSelectedTime("02:00 - 06:00")}
                    className={`py-3 rounded-lg border ${
                      selectedTime === "02:00 - 06:00"
                        ? "bg-orange-50 border-orange-500 text-orange-600"
                        : "border-gray-300"
                    }`}
                  >
                    02:00 - 06:00
                  </button>
                </div>
              )}
              {/* الفتره المسائيه */}
              {visitDuration === "evening" && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedTime("06:00 - 10:00")}
                    className={`py-3 rounded-lg border ${
                      selectedTime === "06:00 - 10:00"
                        ? "bg-orange-50 border-orange-500 text-orange-600"
                        : "border-gray-300"
                    }`}
                  >
                    06:00 - 10:00
                  </button>

                  <button
                    onClick={() => setSelectedTime("05:00 - 09:00")}
                    className={`py-3 rounded-lg border ${
                      selectedTime === "05:00 - 09:00"
                        ? "bg-orange-50 border-orange-500 text-orange-600"
                        : "border-gray-300"
                    }`}
                  >
                    05:00 - 09:00
                  </button>
                </div>
              )}
              {visitDuration === "full" && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedTime("09:00 - 06:00")}
                    className={`py-3 rounded-lg border ${
                      selectedTime === "09:00 - 06:00"
                        ? "bg-orange-50 border-orange-500 text-orange-600"
                        : "border-gray-300"
                    }`}
                  >
                    09:00 - 06:00
                  </button>

                  <button
                    onClick={() => setSelectedTime("01:00 - 09:00")}
                    className={`py-3 rounded-lg border ${
                      selectedTime === "01:00 - 09:00"
                        ? "bg-orange-50 border-orange-500 text-orange-600"
                        : "border-gray-300"
                    }`}
                  >
                    01:00 - 09:00
                  </button>
                </div>
              )}
            </div>

            {/* VISIT TYPE */}
            <div className="bg-white rounded-lg shadow-sm p-6">
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
            </div>
          </div>
          {/* ============================ COLUMN 2 (RIGHT SIDE) ============================ */}
          <div className="bg-white rounded-lg shadow-sm h-120">
            {hasAddress.length > 0 &&
              !addressSelected &&
              hasAddress.map((address) => (
                <div
                  onClick={() => {
                    setAddressSelected(true);
                    setSelectedAddress(address.id);
                  }}
                  key={address.id}
                  className=" bg-lightGray rounded-lg p-4 m-4"
                >
                  <div className="flex justify-between items-start ">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {address.addressName}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {address.fullAddress}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            {addressSelected && (
              <div className="space-y-6">
                {/* SELECT ADDRESS */}
                {visitType === "monthly" && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-blue-700 mb-4">
                      نوع الباقه الشهريه
                    </h2>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setMonthlyPackage("economic")}
                        className={`py-3 rounded-lg border ${
                          mothlyPackage === "economic"
                            ? "bg-orange-50 border-orange-500 text-orange-600"
                            : "border-gray-300"
                        }`}
                      >
                        الاقتصاديه <br />
                        <span className="text-[10px]">زياره في الشهر</span>
                      </button>

                      <button
                        onClick={() => setMonthlyPackage("proznic")}
                        className={`py-3 rounded-lg border ${
                          mothlyPackage === "proznic"
                            ? "bg-orange-50 border-orange-500 text-orange-600"
                            : "border-gray-300"
                        }`}
                      >
                        البرونزي
                        <br />
                        <span className="text-[10px]">زيارتين في الشهر</span>
                      </button>

                      <button
                        onClick={() => setMonthlyPackage("selver")}
                        className={`py-3 rounded-lg border ${
                          mothlyPackage === "selver"
                            ? "bg-orange-50 border-orange-500 text-orange-600"
                            : "border-gray-300"
                        }`}
                      >
                        الفضي <br />
                        <span className="text-xs">٣ زيارات في الشهر </span>
                      </button>
                      <button
                        onClick={() => setMonthlyPackage("goolden")}
                        className={`py-3 rounded-lg border ${
                          mothlyPackage === "goolden"
                            ? "bg-orange-50 border-orange-500 text-orange-600"
                            : "border-gray-300"
                        }`}
                      >
                        الذهبي <br />
                        <span className="text-xs">٤ زيارات في الشهر </span>
                      </button>
                    </div>
                    <div className="text-xl font-bold text-orange-500 my-4">
                      اختار اليوم
                    </div>
                    <button
                      onClick={() => setWeekDay("Sunday")}
                      className={`p-3 mb-2 mx-1 text-sm rounded-lg border ${
                        weekDay === "Sunday"
                          ? "bg-orange-50 border-orange-500 text-orange-600"
                          : "border-gray-300"
                      }`}
                    >
                      الاحد <br />
                    </button>
                    <button
                      onClick={() => setWeekDay("Monday")}
                      className={`p-3 mb-2 mx-1 text-sm rounded-lg border ${
                        weekDay === "Monday"
                          ? "bg-orange-50 border-orange-500 text-orange-600"
                          : "border-gray-300"
                      }`}
                    >
                      الاثنين <br />
                    </button>
                    <button
                      onClick={() => setWeekDay("Tuesday")}
                      className={`p-3 mb-2 mx-1 text-sm rounded-lg border ${
                        weekDay === "Tuesday"
                          ? "bg-orange-50 border-orange-500 text-orange-600"
                          : "border-gray-300"
                      }`}
                    >
                      الثلاثاء <br />
                    </button>
                    <button
                      onClick={() => setWeekDay("Wednesday")}
                      className={`p-3 mb-2 mx-1 text-sm rounded-lg border ${
                        weekDay === "Wednesday"
                          ? "bg-orange-50 border-orange-500 text-orange-600"
                          : "border-gray-300"
                      }`}
                    >
                      الاربعاء <br />
                    </button>
                    <button
                      onClick={() => setWeekDay("Thursday")}
                      className={`p-3 mb-2 mx-1 text-sm rounded-lg border ${
                        weekDay === "Thursday"
                          ? "bg-orange-50 border-orange-500 text-orange-600"
                          : "border-gray-300"
                      }`}
                    >
                      الخميس <br />
                    </button>
                    <button
                      onClick={() => setWeekDay("Friday")}
                      className={`p-3 mb-2 mx-1 text-sm rounded-lg border ${
                        weekDay === "Friday"
                          ? "bg-orange-50 border-orange-500 text-orange-600"
                          : "border-gray-300"
                      }`}
                    >
                      الجمعه <br />
                    </button>
                    <button
                      onClick={() => setWeekDay("Saturday")}
                      className={`p-3 mb-2 mx-1 text-sm rounded-lg border ${
                        weekDay === "Saturday"
                          ? "bg-orange-50 border-orange-500 text-orange-600"
                          : "border-gray-300"
                      }`}
                    >
                      السبت <br />
                    </button>
                  </div>
                )}

                {visitType === "single" && (
                  <div className="p-2">
                    <BookingCalendar onSelectDates={setSelectedDates} />
                  </div>
                )}
              </div>
            )}

            {isSignedIn && hasAddress <= 0 && (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <MapPin className="w-24 h-24 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-center">
                    لا توجد أي عناوين مسجلة
                  </p>
                  <button
                    onClick={() => setOpenPopUp(true)}
                    className="mt-6 bg-blue-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition"
                  >
                    إضافة عنوان جديد
                  </button>
                </div>
              </div>
            )}
            {!isSignedIn && hasAddress == 0 && (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <MapPin className="w-24 h-24 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-center">
                    لا توجد أي عناوين مسجلة
                  </p>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
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

              <div className="flex items-center justify-between">
                <span className="text-gray-600">الفترة</span>
                <span>{selectedTime}</span>
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
              onClick={handelNext}
              className="w-full bg-brandBlue text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
            >
              التالي
            </button>
            {/* البوب اب */}
            <AddAddressModal
              isOpen={openPopUp}
              onClose={() => setOpenPopUp(false)}
              // onSave={handleAddAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
