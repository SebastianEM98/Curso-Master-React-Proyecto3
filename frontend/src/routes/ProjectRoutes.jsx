import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Home } from '../components/pages/Home';
import { Articles } from '../components/pages/Articles';
import { Header } from '../components/layout/Header';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { Create } from '../components/pages/Create';
import { Search } from '../components/pages/Search';
import { Article } from '../components/pages/Article';
import { Edit } from '../components/pages/Edit';

export const ProjectRoutes = () => {
    return (
        <BrowserRouter>
            {/* LAYOUT */}
            <Header />
            <Navbar />

            {/* MAIN CONTENT AND ROUTES */}
            <section id="content" className="content">
                <Routes>
                    <Route path="/" element={<Navigate to="/inicio" />} />
                    <Route path="/inicio" element={<Home />} />
                    <Route path="/articulos" element={<Articles />} />
                    <Route path="/crear-articulos" element={<Create />} />
                    <Route path="/buscar/:search" element={<Search />} />
                    <Route path="/articulo/:id" element={<Article />} />
                    <Route path="/editar/:id" element={<Edit />} />


                    <Route path="*" element={
                        <div className="jumbo">
                            <h1>Error 404</h1>
                            <p>La pagina a la que intenta acceder no existe</p>
                        </div>
                    } />
                </Routes>
            </section>

            <Sidebar />

            <Footer/>
        </BrowserRouter>
    )
}
