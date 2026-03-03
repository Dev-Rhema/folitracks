import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

function toStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/**
 * Reusable calendar with single-date and date-range selection.
 *
 * Props:
 *   singleDate – boolean: if true, value is an ISO string (or null); onChange receives a string
 *   value      – range mode: { start, end }  |  single mode: string|null
 *   onChange   – (value) => void  called on every click
 *   onCancel   – () => void
 *   onSave     – (value) => void  called when Save is clicked
 *   className  – override the root width (default "w-72")
 */
function Calendar({ singleDate = false, value, onChange, onCancel, onSave, className = "w-72", showActions = true }) {
  const today = new Date();
  const todayStr = toStr(today.getFullYear(), today.getMonth(), today.getDate());

  const initDate = singleDate
    ? (value ? new Date(value) : today)
    : (value?.start ? new Date(value.start) : today);

  const [viewYear, setViewYear]   = useState(initDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initDate.getMonth());
  const [local, setLocal]         = useState(
    singleDate ? (value ?? null) : { start: value?.start ?? null, end: value?.end ?? null }
  );
  const [hoverDay, setHoverDay]   = useState(null);

  const handleDayClick = (day) => {
    const clicked = toStr(viewYear, viewMonth, day);

    if (singleDate) {
      const next = clicked === local ? null : clicked;
      setLocal(next);
      onChange?.(next);
      return;
    }

    let next;
    if (!local.start || (local.start && local.end)) {
      next = { start: clicked, end: null };
    } else {
      if (clicked === local.start) {
        next = { start: null, end: null };
      } else if (clicked < local.start) {
        next = { start: clicked, end: local.start };
      } else {
        next = { start: local.start, end: clicked };
      }
    }
    setLocal(next);
    onChange?.(next);
  };

  const hoverStr = hoverDay ? toStr(viewYear, viewMonth, hoverDay) : null;

  const getDayState = (day) => {
    const d = toStr(viewYear, viewMonth, day);

    if (singleDate) {
      if (d === local) return "selected";
      if (d === todayStr) return "today";
      return "normal";
    }

    if (d === local.start) return "start";
    if (d === local.end)   return "end";
    if (local.start && local.end && d > local.start && d < local.end) return "range";
    if (local.start && !local.end && hoverStr) {
      const [lo, hi] = hoverStr >= local.start ? [local.start, hoverStr] : [hoverStr, local.start];
      if (d > lo && d < hi) return "range";
    }
    if (d === todayStr) return "today";
    return "normal";
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const firstDow  = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMo  = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells     = [...Array(firstDow).fill(null), ...Array.from({ length: daysInMo }, (_, i) => i + 1)];

  const getDayClassName = (state) => {
    const base = "w-8 h-8 mx-auto flex items-center justify-center text-xs rounded-lg cursor-pointer transition-colors font-medium";
    if (state === "selected" || state === "start" || state === "end") return `${base} bg-(--darkBlue) text-white`;
    if (state === "range") return `${base} bg-[#E8EAF6] text-(--darkBlue)`;
    if (state === "today") return `${base} bg-blue-50 text-(--darkBlue) hover:bg-blue-100`;
    return `${base} text-gray-800 hover:bg-gray-100`;
  };

  return (
    <div className={`p-5 ${className} select-none`}>
      {/* Month header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-base font-bold text-gray-900">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer">
            <ChevronLeft size={15} />
          </button>
          <button onClick={nextMonth} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const state = getDayState(day);
          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => setHoverDay(day)}
              onMouseLeave={() => setHoverDay(null)}
              className={getDayClassName(state)}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex justify-center gap-3 mt-5">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-xl border border-(--darkBlue) text-(--darkBlue) text-sm font-semibold hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave?.(local)}
            className="px-6 py-2 rounded-xl bg-(--darkBlue) text-white text-sm font-semibold hover:opacity-90 cursor-pointer transition-opacity"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default Calendar;
