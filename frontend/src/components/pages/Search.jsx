import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Request } from '../../helpers/Request';
import { List } from './List';

export const Search = () => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        getArticles();
    }, []);

    useEffect(() => {
        getArticles();
    }, [params]);

    const getArticles = async () => {

        const { data } = await Request(Global.url + "search-article/" + params.search, "GET");

        if (data.status === "Success") {
            setArticles(data.articles);
        } else {
            setArticles([]);
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
