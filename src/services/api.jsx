import axios from "axios";

const apiBlog = axios.create({
    baseURL: "http://localhost:3000/blog/v1",
    timeout: 5000,
    httpAgent: false,
});

export const getPostTecnologia = async () => {
    try {
        const res = await apiBlog.get("/post/Tecnologia");
        return {data: res.data};
    } catch (error) {
        return {error: error.message};
    }
}

export const getPostTaller = async () => {
    try {
        const res = await apiBlog.get("/post/Taller");
        return {data: res.data};
    } catch (error) {
        return {error: error.message};
    }
}

export const getPostPractica = async () => {
    try {
        const res = await apiBlog.get("/post/Practica Supervisada");
        return {data: res.data};
    } catch (error) {
        return {error: error.message};
    }
}

export const getPostById = async (id) => {
    try {
        const res = await apiBlog.get(`/post/forById/${id}`);
        if (res.data && res.data.success) {
            return { data: res.data.publication };
        } else {
            return { error: "No se encontró la publicación o hubo un error en el servidor." };
        }
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

export const createComment = async (postId, text, user) => {
    try {
        const res = await apiBlog.post(`/comment/createComment`, {
            text,
            postId,
            user,
        });
        if (res.data && res.data.success) {
            return { data: res.data.comment };
        } else {
            return { error: "No se pudo crear el comentario." };
        }
    } catch (error) {
        return { error: error.response?.data?.message || error.message };
    }
};

export const getPostTecnologiaNew = async () => {
    try {
        const res = await apiBlog.get("/post/new/Tecnologia");
        return {data: res.data};
    } catch (error) {
        return {error: error.message};
    }
}

export const getPostTallerNew = async () => {
    try {
        const res = await apiBlog.get("/post/new/Taller");
        return {data: res.data};
    } catch (error) {
        return {error: error.message};
    }
}

export const getPostPracticaNew = async () => {
    try {
        const res = await apiBlog.get("/post/new/Practica Supervisada");
        return {data: res.data};
    } catch (error) {
        return {error: error.message};
    }
}