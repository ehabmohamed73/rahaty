import { useState } from "react";
import { Smartphone, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ConfirmPhonePage() {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d+]/g, "");
    setPhone(value);
    setError("");
  };

  const validateSyrianPhone = () => {
    let cleaned = phone.replace(/\D/g, "");

    if (cleaned.startsWith("963")) {
      cleaned = "0" + cleaned.slice(3);
    } else if (cleaned.startsWith("9") && cleaned.length === 9) {
      cleaned = "0" + cleaned;
    }

    const syrianPhoneRegex = /^09\d{8}$/;

    if (!syrianPhoneRegex.test(cleaned)) {
      setError("الرجاء إدخال رقم جوال سوري صحيح (يبدأ بـ 09 ويكون 10 أرقام)");
      return false;
    }

    setPhone(cleaned);
    return true;
  };

  const handleSubmit = async () => {
    if (!validateSyrianPhone()) return;

    setIsLoading(true);
    setError("");

    try {
      // محاكاة API
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Phone:", phone);

      navigate("/otp");
    } catch (err) {
      setError("حدث خطأ أثناء التسجيل. حاول مرة أخرى");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm"
      dir="rtl"
    >
      {/* زر الرجوع */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 z-50"
      >
        <ArrowRight className="w-5 h-5 text-gray-800" />
      </button>

      <div
        className="
          w-full
          md:max-w-md
          bg-white/95
          backdrop-blur-sm
          space-y-8
          p-6
          border border-white/20
          shadow-2xl
          rounded-t-3xl md:rounded-3xl
          animate-[slideUp_0.4s_ease-out]
          md:animate-none
        "
      >
        {/* العنوان */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <Smartphone className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">تسجيل الدخول</h1>

          <p className="text-gray-600">أدخل رقم الجوال للمتابعه</p>
        </div>

        {/* الحقول */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              رقم الجوال
            </label>

            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                onKeyPress={handleKeyPress}
                placeholder="09XX XXX XXX"
                className={`w-full px-10 py-4 pr-12 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                  error
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                }`}
                disabled={isLoading}
                dir="ltr"
              />

              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Smartphone className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <p className="text-xs text-gray-500">الرقم يجب أن يبدأ بـ 09</p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>جاري التسجيل...</span>
              </>
            ) : (
              <>
                <span>متابعة</span>
                <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* الفوتر */}
        <div className="pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            بالمتابعة أنت توافق على{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              الشروط والأحكام
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
