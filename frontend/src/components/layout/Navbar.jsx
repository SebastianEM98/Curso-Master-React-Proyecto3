import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="nav">
            <ul>
                <li><NavLink to="/inicio">Inicio</NavLink></li>
                <li><NavLink to="/articulos">Artículos</NavLink></li>
                <li><NavLink to="/crear-articulos">Crear Artículos</NavLink></li>
                <li><NavLink to="/#">Contacto</NavLink></li>
            </ul>
        </nav>
    )
}
