import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreVertical, ChevronRight } from "lucide-react";

export default function TableActionMenu({ actions, row }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="p-1 hover:bg-gray-100 rounded-full transition inline-flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-[100] min-w-[192px] bg-white border border-gray-200 rounded-xl shadow-xl py-1 animate-in fade-in zoom-in duration-200 focus:outline-none"
          sideOffset={5}
          align="end"
          collisionPadding={10}
          onClick={(e) => e.stopPropagation()}
        >
          {actions.map((action, index) => (
            <div key={index}>
              {action.subActions ? (
                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer font-body flex items-center justify-between outline-none data-[state=open]:bg-gray-50 ${action.className || "text-gray-800"}`}
                  >
                    <span>{action.label}</span>
                    <ChevronRight size={14} className="text-gray-400" />
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                      className="z-[110] min-w-[176px] bg-white border border-gray-200 rounded-xl shadow-2xl py-1 animate-in fade-in zoom-in duration-200 focus:outline-none"
                      sideOffset={2}
                      alignOffset={-5}
                    >
                      {action.subActions.map((subAction, subIndex) => (
                        <DropdownMenu.Item
                          key={subIndex}
                          className={`px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer outline-none font-body ${subAction.className || "text-gray-800"}`}
                          onSelect={() => subAction.onClick(row)}
                        >
                          {subAction.label}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Portal>
                </DropdownMenu.Sub>
              ) : (
                <DropdownMenu.Item
                  className={`px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer outline-none font-body ${action.className || "text-gray-800"}`}
                  onSelect={() => action.onClick(row)}
                >
                  {action.label}
                </DropdownMenu.Item>
              )}
              {index !== actions.length - 1 && (
                <DropdownMenu.Separator className="h-px bg-gray-100 mx-1" />
              )}
            </div>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
