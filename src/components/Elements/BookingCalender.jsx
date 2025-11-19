import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import arLocale from "@fullcalendar/core/locales/ar";

export default function BookingCalendar({ onSelectDates }) {
  const [selectedDates, setSelectedDates] = useState([]); // التواريخ المختارة من قبل المستخدم

  // الأيام المحجوزة (لا يمكن اختيارها)
  const bookedDates = ["2025-11-25", "2025-11-23", "2025-11-20"];

  // تحويل الأيام المحجوزة إلى أحداث تظهر باللون الأحمر
  const bookedEvents = bookedDates.map((d) => ({
    title: "محجوز",
    start: d,
    display: "background",
    backgroundColor: "#FFC107",
    classNames: ["booked-day"],
  }));
  useEffect(() => {
    if (onSelectDates) {
      onSelectDates(selectedDates);
    }
  }, [selectedDates, onSelectDates]);

  // عند الضغط على يوم
  const handleDateClick = (info) => {
    const day = info.dateStr;
    const clickedDate = new Date(day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // منع اختيار أيام ماضية
    if (clickedDate < today) {
      alert("لا يمكن اختيار تاريخ من الماضي");
      return;
    }

    // منع المستخدم من اختيار يوم محجوز
    if (bookedDates.includes(day)) {
      alert("هذا اليوم محجوز ولا يمكن اختياره");
      return;
    }

    // إضافة أو إزالة اليوم من القائمة
    if (selectedDates.includes(day)) {
      setSelectedDates(selectedDates.filter((d) => d !== day));
    } else {
      setSelectedDates([...selectedDates, day]);
    }
  };

  return (
    <>
      {/* التقويم */}
      <div className="[&_.fc_.fc-daygrid-day-number]:text-sm text-[10px]">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={[
            ...bookedEvents,
            // إضافة التواريخ المختارة كأحداث
            ...selectedDates.map((date) => ({
              start: date,
              display: "background",
              backgroundColor: "#009688",
              classNames: ["selected-day"],
            })),
          ]}
          dateClick={handleDateClick}
          locale={arLocale}
          height={450}
          headerToolbar={{
            start: "prev",
            center: "title",
            end: "next",
          }}
          buttonText={{
            today: "اليوم",
          }}
          validRange={{
            start: new Date().toISOString().split("T")[0], // منع اختيار أيام ماضية
          }}
          dayCellClassNames={(arg) => {
            const classes = [];
            const dateStr = arg.date.toISOString().split("T")[0];

            if (selectedDates.includes(dateStr)) {
              classes.push("selected-day");
            }
            if (bookedDates.includes(dateStr)) {
              classes.push("booked-day");
            }
            return classes;
          }}
        />
      </div>

      {/* معلومات التواريخ المختارة */}
      {/* {selectedDates.length > 0 && (
        <div className="mt-6 p-4 bg-linear-to-r from-blue-50 to-blue-100 rounded-lg border-r-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">التواريخ المختارة:</p>
              <p className="text-lg font-bold text-gray-800">
                {formatSelectedDates()}
              </p>
            </div>
            <button
              onClick={() => setSelectedDates([])}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 font-semibold"
            >
              إلغاء الكل
            </button>
          </div>
        </div>
      )} */}
    </>
  );
}
