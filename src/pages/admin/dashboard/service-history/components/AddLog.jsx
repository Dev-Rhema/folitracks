import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePost from "../../../../../hooks/usePost";
import useGet from "../../../../../hooks/useGet";
import { useAdminAddServiceHistoryMutation, useAdminChangeServiceStatusMutation } from "../../../../../redux/api/serviceHistoryApiSlice";
import { useAdminGetVehiclesQuery } from "../../../../../redux/api/vehicleApiSlice";
import { step2Schema } from "../constants";
import ChooseVehicle from "./ChooseVehicle";
import ServiceDetails from "./ServiceDetails";
import Success from "./Success";

export default function AddLog({ onClose, onLogAdded, initialData }) {
  const isEdit = !!initialData;
  const [step, setStep] = useState(isEdit ? 2 : 1);
  const [selectedVehicle, setSelectedVehicle] = useState(initialData?.vehicle || null);
  const [submittedData, setSubmittedData] = useState(null);

  const [page, setPage] = useState(1);
  const [vehicles, setVehicles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: vehiclesData, loading: vehiclesLoading } = useGet(useAdminGetVehiclesQuery, { page, limit: 10, search: searchTerm });

  useEffect(() => {
    if (vehiclesData?.vehicles) {
      setVehicles((prev) => {
        const newVehicles = vehiclesData.vehicles;
        // avoid duplicates if same page is refetched
        const existingIds = new Set(prev.map(v => v._id || v.id));
        const uniqueNew = newVehicles.filter(v => !existingIds.has(v._id || v.id));
        return [...prev, ...uniqueNew];
      });
      setHasMore(vehiclesData.page < vehiclesData.totalPages);
    }
  }, [vehiclesData]);

  const handleLoadMore = () => {
    if (!vehiclesLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    setVehicles([]); // Clear current list to load search results
    setPage(1);      // Reset to first page
  };

  const { postData: addServiceHistory, isLoading: isAdding } = usePost(useAdminAddServiceHistoryMutation);
  const { postData: updateServiceHistory, isLoading: isUpdating } = usePost(useAdminChangeServiceStatusMutation);

  const isSubmitting = isAdding || isUpdating;

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
    defaultValues: {
      serviceType: initialData?.serviceType || "",
      service: initialData?.service || "",
      serviceDate: initialData?.serviceDate || "",
      serviceProvider: initialData?.serviceProvider || "",
      serviceProviderPhone: initialData?.serviceProviderPhone || "",
      cost: initialData?.cost || "",
      serviceNotes: initialData?.serviceNotes || "",
    },
  });

  console.log(initialData);

  const handleNext = () => {
    if (selectedVehicle) setStep(2);
  };

  const onSubmit = async (data) => {
    const payload = {
      vehicle: selectedVehicle?._id || selectedVehicle?.id,
      service: data.service,
      serviceDate: data.serviceDate,
      serviceType: data.serviceType,
      serviceProvider: data.serviceProvider,
      serviceNotes: data.serviceNotes,
      cost: Number(data.cost) || 0,
      serviceProviderPhone: data.serviceProviderPhone,
    };

    let response;
    if (isEdit) {
      response = await updateServiceHistory({ id: initialData._id || initialData.id, body: payload }, "Service record updated successfully!");
    } else {
      response = await addServiceHistory(payload, "Service record added successfully!");
    }

    if (response) {
      setSubmittedData({ ...data, vehicle: selectedVehicle });
      onLogAdded?.(response);
      setStep(3);
    }
  };

  const handleLogAnother = () => {
    if (isEdit) {
      onClose();
    } else {
      setStep(2);
      // selectedVehicle stays the same
      reset();
      setSubmittedData(null);
    }
  };

  return (
    <div className="flex flex-col gap-5 flex-1 relative">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-900 font-bold text-xl w-fit hover:opacity-75 transition cursor-pointer mt-2 mb-1"
      >
        <ArrowLeft size={22} strokeWidth={2.5} />
        {step === 3 ? "Back to Service History" : isEdit ? "Edit Service Record" : "Service Record Form"}
      </button>

      <div className="border border-gray-200 rounded-2xl p-6 flex-1 bg-white" style={{ fontFamily: "body" }}>
        {step === 1 && (
          <ChooseVehicle
            vehicles={vehicles}
            vehiclesLoading={vehiclesLoading}
            selectedVehicle={selectedVehicle}
            onSelect={setSelectedVehicle}
            onNext={handleNext}
            onClose={onClose}
            onLoadMore={handleLoadMore}
            onSearch={handleSearch}
            hasMore={hasMore}
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
            onBack={isEdit ? null : () => setStep(1)}
            onClose={onClose}
          />
        )}

        {step === 3 && (
          <Success
            submittedData={submittedData}
            onClose={onClose}
            onLogAnother={handleLogAnother}
            isEdit={isEdit}
          />
        )}
      </div>
    </div>
  );
}
