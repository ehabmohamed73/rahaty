import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OTPPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const [isLogin] = useState(() => {
    return localStorage.getItem("login") === "true";
  });
  const handelLoginCheck = () => {
    if (isLogin) {
      localStorage.setItem("login", "false");
      localStorage.setItem("isSignedIn", "true");
    }
  };
  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1); // لو المستخدم لصق رقمين أو أكثر في خانة واحدة (مثلاً لصق 34):
    }

    if (!/^\d*$/.test(value)) return; // اسمح فقط في الارقام فقط من 0 الى 9

    const newOtp = [...otp]; //نحتاج نسخة جديدة عشان React يلاحظ التغيير.
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus(); //ننقل الكورسور تلقائياً إلى الخانة التالية ⏩
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.every((char) => /^\d$/.test(char))) {
      const newOtp = [...otp];
      pastedData.forEach((char, idx) => {
        if (idx < 6) newOtp[idx] = char;
      });
      setOtp(newOtp);
      const lastIndex = Math.min(pastedData.length, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.every((digit) => digit !== "")) {
      // alert(`تم التحقق من الرمز: ${otp.join("")}`);
      navigate(isLogin ? "/" : "/confirm-payment");
      handelLoginCheck();
      setIsOpen(false);
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    alert("تم إرسال رمز جديد");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:items-center md:justify-center p-4 bg-transparent">
      {/* Modal Container */}
      <div
        className="fixed md:relative bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-auto 
                   bg-white rounded-t-3xl md:rounded-2xl shadow-2xl 
                   w-full md:w-auto md:max-w-md
                   animate-slide-up md:animate-fade-in
                   max-h-[90vh] md:max-h-none overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 left-4 md:right-4 md:left-auto text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8 pt-12 md:p-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            التحقق من الرمز
          </h2>

          {/* Description */}
          <p className="text-center text-gray-600 mb-8">
            أدخل الرمز المكون من 6 أرقام المرسل إلى
            <br />
            <span className="font-semibold text-gray-800">
              +966 ** *** **34
            </span>
          </p>

          {/* OTP Inputs */}
          <div className="flex gap-2 md:gap-3 justify-center mb-6" dir="ltr">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-semibold 
                         border-2 border-gray-300 rounded-xl
                         focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200
                         transition-all duration-200"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={!otp.every((digit) => digit !== "")}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg
                     hover:bg-blue-700 active:scale-98 transition-all duration-200
                     disabled:bg-gray-300 disabled:cursor-not-allowed
                     shadow-lg shadow-blue-600/30"
          >
            تأكيد
          </button>
          {/* Resend */}
          <div className="text-center mt-6">
            <p className="text-gray-600 mb-2">لم تستلم الرمز؟</p>
            <button
              onClick={handleResend}
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              إعادة إرسال الرمز
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
