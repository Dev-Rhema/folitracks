import { useState } from "react";
import { X } from "lucide-react";

const ABSOLUTE_MIN = 0;
const ABSOLUTE_MAX = 100000;
const STEP = 1000;

/**
 * Reusable price-range filter with dual slider.
 *
 * Props:
 *   value    – { min: number, max: number }
 *   onClose  – () => void
 *   onReset  – () => void
 *   onApply  – ({ min, max }) => void
 */
function PriceRangeFilter({ value = {}, onClose, onReset, onApply }) {
  const [min, setMin] = useState(value.min ?? ABSOLUTE_MIN);
  const [max, setMax] = useState(value.max ?? ABSOLUTE_MAX);

  const minPct = ((min - ABSOLUTE_MIN) / (ABSOLUTE_MAX - ABSOLUTE_MIN)) * 100;
  const maxPct = ((max - ABSOLUTE_MIN) / (ABSOLUTE_MAX - ABSOLUTE_MIN)) * 100;

  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

  const handleMinSlider = (e) => setMin(clamp(Number(e.target.value), ABSOLUTE_MIN, max - STEP));
  const handleMaxSlider = (e) => setMax(clamp(Number(e.target.value), min + STEP, ABSOLUTE_MAX));

  const handleMinInput = (raw) => {
    const n = parseInt(raw.replace(/,/g, ""), 10);
    if (!isNaN(n)) setMin(clamp(n, ABSOLUTE_MIN, max - STEP));
  };
  const handleMaxInput = (raw) => {
    const n = parseInt(raw.replace(/,/g, ""), 10);
    if (!isNaN(n)) setMax(clamp(n, min + STEP, ABSOLUTE_MAX));
  };

  const fmt = (n) => n.toLocaleString();

  const thumbBase =
    "absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-(--darkBlue) pointer-events-none shadow-sm";
  const inputBase =
    "absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none";

  return (
    <div className="p-5 w-72">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-900">Price Range</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 cursor-pointer transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Min / Max inputs */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Min (₦)</label>
          <input
            type="text"
            value={fmt(min)}
            onChange={(e) => handleMinInput(e.target.value)}
            className="w-full bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Max (₦)</label>
          <input
            type="text"
            value={fmt(max)}
            onChange={(e) => handleMaxInput(e.target.value)}
            className="w-full bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none"
          />
        </div>
      </div>

      {/* Dual range slider */}
      <div className="relative h-5 mb-7">
        {/* Base track */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-gray-200 rounded-full" />
        {/* Active range */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-(--darkBlue) rounded-full"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />
        {/* Min range input */}
        <input
          type="range"
          min={ABSOLUTE_MIN}
          max={ABSOLUTE_MAX}
          step={STEP}
          value={min}
          onChange={handleMinSlider}
          className={inputBase}
          style={{ zIndex: min > ABSOLUTE_MAX - 10 * STEP ? 5 : 3 }}
        />
        {/* Max range input */}
        <input
          type="range"
          min={ABSOLUTE_MIN}
          max={ABSOLUTE_MAX}
          step={STEP}
          value={max}
          onChange={handleMaxSlider}
          className={inputBase}
          style={{ zIndex: 4 }}
        />
        {/* Visual thumbs */}
        <div className={thumbBase} style={{ left: `calc(${minPct}% - 8px)` }} />
        <div className={thumbBase} style={{ left: `calc(${maxPct}% - 8px)` }} />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => { setMin(ABSOLUTE_MIN); setMax(ABSOLUTE_MAX); onReset?.(); }}
          className="px-5 py-2 rounded-xl border border-(--darkBlue) text-(--darkBlue) text-sm font-semibold hover:bg-gray-50 cursor-pointer transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => onApply?.({ min, max })}
          className="px-5 py-2 rounded-xl bg-(--darkBlue) text-white text-sm font-semibold hover:opacity-90 cursor-pointer transition-opacity"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default PriceRangeFilter;
