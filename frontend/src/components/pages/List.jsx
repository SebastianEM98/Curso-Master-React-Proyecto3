import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Global } from '../../helpers/Global'
import { Request } from '../../helpers/Request'

export const List = ({ articles, setArticles }) => {

    const navigate = useNavigate();

    const deleteArticle = async (articleId) => {
        const { data } = await Request(Global.url + "article/" + articleId, "DELETE");

        if (data.status == "Success") {
            let updatedArticles = articles.filter((article) => article._id != articleId);
            setArticles(updatedArticles);
        }
    }

    const editArticle = (articleId) => {
        navigate("/editar/" + articleId);
    }

    return (
        articles.map((article) => (
            <article className="article-item" key={article._id}>
                <div className="mask">
                    {article.image != "default.png" && <img src={Global.url + "image/" + article.image} />}
                    {article.image == "default.png" && <img src="https://demofree.sirv.com/nope-not-here.jpg?w=250" />}
                </div>

                <div className="article-info">
                    <h3 className="title"><Link to={"/articulo/" + article._id}>{article.title}</Link></h3>
                    <p className="description">{article.content}</p>

                    <button className="edit" onClick={() => editArticle(article._id)}>Editar</button>
                    <button className="delete" onClick={() => deleteArticle(article._id)}>Borrar</button>
                </div>
            </article>
        ))
    )
}
