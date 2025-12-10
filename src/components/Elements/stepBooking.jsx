export default function StepBooking({ text }) {
  return (
    <>
      {/* ============================ STEPS / TITLE BAR ============================ */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center bg-white border-b border-gray-200 p-4">
        {/* Title: hidden on xs, visible on sm+ */}
        <h1 className="hidden sm:block text-3xl font-bold text-blue-900 ml-8 text-center md:text-right">
          {text}
        </h1>

        {/* Center steps (keeps centered on mobile too) */}
        <div className="flex items-center justify-center pt-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
              ✓
            </div>
            <span className="text-sm text-green-600 mt-2 font-semibold">
              الباقة
            </span>
          </div>

          <div className="h-1 w-20 bg-gray-300"></div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-semibold">
              2
            </div>
            <span className="text-sm text-gray-500 mt-2">الدفع</span>
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
    </>
  );
}
