import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { User, ChevronDown, CalendarDays, Check } from "lucide-react";
import TopNavbar from "../Nav/TopNavbar";
import { useNavigate } from "react-router-dom";
import CustomLine from "../Elements/CustomLine";
export default function BookingMonthly() {
  // ============================
  // STATES
  // ============================

  const [cityLocation, setCityLocation] = useState("");
  const [selectedContract, setSelectedContract] = useState("");
  const [selectedStaffName, setSelectedStaffName] = useState("");
  const [selectedStaff, setSelectedStaff] = useState();
  const [selectedService, setSelectedService] = useState("");
  const [today, setToday] = useState("");
  const [endDate, setEndDate] = useState("");
  const city = ["حلب", "دمشق", "درعا", "القنيطرة", "اللاذقية"];

  const contractOptions = [
    "شهر واحد",
    "3 أشهر",
    "6 أشهر",
    "سنة واحدة",
    "سنتين",
  ];
  const staffMembers = [
    {
      id: 1,
      name: "Loice Mulongo Sali",
      age: 32,
      experience: "3 سنة",
    },
    {
      id: 2,
      name: "Anitah Ainembabazi",
      age: 27,
      experience: "1 سنة",
    },
    {
      id: 3,
      name: "Nabette Hadijjah",
      age: 30,
      experience: "1 سنة",
    },
    {
      id: 4,
      name: "Grace Namuhiro",
      age: 31,
      experience: "3 سنة",
    },
    {
      id: 5,
      name: "Grace Namuhiro",
      age: 31,
      experience: "3 سنة",
    },
    {
      id: 6,
      name: "Grace Namuhiro",
      age: 31,
      experience: "3 سنة",
    },
  ];
  const navigate = useNavigate();

  // ============================
  // CALCULATE END DATE
  // ============================
  const calculateEndDate = (start, contractType) => {
    if (!start || !contractType) return "";

    const startDateObj = new Date(start);
    const endDateObj = new Date(startDateObj);

    switch (contractType) {
      case "شهر واحد":
        endDateObj.setMonth(endDateObj.getMonth() + 1);
        break;
      case "3 أشهر":
        endDateObj.setMonth(endDateObj.getMonth() + 3);
        break;
      case "6 أشهر":
        endDateObj.setMonth(endDateObj.getMonth() + 6);
        break;
      case "سنة واحدة":
        endDateObj.setFullYear(endDateObj.getFullYear() + 1);
        break;
      case "سنتين":
        endDateObj.setFullYear(endDateObj.getFullYear() + 2);
        break;
      default:
        return "";
    }

    return endDateObj.toISOString().split("T")[0];
  };
  // حساب تاريخ الانتهاء عند تغيير تاريخ البدء أو مدة العقد
  useEffect(() => {
    if (today && selectedContract) {
      const calculatedEndDate = calculateEndDate(today, selectedContract);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEndDate(calculatedEndDate);
    }
  }, [today, selectedContract]);

  // ============================
  // SCROLL TO TOP ON MOUNT
  // ============================

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const now = new Date().toISOString().split("T")[0];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(now);
  }, []);
  //   const toggleStaff = (id) => {
  //     setSelectedStaff((prev) =>
  //       prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
  //     );
  //   };
  const toggleStaff = (id, name) => {
    setSelectedStaff((prev) => (prev === id ? null : id));
    setSelectedStaffName(name);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 mt-20" dir="rtl">
      {/* ============================ HEADER ============================ */}
      <TopNavbar />

      {/* ============================ STEPS / TITLE BAR ============================ */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center bg-white border-b border-gray-200 p-4">
        {/* Title: hidden on xs, visible on sm+ */}
        <h1 className="hidden sm:block text-2xl font-bold text-blue-900 ml-8 text-center md:text-right">
          خدمات التنظيف الشهريه
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
            <span className="text-gray-400">التنظيف بالشهر</span>
            <span className="text-gray-300">←</span>
            <span className="text-gray-400">إنشاء زيارة جديدة</span>
          </div>
        </div>
      </div>

      {/* ============================ MAIN GRID ============================ */}
      <div className="max-w-7xl mx-auto px-2 py-8 md:px-4">
        {/* تغيير هنا: استخدام grid-cols-3 مع نسب مختلفة */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* ============================ COLUMN 1 (MIDDLE OPTIONS) - أكبر عمود ============================ */}
          <div className="lg:col-span-2 space-y-4">
            {" "}
            {/* تغيير هنا: col-span-2 */}
            <div className="bg-white rounded-lg shadow-sm p-6 w-full">
              {/* اختيار الموقع و العقد */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <CustomDropdown
                  value={cityLocation}
                  onChange={setCityLocation}
                  options={city}
                  placeholder="المدينة"
                  name="city"
                />
                <CustomDropdown
                  value={selectedContract}
                  onChange={setSelectedContract}
                  options={contractOptions}
                  placeholder="العقد"
                  name="contract"
                />

                <div className="relative">
                  <input
                    disabled
                    type="date"
                    defaultValue={today}
                    className="w-full text-[10px] sm:text-1sm px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex gap-4 mb-6 border-b">
                <button
                  onClick={() => setSelectedService("cleaning")}
                  className={`py-3 rounded-lg  ${
                    selectedService === "cleaning"
                      ? "px-4 py-2 text-sm font-medium border text-gray-500 hover:text-gray-700"
                      : "px-4 py-2 text-sm font-medium"
                  }`}
                >
                  منظف
                </button>
                <button
                  onClick={() => setSelectedService("cooking")}
                  className={`py-3 rounded-lg  ${
                    selectedService === "cooking"
                      ? "px-4 py-2 text-sm border font-medium text-gray-500 hover:text-gray-700 bg"
                      : "px-4 py-2 text-sm font-medium"
                  }`}
                >
                  الطبخ
                </button>
                <button
                  onClick={() => setSelectedService("kidcare")}
                  className={`py-3 rounded-lg  ${
                    selectedService === "kidcare"
                      ? "px-4 py-2 border text-sm font-medium text-gray-500 hover:text-gray-700"
                      : "px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                  }`}
                >
                  العناية بالاطفال
                </button>
              </div>
              {cityLocation && (
                <div className="grid grid-cols-1 md:grid-cols-1 h-71 overflow-auto gap-4">
                  {staffMembers.map((staff) => (
                    <div key={staff.id} className="p-2 w-full">
                      <div className="flex items-center justify-between">
                        {/* chake box start */}
                        <button
                          onClick={() => toggleStaff(staff.id, staff.name)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            selectedStaff == staff.id
                              ? "bg-yellow-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {selectedStaff == staff.id && (
                            <span className="text-white text-sm">✓</span>
                          )}
                        </button>
                        {/* chake box end */}

                        {/* name and age image start */}
                        <div className="flex items-center gap-4 flex-1 mr-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-900" />
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-800">
                              {staff.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              سنة {staff.age}
                            </div>
                          </div>
                        </div>
                        {/* name and age image end */}
                        <div className="text-right space-y-2">
                          <div>
                            <div className="text-xs text-gray-500">الخبرة</div>
                            <div className="text-sm font-medium">
                              {staff.experience}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2  text-right mr-4">
                          <button className="text-sm text-orange-500 hover:text-orange-600">
                            تفاصيل اكثر
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ============================ COLUMN 2 (SUMMARY) - عمود أصغر ============================ */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
            <h3 className="font-bold mb-4">ملخص الطلب</h3>
            <div className="p-4 bg-lightGray mb-6">
              <label htmlFor="idcard" className="text-xs ">
                *رقم الهويه
              </label>
              <input
                type="text"
                name="idcard"
                id="idcard"
                className=" rounded bg-white w-full py-1 px-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              />
              {selectedStaff && (
                <>
                  <CustomLine icon={CalendarDays} text={selectedContract} />
                  <CustomLine icon={User} text={selectedStaffName} />
                  <CustomLine icon={Check} text={today} />
                  <CustomLine icon={Check} text={endDate} />
                </>
              )}
            </div>
            <div className="h-px bg-primary mt-2"></div>
            <div className="flex justify-between mx-1 items-center my-2">
              <h5 className="font-bold">الاجمالي</h5>
              <span className="text-warning"> 2000 ريال</span>
            </div>
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

const CustomDropdown = ({ value, onChange, options, placeholder, name }) => {
  const dropdownRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const isOpen = openDropdown === name;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={name === openDropdown ? dropdownRef : null}>
      <button
        type="button"
        onClick={() => setOpenDropdown(isOpen ? null : name)}
        className="w-full px-4 py-2.5 text-[10px] sm:text-1sm border border-gray-300 rounded-lg bg-white text-right flex items-center justify-between hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || placeholder}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onChange(option);
                setOpenDropdown(null);
              }}
              className={`w-full px-4 py-2.5 text-right hover:bg-blue-50 transition-colors ${
                value === option
                  ? "bg-blue-50 text-blue-900 font-medium"
                  : "text-gray-700"
              } ${
                index !== options.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
