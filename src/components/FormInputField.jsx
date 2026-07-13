import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FormInputField = forwardRef(({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  error,
  disabled,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          ref={ref}
          type={showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 border rounded-lg bg-[#f1f5fb] focus:outline-none text-sm ${error ? "border-red-500" : "border-gray-200"
            } ${disabled ? "cursor-not-allowed" : ""}`}
          {...props}
        />

        {type === "password" && <div className="absolute right-2 top-[12px] cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff /> : <Eye />}
        </div>}
      </div>


      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
});

export default FormInputField;
