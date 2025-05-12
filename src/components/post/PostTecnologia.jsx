import { useState } from "react";
import { useListPostPractica } from "../../shared/hooks/useListPostPractica";
import { usePostNewTec } from "../../shared/hooks/useListNewPostPractica";
import { useNavigate } from "react-router-dom";

const PostPractica = () => {
    const { posts: defaultPosts, loading, error } = useListPostPractica();
    const { posts: newPosts, loading: loadingNew, error: errorNew } = usePostNewTec();
    const [showLatest, setShowLatest] = useState(false);
    const navigate = useNavigate();

    const postsToShow = showLatest ? newPosts : defaultPosts;

    if (loading || loadingNew) return <p className="text-center">Cargando posts...</p>;
    if (error || errorNew) return <p className="text-center text-red-600">Error: {error || errorNew}</p>;

    return (
        <section className="max-w-4xl mx-auto px-4 py-6">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-800">Posts de Tecnologia</h1>
                <p className="text-sm text-gray-600 mt-2">
                    Selecciona un post para ver más detalles
                </p>
            </header>

            <div className="grid gap-4">
                {postsToShow.map((post) => (
                    <article
                        key={post._id}
                        className="p-5 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                        onClick={() => navigate(`/post/${post._id}`)}
                    >
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-500 text-sm mt-1">{new Date(post.date).toLocaleDateString()}</p>
                    </article>
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={() => setShowLatest(!showLatest)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    {showLatest ? "Ver en orden original" : "Ver más recientes"}
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Regresar
                </button>
            </div>
        </section>
    );
};

export default PostPractica;
