import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("previous");

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* العنوان الرئيسي */}
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-right">
          المواعيد
        </h1>

        {/* التبويبات */}
        <div className="bg-gray-200 rounded-lg p-1 flex mb-8 max-w-md m-auto">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
              activeTab === "upcoming"
                ? "bg-white text-blue-900 shadow"
                : "text-gray-600 hover:text-blue-900"
            }`}
          >
            القادمة
          </button>
          <button
            onClick={() => setActiveTab("previous")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
              activeTab === "previous"
                ? "bg-white text-blue-900 shadow"
                : "text-gray-600 hover:text-blue-900"
            }`}
          >
            السابقة
          </button>
        </div>

        {/* محتوى الصفحة - حالة فارغة */}
        <div className="flex flex-col items-center justify-center py-16">
          {/* أيقونة التقويم */}
          <div className="relative mb-8">
            <Calendar className="text-gray-300" size={120} strokeWidth={1.5} />
            <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg">
              <Clock className="text-gray-400" size={40} strokeWidth={1.5} />
            </div>
          </div>

          {/* النص */}
          <div className="text-center space-y-2 mb-8">
            <p className="text-blue-400 text-lg font-semibold">
              لايوجد مواعيد حاليا،
            </p>
            <p className="text-blue-400 text-lg font-semibold">
              تصفح خدماتنا و اطلب
            </p>
            <p className="text-blue-400 text-lg font-semibold">الآن</p>
          </div>

          {/* زر احجز الآن */}
          <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-12 rounded-full shadow-lg transition transform hover:scale-105">
            احجز الآن
          </button>
        </div>
      </div>
    </>
  );
}
