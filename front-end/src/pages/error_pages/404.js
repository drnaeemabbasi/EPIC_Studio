// NotFound.js
import React from "react";
import { Link } from "react-router-dom"; // If using React Router

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link> {/* Redirect to home or another page */}
    </div>
  );
};

export default NotFound;

// <div className="grid grid-cols-12 gap-4">
//               {formData[rowNumber] &&
//                 Object.entries(formData[rowNumber]).map(
//                   ([fieldName, value], index) => (
//                     <div key={index} className="relative w-full">
//                       <label
//                         htmlFor={`field-${index}`}
//                         className="block text-gray-700 font-semibold mb-2 flex items-center"
//                       >
//                         {fieldName}
//                         {descriptions[fieldName] && (
//                           <span
//                             className="ml-2 text-blue-500 cursor-pointer"
//                             onClick={() => toggleDescription(fieldName)}
//                           >
//                             <FontAwesomeIcon icon={faInfoCircle} />
//                           </span>
//                         )}
//                       </label>
//                       <input
//                         id={`field-${index}`}
//                         type="text"
//                         value={value || ""}
//                         onChange={(event) =>
//                           handleInputChange(event, rowNumber, fieldName)
//                         } // Use rowNumber dynamically
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
//                       />
//                       {expandedField === fieldName && (
//                         <div
//                           id={`desc-${fieldName}`}
//                           className="absolute bg-gray-100 transition-all duration-400 rounded-md shadow-lg p-4 mt-2 z-10 w-full"
//                         >
//                           <p>{descriptions[fieldName]}</p>
//                           <button
//                             type="button"
//                             className="absolute top-0 right-0 text-red-500 cursor-pointer"
//                             onClick={() => toggleDescription(fieldName)}
//                           >
//                             <FontAwesomeIcon icon={faWindowClose} />
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )
//                 )}
//             </div>
//             )}
