import { useState, useEffect, useRef } from "react";
import { Filter, ChevronRight } from "lucide-react";
import Calendar from "./Calendar";
import PriceRangeFilter from "./PriceRangeFilter";

// ─── Accordion panel (Service Type) ──────────────────────────────────────────

function AccordionPanel({ groups, value, onChange }) {
  const [expanded, setExpanded] = useState(value?.group ?? null);

  const handleGroupClick = (group) => {
    const isExpanding = expanded !== group.label;
    setExpanded(isExpanding ? group.label : null);
    // Selecting the group header sets filter to the whole group
    onChange(isExpanding ? { group: group.label, service: null } : null);
  };

  const handleServiceClick = (groupLabel, service) => {
    const isSelected = value?.service === service;
    onChange(isSelected ? null : { group: groupLabel, service });
  };

  return (
    <div className="w-52">
      {groups.map((group, gi) => {
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
                {group.services.map((service, si) => {
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

// ─── Main FilterDropdown ──────────────────────────────────────────────────────

/**
 * categories: [{
 *   label: string,
 *   type?: "list" | "accordion" | "calendar" | "priceRange",
 *   options?: string[],   // for type="list" (or default when type omitted)
 *   groups?: [{ label, services }], // for type="accordion"
 * }]
 * values:   { [label]: any }
 * onChange: (label, value) => void
 */
function FilterDropdown({ categories, values = {}, onChange }) {
  const [open, setOpen]               = useState(false);
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
    if (!type) return; // non-expandable placeholder
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
    <div className="relative shrink-0" ref={ref}>
      {/* Trigger button */}
      <button
        onClick={() => { setOpen(!open); setActiveCategory(null); }}
        className="flex items-center gap-2 px-3 lg:px-4 py-1 lg:py-1.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-md text-sm text-gray-600 font-medium cursor-pointer hover:bg-gray-200 transition-colors"
      >
        <Filter size={14} />
        Filter
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] right-0 z-50 flex items-start">
          {/* Side panel (left) */}
          {renderSidePanel()}

          {/* Main panel (right) */}
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
  );
}

export default FilterDropdown;
