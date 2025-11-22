import React, { useState } from "react";
import { MapPin, Calendar, GraduationCap, UserRoundPen } from "lucide-react";
import TopNavbar from "../Nav/TopNavbar";
import ListAddress from "../Sections/listAdress";
import AppointmentsPage from "../Sections/Appointments";
export default function ProfilePage() {
  const [choice, setChoice] = useState("address");

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <TopNavbar />
      <div className="mt-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* قسم الملف الشخصي - العمود الأيمن */}
        <div className="lg:col-span-1 bg-white h-112 rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <UserRoundPen size={48} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              تعديل الصفحة الشخصية
            </h3>
          </div>

          {/* قائمة الخيارات */}
          <div className="space-y-2">
            <button
              onClick={() => setChoice("address")}
              className={`w-full flex items-center  p-3 hover:bg-gray-50 rounded-lg transition group
                        ${choice == "address" && "bg-gray-50"} `}
            >
              <MapPin
                className={`text-gray-600 ml-4 group-hover:text-orange-500 ${
                  choice == "address" && "text-orange-500"
                }`}
                size={20}
              />{" "}
              <span
                className={`font-semibold text-gray-700 group-hover:text-orange-500 ${
                  choice == "address" && "text-orange-500"
                }`}
              >
                عناويني
              </span>
            </button>

            <button
              onClick={() => setChoice("appointments")}
              className={`w-full flex items-center  p-3 hover:bg-gray-50 rounded-lg transition group
                        ${choice == "appointments" && "bg-gray-50"} `}
            >
              <Calendar
                className={`text-gray-600 ml-4 group-hover:text-orange-500 ${
                  choice == "appointments" && "text-orange-500"
                }`}
                size={20}
              />{" "}
              <span
                className={`font-semibold text-gray-700 group-hover:text-orange-500 ${
                  choice == "appointments" && "text-orange-500"
                }`}
              >
                المواعيد
              </span>
            </button>

            <button
              onClick={() => setChoice("orders")}
              className={`w-full flex items-center  p-3 hover:bg-gray-50 rounded-lg transition group
                        ${choice == "orders" && "bg-gray-50"} `}
            >
              <Calendar
                className={`text-gray-600 ml-4 group-hover:text-orange-500 ${
                  choice == "orders" && "text-orange-500"
                }`}
                size={20}
              />
              <span
                className={`font-semibold text-gray-700 group-hover:text-orange-500 ${
                  choice == "orders" && "text-orange-500"
                }`}
              >
                طلباتي
              </span>
            </button>

            <button
              onClick={() => setChoice("recipt")}
              className={`w-full flex items-center  p-3 hover:bg-gray-50 rounded-lg transition group
                        ${choice == "recipt" && "bg-gray-50"} `}
            >
              <GraduationCap
                className={`text-gray-600 ml-4 group-hover:text-orange-500 ${
                  choice == "recipt" && "text-orange-500"
                }`}
                size={20}
              />
              <span
                className={`font-semibold text-gray-700 group-hover:text-orange-500 ${
                  choice == "recipt" && "text-orange-500"
                }`}
              >
                فواتيري
              </span>
            </button>
          </div>
        </div>

        {/* قسم العناوين المسجلة - العمود الأيسر */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          {choice == "address" && <ListAddress />}
          {choice == "appointments" && <AppointmentsPage />}
        </div>
      </div>
    </div>
  );
}
