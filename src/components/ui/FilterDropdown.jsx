import { useState, useEffect, useRef } from "react";
import { Filter, ChevronRight, X } from "lucide-react";
import Calendar from "./Calendar";
import PriceRangeFilter from "./PriceRangeFilter";

// ─── Accordion panel (Service Type) ──────────────────────────────────────────

function AccordionPanel({ groups, value, onChange }) {
  const [expanded, setExpanded] = useState(value?.group ?? null);

  const handleGroupClick = (group) => {
    const isExpanding = expanded !== group.label;
    setExpanded(isExpanding ? group.label : null);
    onChange(isExpanding ? { group: group.label, service: null } : null);
  };

  const handleServiceClick = (groupLabel, service) => {
    const isSelected = value?.service === service;
    onChange(isSelected ? null : { group: groupLabel, service });
  };

  return (
    <div className="w-52">
      {groups.map((group) => {
        const isOpen = expanded === group.label;
        const isGroupActive = value?.group === group.label && !value?.service;
        return (
          <div key={group.label}>
            <button
              onClick={() => handleGroupClick(group)}
              className={`w-full flex items-center justify-between px-5 py-3 text-sm hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 ${
                isGroupActive ? "text-(--blue) font-semibold" : "text-gray-800"
              }`}
            >
              <span>{group.label}</span>
              <ChevronRight
                size={14}
                className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
              />
            </button>
            {isOpen && (
              <div>
                {group.services.map((service) => {
                  const isSelected = value?.service === service;
                  return (
                    <button
                      key={service}
                      onClick={() => handleServiceClick(group.label, service)}
                      className={`w-full text-left pl-9 pr-5 py-2.5 text-sm cursor-pointer transition-colors hover:bg-gray-100 border-b border-gray-100 ${
                        isSelected ? "text-(--blue) font-semibold bg-[#F0F0FF]" : "text-gray-600"
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Simple list panel (Vehicle Make / Vehicle Type) ──────────────────────────

function ListPanel({ options, value, onChange }) {
  return (
    <div className="w-52">
      {options.map((option, i) => (
        <button
          key={option}
          onClick={() => onChange(option === value ? null : option)}
          className={`w-full text-center px-5 py-3 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
            option === value ? "text-(--blue) font-semibold" : "text-gray-800"
          } ${i < options.length - 1 ? "border-b border-gray-100" : ""}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

const PRICE_MIN = 0;
const PRICE_MAX = 100000;
const PRICE_STEP = 1000;

// ─── Mobile bottom-sheet ──────────────────────────────────────────────────────

function MobileFilterSheet({ categories, values, onChange, onClose }) {
  const [localValues, setLocalValues] = useState({ ...values });
  const [calendarCat, setCalendarCat] = useState(null); // label of calendar cat being edited

  // Price range local state (initialised from existing value)
  const priceInit = (cat) => ({
    min: localValues[cat?.label]?.min ?? PRICE_MIN,
    max: localValues[cat?.label]?.max ?? PRICE_MAX,
  });
  const priceCat = categories.find((c) => c.type === "priceRange");
  const [priceMin, setPriceMin] = useState(() => priceInit(priceCat).min);
  const [priceMax, setPriceMax] = useState(() => priceInit(priceCat).max);

  const resolveType = (cat) => {
    if (cat.type) return cat.type;
    if (cat.options && cat.options.length > 0) return "list";
    return null;
  };

  const togglePill = (label, val) =>
    setLocalValues((prev) => ({ ...prev, [label]: prev[label] === val ? null : val }));

  const toggleAccordionPill = (catLabel, groupLabel, service) =>
    setLocalValues((prev) => {
      const current = prev[catLabel];
      if (current?.service === service) return { ...prev, [catLabel]: null };
      return { ...prev, [catLabel]: { group: groupLabel, service } };
    });

  const handleApply = () => {
    // Commit price range if category exists
    const updatedLocal = { ...localValues };
    if (priceCat) updatedLocal[priceCat.label] = { min: priceMin, max: priceMax };
    categories.forEach((cat) => onChange(cat.label, updatedLocal[cat.label] ?? null));
    onClose();
  };

  const handleReset = () => {
    setLocalValues({});
    setPriceMin(PRICE_MIN);
    setPriceMax(PRICE_MAX);
  };

  const minPct = ((priceMin - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPct = ((priceMax - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const fmt = (n) => n.toLocaleString();

  // ── Calendar sub-view ───────────────────────────────────────────────────────
  if (calendarCat) {
    return (
      <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={onClose}>
        <div
          className="bg-white rounded-t-3xl w-full max-h-[90vh] flex flex-col animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Select date range</h2>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
              <X size={20} className="text-gray-700" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto flex justify-center py-2">
            <Calendar
              value={localValues[calendarCat] || {}}
              onChange={(val) => setLocalValues((prev) => ({ ...prev, [calendarCat]: val }))}
              onCancel={() => setCalendarCat(null)}
              onSave={(val) => { setLocalValues((prev) => ({ ...prev, [calendarCat]: val })); setCalendarCat(null); }}
              showActions={false}
              className="w-full px-2"
            />
          </div>
          <div className="px-5 py-4 border-t border-gray-100 flex gap-3">
            <button
              onClick={() => { setLocalValues((prev) => ({ ...prev, [calendarCat]: null })); setCalendarCat(null); }}
              className="flex-1 py-3 rounded-xl border-2 border-(--darkBlue) text-(--darkBlue) text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Reset
            </button>
            <button
              onClick={() => {
                onChange(calendarCat, localValues[calendarCat] ?? null);
                onClose();
              }}
              className="flex-1 py-3 rounded-xl bg-(--darkBlue) text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main filter view ────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl w-full max-h-[85vh] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Filter by</h2>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
            <X size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Scrollable categories */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-6">
          {categories.map((cat) => {
            const type = resolveType(cat);
            if (!type) return null;

            return (
              <div key={cat.label}>
                <h3 className="text-base font-bold text-gray-900 mb-3">{cat.label}</h3>

                {/* List → pills */}
                {type === "list" && (
                  <div className="flex flex-wrap gap-2">
                    {cat.options.map((opt) => {
                      const selected = localValues[cat.label] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => togglePill(cat.label, opt)}
                          className={`px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-colors ${
                            selected
                              ? "bg-(--darkBlue) text-white border-(--darkBlue)"
                              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Accordion → grouped pills */}
                {type === "accordion" && (
                  <div className="space-y-4">
                    {cat.groups.map((group) => (
                      <div key={group.label}>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                          {group.label}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {group.services.map((svc) => {
                            const selected = localValues[cat.label]?.service === svc;
                            return (
                              <button
                                key={svc}
                                onClick={() => toggleAccordionPill(cat.label, group.label, svc)}
                                className={`px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-colors ${
                                  selected
                                    ? "bg-(--darkBlue) text-white border-(--darkBlue)"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                }`}
                              >
                                {svc}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Calendar → tap to open sub-view */}
                {type === "calendar" && (
                  <button
                    onClick={() => setCalendarCat(cat.label)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
                      localValues[cat.label]?.start
                        ? "border-(--darkBlue) text-(--darkBlue) bg-blue-50"
                        : "border-gray-300 text-gray-400 hover:border-gray-400"
                    }`}
                  >
                    {localValues[cat.label]?.start
                      ? `${localValues[cat.label].start}${localValues[cat.label].end ? ` → ${localValues[cat.label].end}` : ""}`
                      : "Select date range"}
                  </button>
                )}

                {/* Price range → inline slider */}
                {type === "priceRange" && (
                  <div>
                    <div className="flex gap-3 mb-5">
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">Min (₦)</label>
                        <input
                          type="text"
                          value={fmt(priceMin)}
                          onChange={(e) => {
                            const n = parseInt(e.target.value.replace(/,/g, ""), 10);
                            if (!isNaN(n)) setPriceMin(Math.min(Math.max(n, PRICE_MIN), priceMax - PRICE_STEP));
                          }}
                          className="w-full bg-[#F1F5F9] border border-[#CBD5E1] rounded-xl px-3 py-3 text-sm text-gray-800 outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1 block">Max (₦)</label>
                        <input
                          type="text"
                          value={fmt(priceMax)}
                          onChange={(e) => {
                            const n = parseInt(e.target.value.replace(/,/g, ""), 10);
                            if (!isNaN(n)) setPriceMax(Math.min(Math.max(n, priceMin + PRICE_STEP), PRICE_MAX));
                          }}
                          className="w-full bg-[#F1F5F9] border border-[#CBD5E1] rounded-xl px-3 py-3 text-sm text-gray-800 outline-none"
                        />
                      </div>
                    </div>
                    {/* Dual slider */}
                    <div className="relative h-5 mb-2">
                      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-gray-200 rounded-full" />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-(--darkBlue) rounded-full"
                        style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
                      />
                      <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={PRICE_STEP} value={priceMin}
                        onChange={(e) => setPriceMin(Math.min(Number(e.target.value), priceMax - PRICE_STEP))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
                        style={{ zIndex: priceMin > PRICE_MAX - 10 * PRICE_STEP ? 5 : 3 }}
                      />
                      <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={PRICE_STEP} value={priceMax}
                        onChange={(e) => setPriceMax(Math.max(Number(e.target.value), priceMin + PRICE_STEP))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
                        style={{ zIndex: 4 }}
                      />
                      <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-(--darkBlue) pointer-events-none shadow-sm" style={{ left: `calc(${minPct}% - 8px)` }} />
                      <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-(--darkBlue) pointer-events-none shadow-sm" style={{ left: `calc(${maxPct}% - 8px)` }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl border-2 border-(--darkBlue) text-(--darkBlue) text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 rounded-xl bg-(--darkBlue) text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main FilterDropdown ──────────────────────────────────────────────────────

function FilterDropdown({ categories, values = {}, onChange }) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  if (!categories || categories.length === 0) return null;

  const resolveType = (cat) => {
    if (cat.type) return cat.type;
    if (cat.options && cat.options.length > 0) return "list";
    return null;
  };

  const handleCategoryClick = (cat) => {
    const type = resolveType(cat);
    if (!type) return;
    setActiveCategory(activeCategory?.label === cat.label ? null : cat);
  };

  const renderSidePanel = () => {
    if (!activeCategory) return null;
    const cat = activeCategory;
    const type = resolveType(cat);
    let content = null;

    if (type === "accordion") {
      content = (
        <AccordionPanel
          groups={cat.groups}
          value={values[cat.label]}
          onChange={(val) => onChange(cat.label, val)}
        />
      );
    } else if (type === "list") {
      content = (
        <ListPanel
          options={cat.options}
          value={values[cat.label]}
          onChange={(val) => {
            onChange(cat.label, val);
            setOpen(false);
            setActiveCategory(null);
          }}
        />
      );
    } else if (type === "calendar") {
      content = (
        <Calendar
          value={values[cat.label] || {}}
          onChange={(val) => onChange(cat.label, val)}
          onCancel={() => setActiveCategory(null)}
          onSave={(val) => {
            onChange(cat.label, val);
            setOpen(false);
            setActiveCategory(null);
          }}
        />
      );
    } else if (type === "priceRange") {
      content = (
        <PriceRangeFilter
          value={values[cat.label] || {}}
          onClose={() => setActiveCategory(null)}
          onReset={() => onChange(cat.label, null)}
          onApply={(val) => {
            onChange(cat.label, val);
            setOpen(false);
            setActiveCategory(null);
          }}
        />
      );
    }

    return (
      <div className="bg-white border border-gray-200 border-r-0 rounded-l-xl overflow-hidden shadow-sm">
        {content}
      </div>
    );
  };

  const hasSidePanel = !!activeCategory;

  return (
    <>
      {/* ── Trigger button ─────────────────────────────────────────────────── */}
      <div className="relative shrink-0" ref={ref}>
        {/* Mobile trigger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden flex items-center gap-2 px-3 py-1 bg-[#F1F5F9] border border-[#CBD5E1] rounded-md text-sm text-gray-600 font-medium cursor-pointer hover:bg-gray-200 transition-colors"
        >
          <Filter size={14} />
          Filter
        </button>

        {/* Desktop trigger + dropdown */}
        <button
          onClick={() => { setOpen(!open); setActiveCategory(null); }}
          className="hidden md:flex items-center gap-2 px-3 lg:px-4 py-1 lg:py-1.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-md text-sm text-gray-600 font-medium cursor-pointer hover:bg-gray-200 transition-colors"
        >
          <Filter size={14} />
          Filter
        </button>

        {open && (
          <div className="absolute top-[calc(100%+4px)] right-0 z-50 flex items-start">
            {renderSidePanel()}
            <div className={`w-52 bg-white border border-gray-200 overflow-hidden shadow-sm ${hasSidePanel ? "rounded-r-xl" : "rounded-xl"}`}>
              {categories.map((cat, i) => {
                const type = resolveType(cat);
                const expandable = !!type;
                const isActive = activeCategory?.label === cat.label;
                const hasValue = !!values[cat.label];
                return (
                  <button
                    key={cat.label}
                    onClick={() => handleCategoryClick(cat)}
                    disabled={!expandable}
                    className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                      expandable ? "hover:bg-gray-50 cursor-pointer" : "cursor-default"
                    } ${isActive ? "bg-gray-50" : ""} ${
                      i < categories.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <span className={hasValue ? "text-(--blue) font-semibold" : "text-gray-800"}>
                      {hasValue && cat.type !== "accordion" && cat.type !== "calendar" && cat.type !== "priceRange"
                        ? `${cat.label}: ${values[cat.label]}`
                        : cat.label}
                    </span>
                    {expandable && (
                      <ChevronRight
                        size={14}
                        className={`text-gray-400 shrink-0 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile bottom sheet ────────────────────────────────────────────── */}
      {mobileOpen && (
        <MobileFilterSheet
          categories={categories}
          values={values}
          onChange={onChange}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

export default FilterDropdown;
