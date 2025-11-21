import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  FileText,
  IdCard,
  Send,
  Upload,
  CheckCircle,
} from "lucide-react";
import bg from "../../assets/img/join-us.jpg";
export default function JoinUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    idNumber: "",
    cvFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({
        ...prev,
        cvFile: file,
      }));
    } else {
      alert("يرجى رفع ملف PDF فقط");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // محاكاة إرسال البيانات
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log("بيانات الطلب:", formData);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        dir="rtl"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            تم إرسال طلبك بنجاح!
          </h2>
          <p className="text-gray-600 mb-2">
            شكراً لك{" "}
            <span className="font-bold text-green-600">{formData.name}</span>{" "}
            على اهتمامك بالانضمام إلينا
          </p>
          <p className="text-sm text-gray-500 mb-6">
            سنقوم بمراجعة طلبك والاتصال بك خلال 3 أيام عمل
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                phone: "",
                email: "",
                idNumber: "",
                cvFile: null,
              });
            }}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-300 shadow-lg"
          >
            تقديم طلب جديد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8"
      dir="rtl"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative max-w-2xl mx-auto px-4">
        {/* الهيدر */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            انضم إلى فريقنا
          </h1>
          <p className="text-white/90 text-lg drop-shadow-md">
            كوني جزءاً من فريق العمل المتميز وابدئي رحلة نجاحك معنا
          </p>
        </div>

        {/* نموذج التسجيل */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* حقل الاسم */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <User className="w-4 h-4 text-blue-600" />
                الاسم الكامل
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full text-black p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white/80"
                placeholder="أدخل اسمك الكامل"
              />
            </div>

            {/* حقل رقم الجوال */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4 text-green-600" />
                رقم الجوال
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 bg-white/80"
                placeholder="05XXXXXXXX"
              />
            </div>

            {/* حقل الإيميل */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 text-purple-600" />
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white/80"
                placeholder="example@email.com"
              />
            </div>

            {/* حقل رقم الهوية */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <IdCard className="w-4 h-4 text-orange-600" />
                رقم الهوية
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 bg-white/80"
                placeholder="10XXXXXXXXXX"
              />
            </div>

            {/* حقل السيرة الذاتية */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText className="w-4 h-4 text-red-600" />
                السيرة الذاتية (PDF)
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition duration-200 hover:border-blue-400 bg-white/80">
                <input
                  type="file"
                  id="cvFile"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
                <label htmlFor="cvFile" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-1">
                    {formData.cvFile
                      ? formData.cvFile.name
                      : "انقر لرفع ملف السيرة الذاتية"}
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF فقط - الحجم الأقصى 5MB
                  </p>
                </label>
              </div>

              {formData.cvFile && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>تم رفع الملف بنجاح</span>
                </div>
              )}
            </div>

            {/* زر الإرسال */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-lg transition duration-300 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  إرسال طلب الانضمام
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
