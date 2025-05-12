import { useState, useCallback } from "react";
import { getPostById } from "../../services/api";

export const useFindByIdPost = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPostById = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        const res = await getPostById(id);

        if (res.error) {
            setError(res.message || "Error al obtener la publicación.");
        } else {
            setPost(res.data);
        }

        setLoading(false);
    }, []);

    return { 
        post, 
        loading, 
        error, 
        fetchPostById 
    };
};