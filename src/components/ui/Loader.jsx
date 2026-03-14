import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-full w-full min-h-[200px]">
            <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-t-[#080E2B] border-r-transparent border-b-[#080E2B] border-l-transparent animate-spin"></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-t-transparent border-r-[#24243E] border-b-transparent border-l-[#24243E] animate-spin-reverse"></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#080E2B] rounded-full animate-pulse shadow-[0_0_10px_rgba(8,14,43,0.5)]"></div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes spin-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
      `}} />
        </div>
    );
};

export default Loader;
