import { useState, useRef, useEffect } from "react";
import { X, Bell, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react";
import CTA from "../../../../../components/CTA";
import { useSetReminderServiceHistoryMutation } from "../../../../../redux/api/serviceHistoryApiSlice";
import usePost from "../../../../../hooks/usePost";

const PRESET_OPTIONS = ["1 day before", "2 days before", "5 days before", "Custom"];
const UNITS = ["days", "weeks", "months"];
const UNIT_MAX = { days: 31, weeks: 10, months: 2 };

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

  const scrollAccNum = useRef(0);
  const scrollAccUnit = useRef(0);
  const THRESHOLD = 50;

  const handleWheelNum = (e) => {
    scrollAccNum.current += e.deltaY;
    if (Math.abs(scrollAccNum.current) >= THRESHOLD) {
      if (scrollAccNum.current > 0) setNumIndex((numIndex + 1) % numbers.length);
      else setNumIndex((numIndex - 1 + numbers.length) % numbers.length);
      scrollAccNum.current = 0;
    }
  };

  const handleWheelUnit = (e) => {
    scrollAccUnit.current += e.deltaY;
    if (Math.abs(scrollAccUnit.current) >= THRESHOLD) {
      if (scrollAccUnit.current > 0) handleUnitChange((unitIndex + 1) % UNITS.length);
      else handleUnitChange((unitIndex - 1 + UNITS.length) % UNITS.length);
      scrollAccUnit.current = 0;
    }
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
        <div className="relative px-6 py-2 flex items-center justify-center">
          {/* Full-width highlight for selected (middle) row */}
          <div className={`absolute inset-x-4 top-12 ${ROW_H} bg-gray-100 rounded-xl pointer-events-none`} />

          {/* Column: Number */}
          <div
            onWheel={handleWheelNum}
            className="flex flex-col items-center w-20"
          >
            {/* Row: prev */}
            <div className={`flex items-center justify-center ${ROW_H} relative z-10 w-full`}>
              <button
                onClick={() => setNumIndex((numIndex - 1 + numbers.length) % numbers.length)}
                className="w-10 text-center text-sm text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
              >
                {prevN}
              </button>
            </div>
            {/* Row: selected */}
            <div className={`flex items-center justify-center ${ROW_H} relative z-10 w-full`}>
              <div className="w-10 text-center text-base font-bold text-gray-900">{currN}</div>
            </div>
            {/* Row: next */}
            <div className={`flex items-center justify-center ${ROW_H} relative z-10 w-full`}>
              <button
                onClick={() => setNumIndex((numIndex + 1) % numbers.length)}
                className="w-10 text-center text-sm text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
              >
                {nextN}
              </button>
            </div>
          </div>

          {/* Column: Unit */}
          <div
            onWheel={handleWheelUnit}
            className="flex flex-col items-center w-28"
          >
            {/* Row: prev */}
            <div className={`flex items-center justify-center ${ROW_H} relative z-10 w-full`}>
              <button
                onClick={() => handleUnitChange((unitIndex - 1 + UNITS.length) % UNITS.length)}
                className="w-full text-sm text-gray-400 cursor-pointer hover:text-gray-600 transition-colors text-center"
              >
                {prevU}
              </button>
            </div>
            {/* Row: selected */}
            <div className={`flex items-center justify-center ${ROW_H} relative z-10 w-full`}>
              <div className="w-full text-base font-bold text-gray-900 text-center">{currU}</div>
            </div>
            {/* Row: next */}
            <div className={`flex items-center justify-center ${ROW_H} relative z-10 w-full`}>
              <button
                onClick={() => handleUnitChange((unitIndex + 1) % UNITS.length)}
                className="w-full text-sm text-gray-400 cursor-pointer hover:text-gray-600 transition-colors text-center"
              >
                {nextU}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReminderDropdown({ isEditMode, onSelect, onClose, currentReminders = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  // Filter out options that are already selected, except for "Custom"
  const availableOptions = PRESET_OPTIONS.filter(
    (opt) => opt === "Custom" || !currentReminders.includes(opt)
  );

  return (
    <div className="fixed inset-0 z-60 flex items-end md:items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl md:rounded-2xl shadow-lg w-full md:max-w-xs overflow-hidden select-none animate-slide-up md:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        {availableOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors"
          >
            {opt}
          </button>
        ))}
        {isEditMode && (
          <button
            onClick={() => onSelect("none")}
            className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Remove Reminder
          </button>
        )}
      </div>
    </div>
  );
}

