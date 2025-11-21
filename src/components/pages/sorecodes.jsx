// {
//    <div className="flex flex-col items-center justify-center py-12">
//   <MapPin className="w-24 h-24 text-gray-300 mb-4" />
//   <p className="text-gray-500 text-center">لا توجد أي عناوين مسجلة</p>
//   <button className="mt-6 bg-blue-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition">
//     إضافة عنوان جديد
//   </button>
// </div>;
// }
import { useEffect, useState } from "react";
import TopNavbar from "../Nav/TopNavbar";
import { ChevronDown, User } from "lucide-react";
export default function BookingMonthly() {
  // ============================
  // SCROLL TO TOP ON MOUNT
  // ============================
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("BookingInday mounted");
  }, []);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const city = ["حلب", "دمشق", "درعا", "القنيطرة", "اللاذقية"];
  const staffMembers = [
    {
      id: 1,
      name: "Loice Mulongo Sali",
      age: 32,
      country: "Kenya",
      experience: "3 سنة",
    },
    {
      id: 2,
      name: "Anitah Ainembabazi",
      age: 27,
      country: "Uganda",
      experience: "1 سنة",
    },
    {
      id: 3,
      name: "Nabette Hadijjah",
      age: 30,
      country: "Uganda",
      experience: "1 سنة",
    },
    {
      id: 4,
      name: "Grace Namuhiro",
      age: 31,
      country: "Uganda",
      experience: "3 سنة",
    },
  ];

  const toggleStaff = (id) => {
    setSelectedStaff((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-4">
      {/* ============================ HEADER ============================ */}
      <TopNavbar />

      {/* ============================ STEPS / TITLE BAR ============================ */}
      <div
        style={{ direction: "rtl" }}
        className="flex flex-col sm:flex-row justify-center sm:justify-between items-center bg-white border-b border-gray-200 p-4 mt-30"
      >
        {/* Title: hidden on xs, visible on sm+ */}
        <h1 className="hidden sm:block text-2xl font-bold text-blue-900 ml-8 text-center md:text-right">
          خدمات التنظيف الشهرية
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
            <span className="text-gray-400"> خدمات التنظيف الشهريه</span>
            <span className="text-gray-300">←</span>
            <span className="text-gray-400">إنشاء عقد </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto bg-gray-50 text-right px-6 py-8 ">
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-6">
          {/* Sidebar Form */}
          <div className="lg:col-span-1 ">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6">
                ملخص الطلب
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهوية *
                  </label>
                  <input
                    type="text"
                    className="w-full text-right px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="رقم الهوية"
                  />
                </div>

                <div
                  style={{ direction: "rtl" }}
                  className="flex items-center gap-2 text-sm text-right"
                >
                  <input type="checkbox" id="arrival" className="w-4 h-4" />
                  <label htmlFor="arrival" className="text-gray-700 text-right">
                    إستخدام توصيل بأجر{" "}
                    <span className="text-orange-500">(130)</span>
                  </label>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                      <span className="text-xl font-bold text-gray-800 text-right">
                        SR 50
                      </span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">
                      الإجمالي
                    </span>
                  </div>
                </div>

                <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                  التالي
                </button>
              </div>
            </div>
          </div>

          {/* Staff List */}
          <div dir="rtl" className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Filters */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white">
                    {city.map((c, index) => (
                      <option key={index}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <input
                    list="contractOptions"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-right [&::-webkit-calendar-picker-indicator]:hidden [-webkit-appearance:none] [-moz-appearance:none] appearance-none"
                    placeholder="العقد"
                  />
                  <datalist id="contractOptions">
                    <option value="شهر واحد" />
                    <option value="3 أشهر" />
                    <option value="6 أشهر" />
                    <option value="سنة واحدة" />
                    <option value="سنتين" />
                  </datalist>
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <input
                    type="date"
                    defaultValue="2025-11-21"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-4 mb-6 border-b">
                <button className="px-4 py-2 text-sm font-medium text-blue-900 border-b-2 border-blue-900">
                  متاح
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  الطباخ
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  العناية بالاطفال
                </button>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-4">
                اختر السيرة الذاتية
              </h3>

              {/* Staff Cards */}
              <div className="space-y-4">
                {staffMembers.map((staff) => (
                  <div
                    key={staff.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => toggleStaff(staff.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          selectedStaff.includes(staff.id)
                            ? "bg-yellow-500"
                            : "bg-gray-300"
                        }`}
                      >
                        {selectedStaff.includes(staff.id) && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </button>

                      <div className="flex items-center gap-4 flex-1 mr-4">
                        <div className="text-right">
                          <div className="font-bold text-gray-800">
                            {staff.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            سنة {staff.age}
                          </div>
                        </div>

                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-900" />
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <div>
                          <div className="text-xs text-gray-500">الخبرة</div>
                          <div className="text-sm font-medium">
                            {staff.experience}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">
                            بلد الجنسية
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">
                              {staff.country}
                            </span>
                            <span className="text-lg">
                              {staff.country === "Kenya" ? "🇰🇪" : "🇺🇬"}
                            </span>
                          </div>
                        </div>
                        <button className="text-sm text-orange-500 hover:text-orange-600">
                          تفاصيل اكثر
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
