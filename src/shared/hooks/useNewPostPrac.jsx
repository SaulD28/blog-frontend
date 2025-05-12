import { useState, useEffect, useCallback } from "react";
import { getPostPracticaNew } from "../../services/api";

export const usePostNewPractica = () => {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPost = useCallback(async () => {
        setLoading(true);
        setError(null);

        const response = await getPostPracticaNew();

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