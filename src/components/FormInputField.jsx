import { forwardRef } from "react";

const FormInputField = forwardRef(({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  error,
  ...props
}, ref) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <input
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg bg-[#f1f5fb] focus:outline-none text-sm ${
          error ? "border-red-500" : "border-gray-200"
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
});

export default FormInputField;
