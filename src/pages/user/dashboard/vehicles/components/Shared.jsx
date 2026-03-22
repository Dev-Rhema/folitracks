export function VehicleInput({ label, labelExtra, error, ...inputProps }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {labelExtra && (
          <span className="text-gray-400 font-normal italic ml-1">{labelExtra}</span>
        )}
      </label>
      <input
        {...inputProps}
        className={`w-full px-4 py-3 bg-gray-100 border rounded text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 ${
          error ? "border-red-400" : "border-gray-200"
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function StepHeader({ step, title, subtitle, onClose }) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="text-base font-bold text-gray-900">
          Step {step}: {title}
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 text-xl leading-none ml-6 mt-0.5 cursor-pointer"
      >
        ×
      </button>
    </div>
  );
}

export function UploadField({ label, fieldId, fileName, onFileChange, error, isLoading }) {
  return (
    <div>
      {/* FileUploadField is imported by the consumer to avoid circular deps */}
      {error && <p className="text-xs text-red-500 -mt-4 mb-4">{error}</p>}
    </div>
  );
}

export function PrivacyNotice() {
  return (
    <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-lg p-4 mt-2">
      <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <p className="text-sm text-blue-600 leading-relaxed">
        Your privacy is important to us. The documents you upload are only used
        to confirm your vehicle details and ownership. We do not share your
        information with third parties. All data is securely stored and protected.
      </p>
    </div>
  );
}
