import { useState, useRef, useEffect } from "react";
import { X, Bell, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react";

const PRESET_OPTIONS = ["1 day before", "2 days before", "5 days before", "Custom"];
const UNITS = ["days", "weeks", "months"];
const UNIT_MAX = { days: 31, weeks: 10, months: 2 };

// ── Custom Picker ─────────────────────────────────────────────────────────────
function CustomPicker({ onCancel, onSave }) {
  const [numIndex, setNumIndex] = useState(0);
  const [unitIndex, setUnitIndex] = useState(0);

  const unit = UNITS[unitIndex];
  const maxNum = UNIT_MAX[unit];
  const numbers = Array.from({ length: maxNum }, (_, i) => i + 1);

  const handleUnitChange = (newIdx) => {
    const newMax = UNIT_MAX[UNITS[newIdx]];
    if (numIndex >= newMax) setNumIndex(newMax - 1);
    setUnitIndex(newIdx);
  };

  const prevN = numbers[(numIndex - 1 + numbers.length) % numbers.length];
  const currN = numbers[numIndex];
  const nextN = numbers[(numIndex + 1) % numbers.length];

  const prevU = UNITS[(unitIndex - 1 + UNITS.length) % UNITS.length];
  const currU = UNITS[unitIndex];
  const nextU = UNITS[(unitIndex + 1) % UNITS.length];

  const buildLabel = () => {
    if (unit === "days") return `${currN} ${currN === 1 ? "day" : "days"} before`;
    if (unit === "weeks") return `${currN} ${currN === 1 ? "week" : "weeks"} before`;
    return `${currN} ${currN === 1 ? "month" : "months"} before`;
  };

  const ROW_H = "h-12";

  return (
    <div className="fixed inset-0 z-60 flex items-end md:items-center justify-center bg-black/40" onClick={onCancel}>
      <div
        className="bg-white rounded-t-3xl md:rounded-2xl shadow-lg w-full md:max-w-xs overflow-hidden select-none animate-slide-up md:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <button onClick={onCancel} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
            <X size={18} className="text-gray-700" />
          </button>
          <span className="text-base font-bold text-gray-900">Custom</span>
          <button
            onClick={() => onSave(buildLabel())}
            className="text-sm font-bold text-(--darkBlue) hover:opacity-70 transition-opacity cursor-pointer px-1"
          >
            Save
          </button>
        </div>

        {/* Unified 3-row drum roll */}
        <div className="relative px-6 py-2">
          {/* Full-width highlight for selected (middle) row */}
          <div className={`absolute inset-x-4 top-12 ${ROW_H} bg-gray-100 rounded-xl pointer-events-none`} />

          {/* Row: prev */}
          <div className={`flex items-center justify-center gap-6 ${ROW_H} relative z-10`}>
            <button
              onClick={() => setNumIndex((numIndex - 1 + numbers.length) % numbers.length)}
              className="w-10 text-center text-sm text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            >
              {prevN}
            </button>
            <button
              onClick={() => handleUnitChange((unitIndex - 1 + UNITS.length) % UNITS.length)}
              className="w-16 text-sm text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            >
              {prevU}
            </button>
          </div>

          {/* Row: selected */}
          <div className={`flex items-center justify-center gap-6 ${ROW_H} relative z-10`}>
            <div className="w-10 text-center text-base font-bold text-gray-900">{currN}</div>
            <div className="w-16 text-base font-bold text-gray-900">{currU}</div>
          </div>

          {/* Row: next */}
          <div className={`flex items-center justify-center gap-6 ${ROW_H} relative z-10`}>
            <button
              onClick={() => setNumIndex((numIndex + 1) % numbers.length)}
              className="w-10 text-center text-sm text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            >
              {nextN}
            </button>
            <button
              onClick={() => handleUnitChange((unitIndex + 1) % UNITS.length)}
              className="w-16 text-sm text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            >
              {nextU}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Reminder option dropdown ───────────────────────────────────────────────────
function ReminderDropdown({ isEditMode, onSelect, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 z-55 mt-0 w-44 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md"
    >
      {PRESET_OPTIONS.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors"
        >
          {opt}
        </button>
      ))}
      {isEditMode && (
        <>
          <div className="border-t border-gray-200" />
          <button
            onClick={() => onSelect("none")}
            className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            None
          </button>
        </>
      )}
    </div>
  );
}

// ── Main SetReminderModal ─────────────────────────────────────────────────────
export default function SetReminderModal({
  row,
  initialReminders = ["1 day before", "2 days before", "5 days before"],
  onClose,
}) {
  const [step, setStep] = useState("form"); // "form" | "success"
  const [reminders, setReminders] = useState(initialReminders);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [customTarget, setCustomTarget] = useState(null);

  if (!row) return null;

  const handleDropdownSelect = (option, index) => {
    setOpenDropdownIndex(null);
    if (option === "Custom") { setCustomTarget(index); return; }
    if (option === "none") { setReminders((prev) => prev.filter((_, i) => i !== index)); return; }
    if (index === "add") {
      setReminders((prev) => [...prev, option]);
    } else {
      setReminders((prev) => prev.map((r, i) => (i === index ? option : r)));
    }
  };

  const handleCustomSave = (label) => {
    const index = customTarget;
    setCustomTarget(null);
    if (index === "add") {
      setReminders((prev) => [...prev, label]);
    } else {
      setReminders((prev) => prev.map((r, i) => (i === index ? label : r)));
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40" onClick={onClose}>
        <div
          className="bg-white rounded-t-3xl md:rounded-2xl shadow-lg w-full md:max-w-sm md:mx-4 p-8 flex flex-col items-center text-center animate-slide-up md:animate-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-5">
            <CheckCircle2 size={36} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Reminder Updated Successfully</h2>
          <p className="text-sm text-gray-500 mb-8">
            Your new reminder settings have been saved. You&apos;ll be notified accordingly before your next service.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-(--darkBlue) text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // ── Form screen ─────────────────────────────────────────────────────────────
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40" onClick={onClose}>
        <div
          className="bg-white rounded-t-3xl md:rounded-2xl shadow-lg w-full md:max-w-sm md:mx-4 animate-slide-up md:animate-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-5 pt-5 pb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Set Reminder</h2>
              <p className="text-sm text-gray-500 mt-0.5">Get notified before your next service date.</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors mt-0.5">
              <X size={20} className="text-gray-700" />
            </button>
          </div>

          {/* Reminders section */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Bell size={15} className="text-(--blue)" />
              <span className="text-sm font-semibold text-(--blue)">Current Reminders</span>
            </div>

            <div className="flex flex-col">
              {reminders.length === 0 && (
                <p className="text-sm text-gray-400 py-2">None</p>
              )}

              {reminders.map((reminder, i) => (
                <div key={i} className="relative">
                  <button
                    onClick={() => setOpenDropdownIndex(openDropdownIndex === i ? null : i)}
                    className="w-full flex items-center justify-between py-3.5 text-sm text-gray-900 font-medium border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span>{reminder}</span>
                    <div className="flex flex-col shrink-0 ml-2">
                      <ChevronUp size={13} className="text-gray-400" />
                      <ChevronDown size={13} className="text-gray-400" />
                    </div>
                  </button>
                  {openDropdownIndex === i && (
                    <ReminderDropdown
                      isEditMode
                      onSelect={(opt) => handleDropdownSelect(opt, i)}
                      onClose={() => setOpenDropdownIndex(null)}
                    />
                  )}
                </div>
              ))}

              {/* Add Reminder */}
              <div className="relative mt-3">
                <button
                  onClick={() => setOpenDropdownIndex(openDropdownIndex === "add" ? null : "add")}
                  className="flex items-center gap-2 text-sm font-semibold text-(--blue) hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <span className="text-xl leading-none">+</span>
                  Add Reminder
                </button>
                {openDropdownIndex === "add" && (
                  <ReminderDropdown
                    isEditMode={false}
                    onSelect={(opt) => handleDropdownSelect(opt, "add")}
                    onClose={() => setOpenDropdownIndex(null)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 pb-5 pt-2 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-(--darkBlue) text-sm font-bold text-(--darkBlue) hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => setStep("success")}
              className="flex-1 py-3 rounded-xl bg-(--darkBlue) text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {customTarget !== null && (
        <CustomPicker
          onCancel={() => setCustomTarget(null)}
          onSave={handleCustomSave}
        />
      )}
    </>
  );
}