export default function SetReminderModal({
  row,
  initialReminders = [],
  onClose,
}) {
  const [step, setStep] = useState("form");
  const [reminders, setReminders] = useState(initialReminders);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [customTarget, setCustomTarget] = useState(null);

  const { postData: setReminder, isLoading: isSettingReminder } = usePost(useSetReminderServiceHistoryMutation);

  console.log(reminders);

  console.log(row);

  const handleSave = async () => {
    try {
      await setReminder({
        id: row?._id,
        body: { serviceReminderNumber: reminders[0]?.split(" ")[0], serviceReminderType: reminders[0]?.split(" ")[1] }
      });
      setStep("success");
      // onClose();
    } catch (error) {
      console.error("Set reminder failed:", error);
    }
  };


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

  if (step === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40" onClick={onClose}>
        <div
          className="bg-white rounded-t-3xl md:rounded-2xl shadow-lg w-full md:max-w-[480px] md:mx-4 p-8 flex flex-col items-center text-center animate-slide-up md:animate-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-5">
            <CheckCircle2 size={36} className="text-green-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Reminder Updated Successfully</h2>
          <p className="text-sm text-gray-500 mb-8">
            Your new reminder settings have been saved. You&apos;ll be notified accordingly before your next service.
          </p>

          <CTA
            onClick={onClose}
            color="blue"
            name="Close"
          className="w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40" onClick={onClose}>
        <div
          className="bg-white rounded-t-3xl md:rounded-2xl shadow-lg w-full md:max-w-[480px] md:mx-4 animate-slide-up md:animate-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 pt-5">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#04040D]">Set Reminder</h2>
              <p className="text-sm text-[#48486B] mt-0.5">Get notified before your next service date.</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Reminders section */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mt-3 mb-1 text-[#48486B]">
              <Bell size={15} className="" />
              <span className="text-sm">Current Reminders</span>
            </div>

            <div className="flex flex-col">
              {reminders.length === 0 && (
                <p className="text-sm text-gray-400 py-2">None</p>
              )}

              {reminders.map((reminder, i) => (
                <div key={i} className="relative">
                  <button
                    onClick={() => setOpenDropdownIndex(openDropdownIndex === i ? null : i)}
                    className="w-full flex items-center justify-between text-[#04040D] mb-1 transition-colors cursor-pointer"
                  >
                    <span>{reminder}</span>
                    <div className="flex flex-col shrink-0 ml-2">
                      <ChevronUp size={11} className="text-[#04040D]" />
                      <ChevronDown size={11} className="text-[#04040D]" />
                    </div>
                  </button>

                  {openDropdownIndex === i && (
                    <ReminderDropdown
                      isEditMode
                      onSelect={(opt) => handleDropdownSelect(opt, i)}
                      onClose={() => setOpenDropdownIndex(null)}
                      currentReminders={reminders}
                    />
                  )}
                </div>
              ))}

              {/* Add Reminder */}
              <div className="relative mt-3">
                <button
                  onClick={() => setOpenDropdownIndex(openDropdownIndex === "add" ? null : "add")}
                  className="flex items-center gap-2 font-medium text-[#3B82F6] cursor-pointer"
                >
                  <span className="text-xl leading-none">+</span>
                  Add Reminder
                </button>

                {openDropdownIndex === "add" && (
                  <ReminderDropdown
                    isEditMode={false}
                    onSelect={(opt) => handleDropdownSelect(opt, "add")}
                    onClose={() => setOpenDropdownIndex(null)}
                    currentReminders={reminders}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="px-5 pb-5 flex justify-end gap-3">
            <CTA
              name="Cancel"
              onClick={onClose}
              color="blue"
              variant="outline"
            />

            <CTA
              onClick={handleSave}
              color="blue"
              isLoading={isSettingReminder}
              name={isSettingReminder ? "Saving..." : "Save"}
            />
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
