import { Upload, FileText } from "lucide-react";
import { useState, useEffect } from "react";

export default function FileUploadField({
  label,
  fieldId,
  fileName,
  onFileChange,
}) {
  const [preview, setPreview] = useState(null);

  const handleClick = () => {
    document.getElementById(fieldId).click();
  };

  useEffect(() => {
    if (fileName instanceof File) {
      const isImage = fileName.type.startsWith("image/");
      if (isImage) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(fileName);
      }
    }
  }, [fileName]);

  // Parse file info from fileName (expecting File object or string)
  const getFileInfo = () => {
    if (!fileName) return null;

    // If it's a File object
    if (fileName instanceof File) {
      const name = fileName.name;
      const size = fileName.size;
      const type = name.split(".").pop()?.toUpperCase() || "FILE";

      // Format file size
      const formatSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
          Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
        );
      };

      return { name, size: formatSize(size), type };
    }

    // If it's a string filename
    return { name: fileName, size: "", type: "" };
  };

  const fileInfo = getFileInfo();
  const isImage =
    fileName instanceof File && fileName.type.startsWith("image/");

  const renderFileInfo = () => (
    <div className="bg-black text-white p-4 rounded-b inline-flex items-center gap-3 w-full group-hover:bg-gray-900 transition-colors">
      <FileText size={24} className="flex-shrink-0" />
      <div className="text-left">
        <p className="font-medium">{fileInfo.name}</p>
        <p className="text-xs text-gray-300">
          {fileInfo.size} • {fileInfo.type}
        </p>
      </div>
    </div>
  );

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded p-6 sm:p-8 text-center">
        {fileInfo ? (
          <div className="w-full">
            {isImage && preview ? (
              <div onClick={handleClick} className="cursor-pointer group">
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-40 rounded-t mb-0 object-cover group-hover:opacity-75 transition-opacity"
                  />
                </div>
                {renderFileInfo()}
              </div>
            ) : (
              <div
                onClick={handleClick}
                className="cursor-pointer group bg-black text-white p-4 rounded-lg inline-flex items-center gap-3 hover:bg-gray-900 transition-colors"
              >
                <FileText size={24} className="flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium">{fileInfo.name}</p>
                  <p className="text-xs text-gray-300">
                    {fileInfo.size} • {fileInfo.type}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Upload size={32} className="mx-auto mb-2 text-gray-400" />
            <p className="text-xs sm:text-sm">
              <button
                type="button"
                onClick={handleClick}
                className="text-blue-900 font-bold underline hover:underline cursor-pointer"
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
