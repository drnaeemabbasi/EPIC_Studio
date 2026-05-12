import { useState, useEffect } from "react";
import axios from "axios";

let globalDescriptionsCache = null;
let pendingFetch = null;

export const fetchValidationData = () => {
    if (!pendingFetch) {
        pendingFetch = axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/descriptions/fetchDescriptions`).then(res => res.data);
    }
    return pendingFetch;
}

export const useValidation = (fieldKey) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!fieldKey) return;

    if (globalDescriptionsCache) {
      setData(globalDescriptionsCache[fieldKey]);
    } else {
      fetchValidationData().then(cache => {
        globalDescriptionsCache = cache;
        setData(cache[fieldKey]);
      }).catch(err => console.error("Validation fetch error:", err));
    }
  }, [fieldKey]);

  return data;
};
