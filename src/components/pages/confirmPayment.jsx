import { useState, useEffect } from "react";
import { Check, Clock, Users, Calendar, FileText } from "lucide-react";

function ConfirmPayment() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  // ============================
  // SCROLL TO TOP ON MOUNT
  // ============================
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("BookingInday mounted");
  }, []);
  // بيانات الطلب الافتراضية (يمكن استبدالها بالبيانات الفعلية)
  const orderDetails = {
    workers: 2,
    serviceType: "تنظيف منزل - زيارة واحدة",
    date: "السبت 15 نوفمبر 2025",
    time: "09:00 - 13:00",
    totalPrice: "300 ر.س",
  };

  const handleSubmitOrder = () => {
    if (!acceptedTerms) {
      alert("يرجى الموافقة على الشروط والأحكام أولاً");
      return;
    }
    setOrderCompleted(true);
  };

  if (orderCompleted) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
        dir="rtl"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            تم تأكيد الطلب بنجاح!
          </h2>
          <p className="text-gray-600 mb-6">
            سنقوم بالتواصل معك خلال 24 ساعة لتأكيد الموعد
          </p>
          <button
            onClick={() => setOrderCompleted(false)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            إنشاء طلب جديد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
      {/* ============================ STEPS / TITLE BAR ============================ */}
      <div className="flex flex-col sm:flex-row justify-center mb-12 sm:justify-between items-center bg-white border-b border-gray-200 p-4">
        {/* Title: hidden on xs, visible on sm+ */}
        <h1 className="hidden sm:block text-3xl font-bold text-blue-900 ml-8 text-center md:text-right">
          التنظيف بالساعة
        </h1>

        {/* Center steps (keeps centered on mobile too) */}
        <div className="flex items-center justify-center pt-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
              1
            </div>
            <span className="text-sm text-green-600 mt-2 font-semibold">
              الباقة
            </span>
          </div>

          <div className="h-1 w-20 bg-gray-300"></div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
              2
            </div>
            <span className="text-sm text-green-600 mt-2">الدفع</span>
          </div>
        </div>

        {/* Breadcrumbs: visible on sm+ */}
        <div className="max-w-7xl mx-8 hidden sm:block rtl">
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="text-blue-900 font-semibold">الرئيسية</span>
            <span className="text-gray-300">←</span>
            <span className="text-gray-400">التنظيف بالساعة</span>
            <span className="text-gray-300">←</span>
            <span className="text-gray-400">إنشاء زيارة جديدة</span>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        {/* الهيدر */}
        <header className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            اتمام الطلب
          </h1>
          <p className="text-gray-600 text-center">
            الدفع نقداً عند تقديم الخدمة
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* العمود الأيسر - معلومات الطلب */}
          <div className="lg:col-span-2 space-y-6">
            {/* بطاقة معلومات الطلب */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
                معلومات الطلب
              </h2>

              <div className="space-y-4">
                {/* عدد العمال */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">عدد العمال</span>
                  </div>
                  <span className="font-bold text-gray-800">
                    {orderDetails.workers} عاملة
                  </span>
                </div>

                {/* نوع الخدمة */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">نوع الخدمة</span>
                  </div>
                  <span className="font-bold text-gray-800 text-left">
                    {orderDetails.serviceType}
                  </span>
                </div>

                {/* التاريخ */}
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <span className="text-gray-700">التاريخ</span>
                  </div>
                  <span className="font-bold text-gray-800">
                    {orderDetails.date}
                  </span>
                </div>

                {/* الوقت */}
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">الوقت</span>
                  </div>
                  <span className="font-bold text-gray-800">
                    {orderDetails.time}
                  </span>
                </div>
              </div>
            </div>

            {/* بطاقة طريقة الدفع */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                طريقة الدفع
              </h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-green-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">نقدي</span>
                  </div>
                  <span className="text-gray-700">الدفع نقداً</span>
                </div>
                <span className="text-gray-600">عند تقديم الخدمة</span>
              </div>
            </div>
          </div>

          {/* العمود الأيمن - الملخص والشروط */}
          <div className="space-y-6">
            {/* بطاقة ملخص الطلب */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                ملخص الطلب
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>عدد العمال</span>
                  <span>{orderDetails.workers} × 150 ر.س</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>نوع الخدمة</span>
                  <span>زيارة واحدة</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>الضريبة</span>
                  <span>0 ر.س</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>المجموع</span>
                  <span>{orderDetails.totalPrice}</span>
                </div>
              </div>

              {/* شروط وأحكام */}
              <div className="border-t pt-4">
                <div className="flex items-start gap-3 mb-4">
                  <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                  <h3 className="font-bold text-gray-800">الشروط والأحكام</h3>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  <ul className="space-y-2 text-sm text-gray-600 list-disc pr-4">
                    <li>يجب تأكيد الحجز قبل 24 ساعة من الموعد</li>
                    <li>يمكن إلغاء الطلب قبل 48 ساعة من الموعد بدون رسوم</li>
                    <li>في حال التأخير أكثر من ساعة، يحق للعاملات المغادرة</li>
                    <li>يجب توفير المعدات والمنظفات الأساسية</li>
                    <li>الدفع نقداً فقط عند انتهاء الخدمة</li>
                    <li>لا تشمل الخدمة تنظيف السجاد والستائر</li>
                    <li>يجب إخلاء المكان من الأشخاص أثناء التنظيف</li>
                  </ul>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    أوافق على الشروط والأحكام المذكورة أعلاه
                  </label>
                </div>
              </div>
            </div>

            {/* زر إتمام الطلب */}
            <button
              onClick={handleSubmitOrder}
              disabled={!acceptedTerms}
              className={`w-full py-4 rounded-xl font-bold text-lg transition duration-300 ${
                acceptedTerms
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              اتمام الطلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConfirmPayment;
