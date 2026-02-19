import { ChevronLeft } from "lucide-react";

export default function AuthLayout({
  title,
  subtitle,
  children,
  onBack,
  titleClassName,
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Title & Subtitle */}
        <div className="mb-8">
          <h1
            className={
              titleClassName ||
              "text-3xl sm:text-4xl font-bold mb-3 text-center text-black"
            }
            style={{ fontFamily: "title" }}
          >
            {title}
          </h1>
          <p
            className="text-center text-sm sm:text-base text-gray-600"
            style={{ fontFamily: "body" }}
          >
            {subtitle}
          </p>
        </div>

        {children}
      </div>

      {/* Footer with Back Button */}
      {onBack && (
        <div className="border-t border-gray-200 mt-12 pt-6 pb-6">
          <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2 cursor-pointer"
            >
              <ChevronLeft size={20} /> Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
