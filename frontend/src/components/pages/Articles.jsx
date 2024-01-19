import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global';
import { Request } from '../../helpers/Request';
import { List } from './List';

export const Articles = () => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getArticles();
    }, []);

    const getArticles = async () => {

        const { data } = await Request(Global.url + "articles", "GET");

        if (data.status === "Success") {
            setArticles(data.articles);
        }

        setLoading(false);
    }

    return (
        <>
            {
                loading ? "Cargando..." : (
                    articles.length > 0 ? <List articles={articles} setArticles={setArticles} /> : <h1>No hay articulos</h1>
                )
            }

        </>
    )
}
