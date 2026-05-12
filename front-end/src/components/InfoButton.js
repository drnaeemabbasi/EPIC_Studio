import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { useValidation } from "../hooks/useValidation";

const InfoButton = ({ fieldKey, description: propDescription }) => {
  const [expanded, setExpanded] = useState(false);
  const validation = useValidation(fieldKey);
  const containerRef = useRef(null);

  // Fallback to prop description if validation is missing
  const descText = validation ? validation.description : (propDescription || "");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (expanded && containerRef.current && !containerRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };

    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded]);

  if (!descText) return null;

  return (
    <div 
      className="relative inline-block ml-2" 
      ref={containerRef}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <span
        className="text-indigo-400 hover:text-indigo-600 cursor-help transition-colors"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setExpanded(!expanded);
        }}
        onMouseOver={(e) => {
          e.target.title = expanded ? "" : descText.substring(0, 40) + "...";
        }}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
      </span>

      <div
        className={`absolute z-50 transition-all duration-300 ease-in-out bg-slate-800 text-slate-100 rounded-lg shadow-xl border border-slate-700 w-80 ${
          expanded
            ? "max-h-[500px] opacity-100 p-4 mt-2 overflow-y-auto"
            : "max-h-0 opacity-0 p-0 m-0 border-transparent overflow-hidden"
        }`}
        style={{ top: "100%", left: "0" }}
      >
        <p className="text-sm leading-relaxed mb-2">{descText}</p>
        
        {validation && (validation.type || validation.min || validation.max) && (
          <div className="text-xs bg-slate-700 p-2 rounded-md border border-slate-600 flex flex-wrap gap-2 text-slate-300">
             {validation.type && <span><b>Type:</b> {validation.type}</span>}
             {validation.min && <span><b>Min:</b> {validation.min}</span>}
             {validation.max && <span><b>Max:</b> {validation.max}</span>}
          </div>
        )}

        <span
          className="absolute top-2 right-2 text-slate-400 hover:text-white cursor-pointer p-1 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setExpanded(false);
          }}
        >
          <FontAwesomeIcon icon={faWindowClose} />
        </span>
      </div>
    </div>
  );
};

export default InfoButton;
