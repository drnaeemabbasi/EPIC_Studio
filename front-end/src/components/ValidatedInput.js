import { useValidation } from '../hooks/useValidation';

const ValidatedInput = ({ fieldKey, name, id, value, onChange, onBlur, className, placeholder, ...props }) => {
  const validation = useValidation(fieldKey);
  
  if (!validation) {
    // Fallback if not loaded yet or no validation exists
    return (
      <input
        type="text"
        id={id}
        name={name}
        className={className}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
    );
  }

  const { min, max, unknown, type, allowed } = validation;
  const isNumber = type === "integer" || type === "real";
  
  // Checking Constraints
  let isOutOfRange = false;
  let isUnknown = false;
  let numericVal = parseFloat(value);
  
  if (value !== "" && value !== null && value !== undefined) {
    if (unknown !== "" && value.toString() === unknown.toString()) {
      isUnknown = true;
    } else if (isNumber && !isNaN(numericVal)) {
      if (min !== "" && numericVal < parseFloat(min)) isOutOfRange = true;
      if (max !== "" && numericVal > parseFloat(max)) isOutOfRange = true;
    }
  }

  // Allowed values dropdown mapping
  if (allowed && allowed.trim() !== "") {
    // allowed values usually look like "0=normal; 1=static" or similar
    // Let's parse it securely
    const options = allowed.split(";").map(opt => {
        const parts = opt.split("=");
        if (parts.length >= 2) {
            return { val: parts[0].trim(), label: parts.slice(1).join("=").trim() };
        }
        return { val: opt.trim(), label: opt.trim() };
    });

    return (
        <select
          id={id}
          name={name}
          className={`${className} cursor-pointer`}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        >
          <option value="">-- Select --</option>
          {options.map((o, idx) => (
            <option key={idx} value={o.val}>{o.val} - {o.label}</option>
          ))}
        </select>
    );
  }

  let baseClass = className || "w-full px-3 py-2 border rounded-md focus:outline-none";
  let validationClass = "";
  let errorMsg = null;

  if (isUnknown) {
    validationClass = " border-yellow-500 bg-yellow-100 focus:ring focus:border-yellow-500";
    errorMsg = <span className="text-yellow-600 text-xs font-semibold mt-1">This value is used when unknown.</span>;
  } else if (isOutOfRange) {
    validationClass = " border-red-500 focus:ring focus:ring-red-200 focus:border-red-500";
    errorMsg = <span className="text-red-500 text-xs font-semibold mt-1">Value out of range ({min} to {max}).</span>;
  } else {
    validationClass = " border-gray-300 focus:ring focus:border-blue-500";
  }

  return (
    <div className="flex flex-col w-full">
      <input
        type="text"
        id={id}
        name={name}
        className={`${baseClass} ${validationClass}`}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      {errorMsg}
    </div>
  );
};

export default ValidatedInput;
