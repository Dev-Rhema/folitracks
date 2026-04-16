import { useState } from "react";
import { X, CalendarDays, CheckCircle2 } from "lucide-react";
import Calendar from "../../../../../components/ui/Calendar";
import usePost from "../../../../../hooks/usePost";
import { useAdminRescheduleServiceHistoryMutation } from "../../../../../redux/api/serviceHistoryApiSlice";
import CTA from "../../../../../components/CTA";


function ModalSheet({ onBackdropClick, children, centered = false }) {
    return (
        <div
            className={`fixed inset-0 z-50 flex bg-black/40 ${centered ? "items-center justify-center" : "items-end md:items-center justify-center"}`}
            onClick={onBackdropClick}
        >
            <div
                className={`bg-white shadow-lg w-full animate-slide-up md:animate-none ${centered
                    ? "rounded-2xl max-w-sm mx-4"
                    : "rounded-t-3xl md:rounded-2xl md:max-w-sm md:mx-4"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

export default function RescheduleServiceModal({ row, onClose }) {
    const [step, setStep] = useState("form");
    const [newDate, setNewDate] = useState(null);

    const { postData: rescheduleService, isLoading: isRescheduling } = usePost(useAdminRescheduleServiceHistoryMutation);

    const handleSave = async () => {
        try {
            await rescheduleService({
                id: row._id,
                body: { serviceDate: newDate }
            });
            // setStep("success");
            onClose();
        } catch (error) {
            console.error("Reschedule failed:", error);
        }
    };

    const currentDate = row?.vehicle?.nextServiceDate?.split("T")[0] || row?.vehicle?.missedServiceDate?.split("T")[0] || "—";
    const vehicleName = row?.vehicle?.vehicleName || row?.vehicleName || "your vehicle";
    const serviceName = row?.service || row?.serviceName || "Service";

    const formatDisplay = (iso) => {
        if (!iso) return "";
        const [y, m, d] = iso.split("-");
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
    };

    // if (step === "success") {
    //     return (
    //         <ModalSheet onBackdropClick={onClose}>
    //             <div className="p-8 flex flex-col items-center text-center">
    //                 <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-5">
    //                     <CheckCircle2 size={36} className="text-green-500" />
    //                 </div>
    //                 <h2 className="text-lg font-bold text-gray-900 mb-2">Service Rescheduled Successfully</h2>
    //                 <p className="text-sm text-gray-500 mb-8">
    //                     The {serviceName} for {vehicleName} has been updated with the new service date.
    //                 </p>

    //                 <button
    //                     onClick={onClose}
    //                     className="w-full py-3 rounded-xl bg-(--darkBlue) text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
    //                 >
    //                     Close
    //                 </button>
    //             </div>
    //         </ModalSheet>
    //     );
    // }

    if (step === "calendar") {
        return (
            <ModalSheet onBackdropClick={() => setStep("form")}>
                <Calendar
                    singleDate
                    value={newDate}
                    onChange={setNewDate}
                    onCancel={() => { setStep("form"); setNewDate(null) }}
                    onSave={(date) => { setNewDate(date); setStep("form"); }}
                    className="w-full"
                />
            </ModalSheet>
        );
    }

    return (
        <ModalSheet onBackdropClick={onClose}>
            <div className="flex items-center justify-between px-5 pt-5">
                <div>
                    <h2 className="text-base font-bold text-gray-900">Reschedule Service</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Pick a new date for this service.</p>
                </div>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
                    <X size={18} className="text-gray-500" />
                </button>
            </div>

            <div className="px-5 py-5 flex flex-col gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Current Service Date</label>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 cursor-not-allowed">
                        <span className="text-sm text-gray-400">{currentDate}</span>
                        <CalendarDays size={16} className="text-gray-300" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">New Service Date</label>
                    <button
                        onClick={() => setStep("calendar")}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
                    >
                        <span className={`text-sm ${newDate ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                            {newDate ? formatDisplay(newDate) : "Select new service date"}
                        </span>

                        <CalendarDays size={16} className="text-gray-400" />
                    </button>
                </div>
            </div>

            <div className="px-5 pb-5 flex justify-end gap-3">
                <CTA
                    name="Cancel"
                    onClick={() => { onClose(); setNewDate(null) }}
                    color="blue"
                    variant="outline"
                />

                <CTA
                    onClick={handleSave}
                    disabled={!newDate || isRescheduling}
                    color="blue"
                    isLoading={isRescheduling}
                    name={isRescheduling ? "Saving..." : "Save"}
                />
            </div>
        </ModalSheet>
    );
}
