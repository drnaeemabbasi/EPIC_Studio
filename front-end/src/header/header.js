import React from "react";
import { FaBell, FaCog } from "react-icons/fa"; // Example icons from react-icons
import profile_icon from "../assets/profile_icon.jpg";
import Agrifile_logo from "../assets/agrifile_logo.png";
import epic_logo from "../assets/epic_logo.png";

// import tealClimateLogo2 from "../../assets/teal-climate-logo-2.svg";

// const Header = ({ userImage, userName }) => {
//   return (
//     <header className="flex items-center justify-between bg-gray-800 text-white p-4 shadow-md">
//       {/* Left section with user profile image */}
//       <div className="flex items-center">
//         <img
//           src={userImage}
//           alt={`${userName}'s profile`}
//           className="w-10 h-10 rounded-full mr-3 border-2 border-tc-green" // Adjust the border color
//         />
//         <span className="text-lg font-semibold">{userName}</span>
//       </div>

//       {/* Right section for icons (optional) */}
//       <div className="flex items-center">
//         <button className="relative p-2 hover:bg-gray-700 rounded-full transition">
//           <FaBell className="text-xl" />
//           <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
//             3
//           </span>{" "}
//           {/* Notification count */}
//         </button>
//         <button className="p-2 hover:bg-gray-700 rounded-full transition">
//           <FaCog className="text-xl" />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

import Logo from "./../components/ui/Logo";

const Header = () => {
  return (
    <header className="w-full text-white bg-white py-4 flex items-center justify-between text-white shadow-md px-8  shadow-md">
      <div className="flex items-center">
        {/* <img src="https://via.placeholder.com/50" alt="Logo" className="mr-4" /> */}
        {/* <Logo /> */}
      </div>
      {/* Right section for icons (optional) */}
      <div className="flex items-center">
        {/* <img
          src={profile_icon}
          alt={` profile`}
          className="w-10 h-10 rounded-full mr-3 border-2 border-tc-green" // Adjust the border color
        />
        <button className="relative p-2 hover:bg-gray-700 rounded-full transition">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
            3
          </span>{" "}
        </button> */}

        <img
          src={epic_logo}
          alt={` profile`}
          className="h-12  mr-10 " // Adjust the border color
        />
        <img
          src={Agrifile_logo}
          alt={` profile`}
          className="h-12  mr-3 " // Adjust the border color
        />
      </div>
    </header>
  );
};

export default Header;

// import React from "react";
// import { FaBell, FaCog } from "react-icons/fa";
// import profile_icon from "../assets/profile_icon.jpg";
// import Agrifile_logo from "../assets/agrifile_logo.png";
// import epic_logo from "../assets/epic_logo.png";

// const Header = () => {
//   return (
//     <header className="w-full bg-white text-gray-800 py-4 flex items-center justify-between shadow-md px-8">
//       {/* Left section with logo */}
//       <div className="flex items-center">
//         <img src={epic_logo} alt="EPIC Logo" className="h-10 mr-4" />
//         <h1 className="text-xl font-bold tracking-wider text-gray-700">EPIC Studio</h1>
//       </div>

//       {/* Right section with icons and additional logos */}
//       <div className="flex items-center space-x-4">
//         <img src={Agrifile_logo} alt="Agrifile Logo" className="h-8 mr-4" />
//         <button className="p-2 hover:bg-gray-200 rounded-full transition">
//           <FaBell className="text-xl text-gray-600" />
//           <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">3</span>
//         </button>
//         <button className="p-2 hover:bg-gray-200 rounded-full transition">
//           <FaCog className="text-xl text-gray-600" />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;
