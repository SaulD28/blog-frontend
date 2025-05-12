import { useState, useEffect, useCallback } from "react";
import { getPostTaller } from "../../services/api"; 

export const useListPostTaller = () => {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPost = useCallback(async () => {
        setLoading(true);
        setError(null);

        const response = await getPostTaller();

        if (response.error) {
            setError("Error al obtener las publicaciones.");
            setPost([]);
        } else {
            setPost(response.data || []);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    return {
        post,
        loading,
        error,
    };
};
