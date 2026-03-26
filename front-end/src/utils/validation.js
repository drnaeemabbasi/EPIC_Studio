export const parseRangeFromDescription = (description) => {
  if (!description) return null;
  // Match patterns like (Range: 1 to 999), (Range: -180 to 180), (Range: 0 to 1), (Range: 0 - 100), (Range: 0 to ∞)
  const rangeMatch = description.match(/\(Range:\s*([0-9.-]+)\s*(?:to|-)\s*([0-9.-∞]+)\)/i);
  if (rangeMatch) {
    let min = parseFloat(rangeMatch[1]);
    let max = rangeMatch[2] === '∞' ? Infinity : parseFloat(rangeMatch[2]);
    return { min, max };
  }
  return null;
};

export const validateValue = (value, range) => {
  if (!value && value !== 0) return true; // Let required validator handle empty (if any)
  if (!range) return true;
  
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return "Value must be a number";
  
  if (numValue < range.min || numValue > range.max) {
    if (range.max === Infinity) {
      return `Value must be at least ${range.min}`;
    }
    return `Value must be between ${range.min} and ${range.max}`;
  }
  
  return true; // true means valid
};
