import React from "react";

const Loader = ({ size = "default" }) => {
  const isSmall = size === "small";
  
  return (
    <div className={`flex justify-center items-center h-full w-full ${isSmall ? "min-h-[40px]" : "min-h-[100px]"}`}>
      <div className={`relative ${isSmall ? "w-8 h-8" : "w-16 h-16"}`}>
        {/* Outer Ring */}
        <div className={`absolute inset-0 rounded-full border-${isSmall ? "2" : "4"} border-t-[#080E2B] border-r-transparent border-b-[#080E2B] border-l-transparent animate-spin`}></div>

        {/* Inner Ring */}
        <div className={`absolute ${isSmall ? "inset-1.5" : "inset-3"} rounded-full border-${isSmall ? "2" : "4"} border-t-transparent border-r-[#24243E] border-b-transparent border-l-[#24243E] animate-spin-reverse`}></div>

        {/* Center Dot */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isSmall ? "w-1 h-1" : "w-2 h-2"} bg-[#080E2B] rounded-full animate-pulse shadow-[0_0_10px_rgba(8,14,43,0.5)]`}></div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Loader;
