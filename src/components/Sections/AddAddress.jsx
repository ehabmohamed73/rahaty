import React, { useState, useEffect } from "react";
import { X, MapPin, ChevronDown, Maximize2 } from "lucide-react";
import axios from "axios";
import { halabAreas } from "../constants/staticData";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
export default function AddAddressModal({ isOpen, onClose }) {
  const [isDefault, setIsDefault] = useState(true);
  const userId = localStorage.getItem("userId");
  const [latitude, SetLatitude] = useState("");
  const [longitude, setLogitude] = useState("");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCiAEAoO490y5Q2Y-Yuubn0rJ_xo1D09GE",
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      SetLatitude(pos.coords.latitude);
      setLogitude(pos.coords.longitude);
    });
  }, []);

  const [formData, setFormData] = useState({
    addressName: "",
    area: "",
    streetName: "",
    fullAddress: "",
    lat: latitude,
    lang: longitude,
    userId: userId,
  });

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      lat: latitude,
      lang: longitude,
    };
    // هنا يمكنك إضافة التحقق من البيانات
    try {
      const response = await axios.post(
        "http://localhost:3001/address/add-adress",
        payload
      );
      if (response.data.success) {
        // alert(response.data.message);
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // إذا لم يكن البوب اب مفتوحاً، لا نعرض anything
  if (!isOpen) return null;
  if (!isLoaded) return <p>جاري تحميل الخريطة...</p>;
  return (
    <div
      className="fixed top-30 sm:top-16 inset-0 bg-transparent flex items-center justify-center p-2 sm:p-4 z-50"
      dir="rtl"
    >
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-auto flex flex-col shadow-2xl">
        {/* الهيدر */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="texet-sm sm:text-2xl font-bold text-gray-800">
            إضافة عنوان جديد
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* المحتوى الرئيسي */}
        <form>
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
                      placeholder="مثلا:منزل شقه"
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
                        <select
                          value={formData.area}
                          onChange={(e) =>
                            setFormData({ ...formData, area: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          {halabAreas.map((allAreas, index) => (
                            <option key={index} value={allAreas}>
                              {allAreas}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                          size={20}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                        اسم الشارع
                      </label>
                      <input
                        type="text"
                        value={formData.streetName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            streetName: e.target.value,
                          })
                        }
                        placeholder="حلب"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {/* <div>
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
                  </div> */}
                  </div>

                  {/* الحي */}
                  {/* <div>
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
                </div> */}

                  {/* رقم المبنى واسم الشارع */}
                  {/* <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                      اسم الشارع
                    </label>
                    <input
                      type="text"
                      placeholder="حلب"
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
                </div> */}

                  {/* العنوان كامل */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                      اقرب معلم
                    </label>
                    <textarea
                      placeholder="وصف لعنوانك او ملاحظه"
                      value={formData.fullAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fullAddress: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* الخريطة - الجانب الأيسر */}
              <div className="bg-gray-100 p-4 lg:p-6 order-2 lg:order-2">
                <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full bg-gray-200 rounded-lg overflow-hidden">
                  {/* الخريطة المدمجة من Google Maps */}
                  {/* <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3573.123456789!2d49.5677!3d25.3611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDIxJzQwLjAiTiA0OcKwMzQnMDMuNyJF!5e0!3m2!1sen!2ssa!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe> */}

                  {/* أزرار التحكم فوق الخريطة */}

                  {/* زر ملء الشاشة */}
                  {/* <button className="absolute top-4 right-4 bg-white p-2 rounded shadow-md hover:bg-gray-50">
                    <Maximize2 size={20} className="text-gray-600" />
                  </button> */}

                  {/* أيقونة الموقع في المنتصف */}
                  {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
                    <MapPin
                      size={48}
                      className="text-red-600 fill-red-600 drop-shadow-lg"
                    />
                  </div> */}
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={{ lat: latitude, lng: longitude }}
                    zoom={16}
                  >
                    <Marker
                      position={{ lat: latitude, lng: longitude }}
                      draggable={true}
                      onDragEnd={(e) => {
                        const newPos = {
                          lat: e.latLng.lat(),
                          lng: e.latLng.lng(),
                        };
                        setLogitude(newPos.lng);
                        SetLatitude(newPos.lat);

                        console.log("New position:", newPos);
                      }}
                    />
                  </GoogleMap>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* الفوتر */}
        <div className="border-t mb-3 p-2 sm:mb-0 sm:p-6 flex items-center justify-between bg-gray-50">
          <button
            onClick={handleSubmit}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 ms:py-3 px-8 sm:px-12 rounded-lg transition"
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
