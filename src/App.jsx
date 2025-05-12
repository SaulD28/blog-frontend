import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import PostTecnologia from "./components/posts/PostTecnologia";
import PostTaller from "./components/posts/PostTaller";
import PostPractica from "./components/posts/PostPractica";
import PostDetail from "./components/posts/PostDetail";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/posts/tecnologia" element={<PostTecnologia />} />
      <Route path="/posts/taller" element={<PostTaller />} />
      <Route path="/posts/practica" element={<PostPractica />} />
      <Route path="/posts/:id" element={<PostDetail />} />
    </Routes>
  );
};

export default App;