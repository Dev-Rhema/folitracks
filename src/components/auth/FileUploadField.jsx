import { Upload, FileText, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function FileUploadField({
  label,
  fieldId,
  fileName,
  onFileChange,
  isLoading,
  isPreviewOnly = false,
  previewUrl = null,
}) {
  const [preview, setPreview] = useState(previewUrl);

  const handleClick = () => {
    if (isLoading || isPreviewOnly) return;
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
    } else if (typeof fileName === "string" && fileName.startsWith("http")) {
      setPreview(fileName);
    } else if (previewUrl) {
      setPreview(previewUrl);
    }
  }, [fileName, previewUrl]);

  // Parse file info from fileName (expecting File object or string)
  const getFileInfo = () => {
    if (!fileName && !previewUrl) return null;

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

    // If it's a string URL
    const url = fileName || previewUrl;
    if (typeof url === "string") {
      const name = url.split("/").pop() || "Document";
      return { name, size: "Uploaded File", type: name.split(".").pop()?.toUpperCase() || "" };
    }

    return null;
  };

  const fileInfo = getFileInfo();
  const isImageFile = fileName instanceof File && fileName.type.startsWith("image/");
  const isImageUrl = typeof (fileName || previewUrl) === "string" && (fileName || previewUrl).match(/\.(jpg|jpeg|png|gif|webp)/i);
  const showPreview = isImageFile || isImageUrl;

  const renderFileInfo = () => (
    <div className={`bg-black text-white p-4 rounded-b inline-flex items-center gap-3 w-full ${!isPreviewOnly ? 'group-hover:bg-gray-900 transition-colors' : ''}`}>
      <FileText size={24} className="shrink-0" />
      <div className="text-left flex-1 min-w-0">
        <p className="font-medium truncate">{fileInfo.name}</p>
        <p className="text-xs text-gray-300">
          {fileInfo.size} {fileInfo.size && fileInfo.type ? "•" : ""} {fileInfo.type}
        </p>
      </div>
      {isLoading && <Loader2 size={20} className="animate-spin text-blue-400" />}
    </div>
  );

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className={`border-2 border-dashed rounded text-center transition-colors ${isLoading ? 'border-blue-300 bg-blue-50/10' : 'border-gray-300'} ${isPreviewOnly ? 'border-gray-100 bg-gray-50/10 cursor-default' : ''}`}>
        {fileInfo ? (
          <div className="w-full">
            {showPreview && preview ? (
              <div onClick={handleClick} className={`${isPreviewOnly ? 'cursor-default' : 'cursor-pointer group'} ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className={`w-full h-40 rounded-t mb-0 object-cover ${!isPreviewOnly ? 'group-hover:opacity-75 transition-opacity' : ''}`}
                  />
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Loader2 size={40} className="animate-spin text-white" />
                    </div>
                  )}
                </div>
                {renderFileInfo()}
              </div>
            ) : (
              <div
                onClick={handleClick}
                className={`${isPreviewOnly ? 'cursor-default' : 'cursor-pointer group hover:bg-gray-900'} bg-black text-white p-4 rounded-lg inline-flex items-center gap-3 transition-colors w-full ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
              >
                <FileText size={24} className="shrink-0" />
                <div className="text-left flex-1 min-w-0">
                  <p className="font-medium truncate">{fileInfo.name}</p>
                  <p className="text-xs text-gray-300">
                    {fileInfo.size} {fileInfo.size && fileInfo.type ? "•" : ""} {fileInfo.type}
                  </p>
                </div>
                {isLoading && <Loader2 size={20} className="animate-spin text-blue-400" />}
              </div>
            )}
          </div>
        ) : (
          <div className="min-h-[160px] flex flex-col items-center justify-center p-4">
            {isLoading ? (
              <Loader2 size={32} className="animate-spin text-blue-500 mb-2" />
            ) : (
              <Upload size={32} className="mx-auto mb-2 text-gray-400" />
            )}
            {!isPreviewOnly && (
              <p className="text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={handleClick}
                  disabled={isLoading}
                  className={`text-blue-900 font-bold underline hover:underline cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
                >
                  {isLoading ? "Uploading..." : "Click to Upload"}
                </button>{" "}
                {!isLoading && "or drag and drop"}
              </p>
            )}
            {isPreviewOnly && (
              <p className="text-sm text-gray-400">No document uploaded</p>
            )}
          </div>
        )}
        <input
          type="file"
          id={fieldId}
          onChange={onFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          disabled={isLoading || isPreviewOnly}
        />
      </div>
    </div>
  );
}
