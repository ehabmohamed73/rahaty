import React, { useState } from "react";
import { X, MapPin, ChevronDown, Maximize2 } from "lucide-react";

export default function AddAddressModal({ isOpen, onClose, onSave }) {
  const [isDefault, setIsDefault] = useState(true);
  const [formData, setFormData] = useState({
    addressName: "",
    region: "",
    city: "",
    citySelect: "",
    neighborhood: "",
    buildingNumber: "",
    streetName: "",
    detailedAddress: "",
    fullAddress: "",
  });

  const handleSubmit = () => {
    // هنا يمكنك إضافة التحقق من البيانات
    if (onSave) {
      onSave(formData);
    }
  };

  // إذا لم يكن البوب اب مفتوحاً، لا نعرض anything
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-30 sm:top-16 inset-0 bg-transparent   flex items-center justify-center p-4 z-50"
      dir="rtl"
    >
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl">
        {/* الهيدر */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">إضافة عنوان جديد</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* النموذج - الجانب الأيمن */}
            <div className="p-6 lg:p-8 order-1 lg:order-1">
              <div className="space-y-6">
                {/* اسم العنوان */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                    اسم العنوان
                  </label>
                  <input
                    type="text"
                    value={formData.addressName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        addressName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* المنطقة والمدينة */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                      المنطقة
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option>{formData.city}</option>
                      </select>
                      <ChevronDown
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={20}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                      المدينة
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option>{formData.citySelect}</option>
                      </select>
                      <ChevronDown
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={20}
                      />
                    </div>
                  </div>
                </div>

                {/* الحي */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                    الحي
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option>{formData.neighborhood}</option>
                    </select>
                    <ChevronDown
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>

                {/* رقم المبنى واسم الشارع */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                      اسم الشارع
                    </label>
                    <input
                      type="text"
                      placeholder="الفصيلية"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                      رقم المبنى
                    </label>
                    <input
                      type="text"
                      placeholder="رقم المبنى"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* العنوان كامل */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                    العنوان كامل
                  </label>
                  <textarea
                    value={formData.fullAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullAddress: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* الخريطة - الجانب الأيسر */}
            <div className="bg-gray-100 p-4 lg:p-6 order-2 lg:order-2">
              <div className="relative w-full h-[400px] lg:h-full bg-gray-200 rounded-lg overflow-hidden">
                {/* الخريطة المدمجة من Google Maps */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3573.123456789!2d49.5677!3d25.3611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDIxJzQwLjAiTiA0OcKwMzQnMDMuNyJF!5e0!3m2!1sen!2ssa!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>

                {/* أزرار التحكم فوق الخريطة */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md flex overflow-hidden">
                  <button className="px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50">
                    Satellite
                  </button>
                  <button className="px-4 py-2 bg-white text-gray-900 font-semibold border-r">
                    MAP
                  </button>
                </div>

                {/* زر ملء الشاشة */}
                <button className="absolute top-4 right-4 bg-white p-2 rounded shadow-md hover:bg-gray-50">
                  <Maximize2 size={20} className="text-gray-600" />
                </button>

                {/* أيقونة الموقع في المنتصف */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
                  <MapPin
                    size={48}
                    className="text-red-600 fill-red-600 drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الفوتر */}
        <div className="border-t p-6 flex items-center justify-between bg-gray-50">
          <button
            onClick={handleSubmit}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-12 rounded-lg transition"
          >
            حفظ العنوان
          </button>

          <div className="flex items-center gap-3">
            <label className="text-gray-700 font-semibold cursor-pointer">
              جعل هذا العنوان الافتراضي
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 rounded-full transition ${
                  isDefault ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    isDefault ? "right-0.5" : "right-5"
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
