import React from 'react'
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="jumbo">
            <h1>Bienvenido al blog con React</h1>
            <p>Blog desarrollado con el MERN Stack (Mongo, Express, React, NodeJS)</p>
            <Link to="/articulos" className="button">Ver los artículos</Link>
        </div>
    )
}
