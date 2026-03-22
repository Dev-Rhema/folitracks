import React from "react";

const Loader = ({ size, message = "Loading..." }) => {
  const isSmall = size === "small";
  
  return (
    <div className={`flex flex-col justify-center items-center h-full w-full ${isSmall ? "min-h-[40px]" : "min-h-[300px] flex-1 py-12"} animate-fadeIn`}>
      <div className={`relative flex items-center justify-center ${isSmall ? "w-8 h-8" : "w-14 h-14"}`}>
        <div className={`absolute inset-0 rounded-full border-t-2 border-r-2 border-b-transparent border-l-transparent border-(--blue) animate-spin`}></div>
        
        <div className={`absolute ${isSmall ? "inset-1" : "inset-3"} rounded-full border-b-2 border-l-2 border-t-transparent border-r-transparent border-(--blue) opacity-40 animate-spin-reverse`}></div>
        
        <div className={`rounded-full bg-(--blue) ${isSmall ? "w-1 h-1" : "w-2 h-2"} animate-pulse shadow-[0_0_15px_rgba(0,0,102,0.3)]`}></div>
      </div>
      
      {!isSmall && (
        <span className="mt-8 text-(--blue) font-semibold text-xs tracking-[0.2em] uppercase opacity-70 animate-pulse font-title">
          {message}
        </span>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Loader;
