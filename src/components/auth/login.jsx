import { useState } from "react";
import { Smartphone, ArrowRight, Check } from "lucide-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FloatingButtons } from "../Buttons/FloatingButton";
export default function PhoneLoginPage() {
  const [phone, setPhone] = useState("");
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d+]/g, "");
    setPhone(value);
    setError("");
  };

  const handleSubmit = () => {
    if (phone.length < 10) {
      setError("الرجاء إدخال رقم جوال صحيح");
      return;
    }

    //   setIsSubmitted(true);

    //   setTimeout(() => {
    //     setIsSubmitted(false);
    //     setPhone("");
    //   }, 3000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413')",
      }}
      dir="rtl"
    >
      {" "}
      {/* زر الرجوع */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white transition z-20"
      >
        <ArrowLeft className="w-5 h-5 text-gray-800" />
      </button>
      <div className="w-full max-w-md m-auto p-4 sm:">
        <div
          style={{ padding: "20px" }}
          className="bg-white rounded-3xl shadow-2xl space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 ">تسجيل الدخول</h1>
            <p className="text-gray-500">أدخل رقم جوالك للمتابعة</p>
          </div>
          <div className="space-y-6">
            <div style={{ marginBottom: "10px" }} className="space-y-2">
              <label
                style={{ marginBottom: "8px" }}
                htmlFor="phone"
                className="block text-smfont-medium text-gray-700"
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
                  placeholder="+963 9XX XXX XXX"
                  className={`w-full px-4 py-4 pr-12 text-lg border-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
                    error
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                  dir="ltr"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {error && (
                <p className="text-sm text-red-500 animate-pulse">{error}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span>متابعة</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
          {/* Footer */}
          <div className="pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              بالمتابعة، أنت توافق على{" "}
              <a href="#" className="text-blue-600 hover:underline">
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

function ArrowLeft({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}
const Wrapper = styled.section`
  width: 100%;
`;
