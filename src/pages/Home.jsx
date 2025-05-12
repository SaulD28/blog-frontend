import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/NavBar";
import { BookOpenIcon, HammerIcon, BriefcaseIcon } from "lucide-react";

export const Home = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "Tecnología III",
            icon: <BookOpenIcon size={40} className="text-blue-600 mb-2" />,
            description: "Explora los posts de tecnología aplicada.",
            bg: "bg-blue-100",
            route: "/posts/tecnologia",
        },
        {
            title: "Taller III",
            icon: <HammerIcon size={40} className="text-yellow-600 mb-2" />,
            description: "Conoce las experiencias del taller.",
            bg: "bg-yellow-100",
            route: "/posts/taller",
        },
        {
            title: "Práctica Supervisada",
            icon: <BriefcaseIcon size={40} className="text-green-600 mb-2" />,
            description: "Revisa las prácticas profesionales.",
            bg: "bg-green-100",
            route: "/posts/practica",
        },
    ];

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 flex-1">
                {sections.map(({ title, icon, description, bg, route }) => (
                    <section
                        key={title}
                        className={`rounded-xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition ${bg}`}
                    >
                        {icon}
                        <h2 className="text-xl font-bold mb-2">{title}</h2>
                        <p className="text-sm text-gray-700 mb-4 text-center">{description}</p>
                        <button
                            onClick={() => navigate(route)}
                            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                        >
                            Ver posts
                        </button>
                    </section>
                ))}
            </div>
        </main>
    );
};
