import React from "react";
import Logo from "../components/ui/Logo";
import Logo2 from "../assets/logo2.png";

const Bottom = () => {
  return (
    <footer className="w-full bg-white text-gray-800 shadow-inner mt-8 z-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left side: Beta badge */}
        <div className="mb-4 md:mb-0">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded shadow">
            BETA VERSION!!
          </span>
        </div>

        {/* Right side: Logos and branding */}
        <div className="flex flex-col md:flex-row justify-end items-center">
          <p className="text-gray-700 mb-2 md:mb-0">Powered by</p>
          <div className="flex items-center space-x-4 ml-4">
            <Logo />
          </div>
          <div className="flex items-center border border-gray-300 px-4 py-2 rounded-md ml-4">
            {/* <img src={Logo2} alt="Canadian Flag" className="h-5" /> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Bottom;
