import { useEffect, useState } from "react";
import { useFindByIdPost } from "../../shared/hooks/useFindByIdPost";
import { useCreateComment } from "../../shared/hooks/useCreateComment";
import { useParams, useNavigate } from "react-router-dom";

const PostIn = () => {
    const { id } = useParams();
    const { post, loading, error, fetchPostById } = useFindByIdPost();
    const {
        handleCreateComment,
        loading: creatingComment,
        error: commentError,
        success,
    } = useCreateComment();
    const navigate = useNavigate();

    const [newComment, setNewComment] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => {
        if (id) {
            fetchPostById(id).catch((err) => {
                console.error("Error al obtener el post:", err);
            });
        }
    }, [id, fetchPostById]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!user.trim() || !newComment.trim()) {
            alert("Debes completar todos los campos.");
            return;
        }

        const comment = await handleCreateComment(id, newComment, user);
        if (comment) {
            setUser("");
            setNewComment("");
            fetchPostById(id);
        }
    };

    if (loading) return <p className="text-center text-lg">Cargando contenido...</p>;
    if (error)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-lg text-red-500">Error: {error}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 bg-gray-600 text-white px-5 py-2 rounded hover:bg-gray-800"
                >
                    Volver atrás
                </button>
            </div>
        );

    if (!post)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-gray-500 text-lg">No se encontró el post solicitado.</p>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <article className="bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-3xl font-extrabold mb-2 text-center">{post.title}</h1>
                <p className="text-gray-800 text-justify mb-4">{post.text}</p>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span><strong>Categoría:</strong> {post.category?.name || "No definida"}</span>
                    <span><strong>Fecha:</strong> {post.date ? new Date(post.date).toLocaleDateString() : "Sin fecha"}</span>
                </div>
                {post.doc ? (
                    <a
                        href={`data:application/pdf;base64,${post.doc}`}
                        download={`${post.title}.pdf`}
                        className="text-indigo-600 hover:underline"
                    >
                        Descargar documento PDF
                    </a>
                ) : (
                    <p className="text-red-600">Este post no tiene documento disponible.</p>
                )}
            </article>

            <section className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Comentarios recientes</h2>
                {post.comments?.length > 0 ? (
                    <ul className="space-y-4">
                        {post.comments.map((comment) => (
                            <li key={comment._id} className="bg-gray-100 p-4 rounded-xl shadow-sm">
                                <div className="flex justify-between mb-1">
                                    <span className="text-emerald-700 font-semibold">{comment.user}</span>
                                    <span className="text-gray-500 text-sm">
                                        {comment.date ? new Date(comment.date).toLocaleDateString() : "Sin fecha"}
                                    </span>
                                </div>
                                <p className="text-gray-700">{comment.text}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Aún no hay comentarios en este post.</p>
                )}
            </section>

            <section className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Agregar un comentario</h2>
                <form onSubmit={handleSubmitComment} className="space-y-4 bg-white p-4 rounded-xl shadow">
                    <input
                        type="text"
                        placeholder="Tu nombre"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-xl"
                        required
                    />
                    <textarea
                        placeholder="Escribe tu comentario..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-xl"
                        rows="4"
                        required
                    />
                    <button
                        type="submit"
                        disabled={creatingComment}
                        className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-800 transition-colors"
                    >
                        {creatingComment ? "Enviando..." : "Publicar comentario"}
                    </button>
                    {commentError && <p className="text-red-500">{commentError}</p>}
                    {success && <p className="text-emerald-600">Comentario publicado correctamente.</p>}
                </form>
            </section>

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    Regresar
                </button>
            </div>
        </div>
    );
};

export default PostIn;
