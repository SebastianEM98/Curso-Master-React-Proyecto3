import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const executeSearch = (e) => {
        e.preventDefault();
        let userSearch = e.target.search_field.value;
        navigate("/buscar/" + userSearch, { replace: true });
    }

    return (
        <aside className="lateral">
            <div className="search">
                <h3 className="title">Buscador</h3>
                <form onSubmit={executeSearch}>
                    <input type="text" name="search_field" />
                    <input type="submit" value="Buscar" />
                </form>
            </div>
        </aside>
    )
}
