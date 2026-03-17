import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePost from "../../../../../hooks/usePost";
import useGet from "../../../../../hooks/useGet";
import { useAdminAddServiceHistoryMutation } from "../../../../../redux/api/serviceHistoryApiSlice";
import { useAdminGetVehiclesQuery } from "../../../../../redux/api/vehicleApiSlice";
import { step2Schema } from "./constants";
import ChooseVehicle from "./ChooseVehicle";
import ServiceDetails from "./ServiceDetails";
import Success from "./Success";

export default function AddLog({ onClose, onLogAdded }) {
  const [step, setStep] = useState(1);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const { data: vehiclesData, loading: vehiclesLoading } = useGet(useAdminGetVehiclesQuery);
  const vehicles = Array.isArray(vehiclesData)
    ? vehiclesData
    : vehiclesData?.vehicles || vehiclesData?.data || [];

  const { postData: addServiceHistory, isLoading: isSubmitting } = usePost(useAdminAddServiceHistoryMutation);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
    defaultValues: {
      serviceType: "",
      service: "",
      serviceDate: "",
      serviceProvider: "",
      serviceProviderPhone: "",
      cost: "",
      serviceNotes: "",
    },
  });

  const selectedVehicle = vehicles.find((v) => (v._id || v.id) === selectedVehicleId);

  console.log(selectedVehicle);

  const handleNext = () => {
    if (selectedVehicleId) setStep(2);
  };

  const onSubmit = async (data) => {
    const payload = {
      vehicle: selectedVehicleId,
      service: data.service,
      serviceDate: data.serviceDate,
      serviceType: data.serviceType,
      serviceProvider: data.serviceProvider,
      serviceNotes: data.serviceNotes,
      cost: Number(data.cost) || 0,
      serviceProviderPhone: data.serviceProviderPhone,
    };

    const response = await addServiceHistory(payload, "Service record added successfully!");
    if (response) {
      setSubmittedData({ ...data, vehicle: selectedVehicle });
      onLogAdded?.(response);
      setStep(3);
    }
  };

  const handleLogAnother = () => {
    setStep(2);
    setSelectedVehicleId(selectedVehicleId);
    reset();
    setSubmittedData(null);
  };

  return (
    <div className="flex flex-col gap-5 flex-1 relative">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-900 font-bold text-xl w-fit hover:opacity-75 transition cursor-pointer mt-2 mb-1"
      >
        <ArrowLeft size={22} strokeWidth={2.5} />
        {step === 3 ? "Back to Service History" : "Service Record Form"}
      </button>

      <div className="border border-gray-200 rounded-2xl p-6 flex-1 bg-white" style={{ fontFamily: "body" }}>
        {step === 1 && (
          <ChooseVehicle
            vehicles={vehicles}
            vehiclesLoading={vehiclesLoading}
            selectedVehicleId={selectedVehicleId}
            onSelect={setSelectedVehicleId}
            onNext={handleNext}
            onClose={onClose}
          />
        )}

        {step === 2 && (
          <ServiceDetails
            selectedVehicle={selectedVehicle}
            register={register}
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            onBack={() => setStep(1)}
            onClose={onClose}
          />
        )}

        {step === 3 && (
          <Success
            submittedData={submittedData}
            onClose={onClose}
            onLogAnother={handleLogAnother}
          />
        )}
      </div>
    </div>
  );
}
