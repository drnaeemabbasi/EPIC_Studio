import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Hook to fetch model definition for a specific file.
 * @param {string} fileName - E.g., 'EPICCONT.DAT'
 */
const useModelDefinition = (fileName) => {
    const [model, setModel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchModel = async () => {
            if (!fileName) return;
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/model/columns/${fileName}`);
                setModel(response.data);
                setError(null);
            } catch (err) {
                console.error(`Error fetching model for ${fileName}:`, err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchModel();
    }, [fileName]);

    return { model, isLoading, error };
};

export default useModelDefinition;
