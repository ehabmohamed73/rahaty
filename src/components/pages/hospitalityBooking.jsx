import React, { useState, useEffect } from "react";
import { Book, MapPin, Plus } from "lucide-react";
import TopNavbar from "../Nav/TopNavbar";
import BookingCalendar from "../Elements/BookingCalender";
import { useNavigate } from "react-router-dom";
import { eightHours, fourHours, sixHours } from "../constants/staticData";
import AddAddressModal from "../Sections/AddAddress";
import axios from "axios";
import StepBooking from "../Elements/stepBooking";
export default function HospitalityBooking() {
  // ============================
  // STATES
  // ============================
  const [userId] = useState(() => {
    return localStorage.getItem("userId");
  });
  const [isSignedIn] = useState(() => {
    return localStorage.getItem("isSignedIn") === "true";
  });
  const [openPopUp, setOpenPopUp] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [workers, setWorkers] = useState(2);
  const [visitDuration, setVisitDuration] = useState("4hours");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [hasAddress, setHasAddress] = useState([]);
  const [addressSelected, setAddressSelected] = useState(false);
  const navigate = useNavigate();
  /// جلب العناوين المسجه
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
  const totalPrice = workers * (visitDuration === "morning" ? 150 : 140);

  //// اضافه الحجز
  const handelSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3001/booking", {
        user_id: userId,
        address_id: selectedAddress,
        workers: workers,
        visitType: "hospitality",
        selectedTime: selectedTime,
        totalPrice: totalPrice,
        oneTimeDate: selectedDates,
        visitDuration: visitDuration,
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
      <StepBooking text={"خدمه الضيافه"} />
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

                <div className="p-2">
                  <BookingCalendar onSelectDates={setSelectedDates} />
                </div>
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
              onClick={handelSubmit}
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
