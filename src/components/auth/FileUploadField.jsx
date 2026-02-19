import { Upload, FileText } from "lucide-react";

export default function FileUploadField({
  label,
  fieldId,
  fileName,
  onFileChange,
}) {
  const handleClick = () => {
    document.getElementById(fieldId).click();
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded p-6 sm:p-8 text-center">
        {fileName ? (
          <div className="bg-black text-white p-3 rounded inline-flex items-center gap-2">
            <FileText size={18} /> {fileName}
          </div>
        ) : (
          <>
            <Upload size={32} className="mx-auto mb-2 text-gray-400" />
            <p className="text-xs sm:text-sm">
              <button
                type="button"
                onClick={handleClick}
                className="text-blue-900 font-semibold hover:underline cursor-pointer"
              >
                Click to Upload
              </button>{" "}
              or drag and drop
            </p>
          </>
        )}
        <input
          type="file"
          id={fieldId}
          onChange={onFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </div>
    </div>
  );
}
