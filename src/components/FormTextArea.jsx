function FormTextarea({ label,
    name,
    placeholder,
    required = false,
    error,
    ...props }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <textarea
                placeholder={placeholder}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg bg-[#f1f5fb] focus:outline-none text-sm resize-none ${error ? "border-red-500" : "border-gray-300"
                    }`}
                {...props}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

export default FormTextarea;
