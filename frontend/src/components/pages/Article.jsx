import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global';
import { Request } from '../../helpers/Request';
import { List } from './List';
import { useParams } from 'react-router-dom';

export const Article = () => {

    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getArticle();
    }, []);

    const getArticle = async () => {

        const { data } = await Request(Global.url + "article/" + params.id, "GET");

        if (data.status === "Success") {
            setArticle(data.article);
        }

        setLoading(false);
    }

    return (
        <div className="jumbo">
            {
                loading ? "Cargando..." : (
                    <>
                        <div className="mask">
                            {article.image != "default.png" && <img src={Global.url + "image/" + article.image} />}
                            {article.image == "default.png" && <img src="https://demofree.sirv.com/nope-not-here.jpg?w=250" />}
                        </div>

                        <h1>{article.title}</h1>
                        <span>{article.date}</span>
                        <p>{article.content}</p>
                    </>
                )
            }
        </div>
    )
}
