import { useState, useEffect, useRef } from "react";
import { MoreVertical, ChevronRight } from "lucide-react";

export default function TableActionMenu({ actions, row }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [position, setPosition] = useState("down");
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setOpenSubMenu(null);
      return;
    }

    // Smart positioning logic
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      if (spaceBelow < 0 && spaceAbove > rect.height) {
        setPosition("up");
      } else {
        setPosition("down");
      }
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    if (action.subActions) {
      setOpenSubMenu(openSubMenu === action.label ? null : action.label);
    } else {
      action.onClick(row);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-right" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 hover:bg-gray-200 rounded-full transition inline-flex items-center justify-center cursor-pointer"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div 
          ref={dropdownRef}
          className={`absolute ${position === "up" ? "bottom-[calc(100%+4px)]" : "top-[calc(100%+4px)]"} right-0 z-50 w-48 bg-white border border-gray-200 rounded-xl shadow-xl animate-in fade-in zoom-in duration-200`}
        >
          <div className="py-1">
            {actions.map((action, index) => (
              <div key={index} className="relative">
                <button
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer font-body flex items-center justify-between ${
                    index === 0 ? "rounded-t-xl" : ""
                  } ${
                    index === actions.length - 1 ? "rounded-b-xl" : ""
                  } ${
                    index !== actions.length - 1 ? "border-b border-gray-50" : ""
                  } ${action.className || "text-gray-800"}`}
                  onClick={(e) => handleActionClick(e, action)}
                >
                  <span>{action.label}</span>
                  {action.subActions && <ChevronRight size={14} className="text-gray-400" />}
                </button>

                {action.subActions && openSubMenu === action.label && (
                  <div className="absolute top-0 right-full mr-1 w-44 bg-white border border-gray-200 rounded-xl shadow-2xl py-1 z-[60]">
                    {action.subActions.map((subAction, subIndex) => (
                      <button
                        key={subIndex}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer font-body ${
                          subIndex === 0 ? "rounded-t-xl" : ""
                        } ${
                          subIndex === action.subActions.length - 1 ? "rounded-b-xl" : ""
                        } ${
                          subIndex !== action.subActions.length - 1 ? "border-b border-gray-50" : ""
                        } ${subAction.className || "text-gray-800"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          subAction.onClick(row);
                          setIsOpen(false);
                        }}
                      >
                        {subAction.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
