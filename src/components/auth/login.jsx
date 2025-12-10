import { useState } from "react";
import { Smartphone, ArrowRight, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FloatingButtons } from "../Buttons/FloatingButton";
import axios from "axios";
export default function PhoneLoginPage() {
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [loginUser, setLoginUser] = useState([]);
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d+]/g, "");
    setPhone(value);
    setError("");
  };

  const handleUserNameChange = (e) => {
    const value = e.target.value.replace(
      /[^a-zA-Z\u0600-\u06FF\u0750-\u077F\s\-']/g
    );
    const limitedValue = value.slice(0, 30);
    setUserName(limitedValue);
    setError("");
  };

  // const validateSyrianPhone = () => {
  //   // إزالة أي شيء غير أرقام
  //   let cleaned = phone.replace(/\D/g, "");

  //   // تحويل الصيغ المختلفة إلى رقم يبدأ بـ 09
  //   if (cleaned.startsWith("963")) {
  //     cleaned = "0" + cleaned.slice(3);
  //   } else if (cleaned.startsWith("9") && cleaned.length === 9) {
  //     cleaned = "0" + cleaned;
  //   }

  //   // التحقق من الصيغة النهائية
  //   const syrianPhoneRegex = /^09\d{8}$/;

  //   if (!syrianPhoneRegex.test(cleaned)) {
  //     setError("الرجاء إدخال رقم جوال سوري صحيح (يبدأ بـ 09 ويكون 10 أرقام)");
  //     return false;
  //   }

  //   setPhone(cleaned);
  //   return true;
  // };

  const validateForm = () => {
    if (username.trim().length < 2) {
      setError("الرجاء إدخال اسم صحيح (على الأقل حرفين)");
      return false;
    }

    // return validateSyrianPhone();
  };

  const handleSubmit = async () => {
    // if (!validateForm()) {
    //   alert("الرجاء التحقق من البيانات المدخلة.");
    //   return;
    // }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        phone: `+${phone}`,
        userName: username,
      });

      // حفظ بيانات المستخدم
      setLoginUser(response.data);

      console.log("Login response:", response.data);
      if (response.data.success) {
        // حفظ بيانات في localStorage
        localStorage.setItem("login", "true");
        localStorage.setItem("username", username);
        localStorage.setItem("userId", response.data.userId);
      } else {
        setError(
          "فشل في تسجيل الدخول. يرجى التحقق من البيانات والمحاولة مرة أخرى."
        );
      }
      // الذهاب لصفحة OTP
      navigate("/otp", { state: { phoneNumber: phone } });
    } catch (error) {
      console.error("Login error:", error);
      setError("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413')",
      }}
      dir="rtl"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 z-20 hover:shadow-xl"
        aria-label="العودة للصفحة السابقة"
      >
        <ArrowRight className="w-5 h-5 text-gray-800" />
      </button>

      <div className="w-full max-w-md m-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl space-y-8 p-6 border border-white/20">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">تسجيل الدخول</h1>
            <p className="text-gray-600">أدخل بياناتك للمتابعة</p>
          </div>

          {/* Form */}
          <form>
            <div className="space-y-6">
              {/* Username Field */}
              <div className="space-y-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  الاسم الكريم
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUserNameChange}
                    onKeyPress={handleKeyPress}
                    placeholder="أدخل اسمك الكامل"
                    className={`w-full px-4 py-4 pr-12 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                      error && username.length < 2
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    dir="rtl"
                    disabled={isLoading}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>يسمح بحروف عربية وإنجليزية فقط</span>
                  <span>{username.length}/30</span>
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  رقم الجوال
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    onKeyPress={handleKeyPress}
                    placeholder="09XX XXX XXX"
                    className={`w-full px-10 py-4 pr-12 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                      error && phone.length < 10
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
                <div className="text-xs text-gray-500">
                  أدخل رقم الجوال السوري (يبدأ بـ 09)
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 text-center">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
          </form>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              بالمتابعة، أنت توافق على{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                الشروط والأحكام
              </a>
            </p>
          </div>
        </div>
      </div>

      <FloatingButtons />
    </div>
  );
}
