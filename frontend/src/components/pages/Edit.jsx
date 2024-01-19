import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Request } from '../../helpers/Request';
import { Global } from '../../helpers/Global';
import { useParams } from 'react-router-dom';

export const Edit = () => {

    const { form, submited, changed } = useForm({});
    const [message, setMessage] = useState("");
    const [article, setArticle] = useState({});
    const params = useParams();

    let messageLabel = document.querySelector(".article-message");

    useEffect(() => {
        getArticle();

        if (messageLabel) {
            messageLabel.style.display = "none";
        }
    }, []);


    const updateArticle = async (e) => {
        e.preventDefault();

        let newArticle = form;

        const { data } = await Request(Global.url + "article/" + params.id, "PUT", newArticle);

        if (data.status == "Success") {
            showMessage("saved", "error", "Artículo guardado con exito");
        } else {
            showMessage("error", "saved", "Los datos proporcionados no son validos");
        }

        const fileInput = document.querySelector("#file");

        if (data.status == "Success" && fileInput.files[0]) {
            showMessage("saved", "error", "Artículo guardado con exito");

            // Upload image
            const formData = new FormData();
            formData.append("image0", fileInput.files[0]);

            const uploaded = await Request(Global.url + "upload-image/" + data.article._id, "POST", formData, true);

            if (uploaded.data.status == "Success") {
                showMessage("saved", "error", "Artículo guardado con exito");
            } else {
                showMessage("error", "saved", "El archivo proporcionado no es valido");
            }
        }
    }


    const getArticle = async () => {

        const { data } = await Request(Global.url + "article/" + params.id, "GET");

        if (data.status === "Success") {
            setArticle(data.article);
        }
    }


    const showMessage = (classToAdd, classToRemove, text) => {
        messageLabel.style.display = "block";
        messageLabel.classList.add(classToAdd);
        messageLabel.classList.remove(classToRemove);
        setMessage(text);
    }


    return (
        <div className="jumbo">
            <h1>Editar Artículo</h1>
            <p>Formulario para editar: {article.title}</p>

            <strong className="article-message">{message}</strong>

            <form className="form-create" onSubmit={updateArticle}>
                <div className="form-group">
                    <label htmlFor="title">Titulo</label>
                    <input type="text" id="title" name="title" onChange={changed} defaultValue={article.title} />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Contenido</label>
                    <textarea type="text" id="content" name="content" onChange={changed} defaultValue={article.content} />
                </div>

                <div className="form-group">
                    <label htmlFor="file">Imagen</label>
                    <div className="mask">
                        {article.image != "default.png" && <img src={Global.url + "image/" + article.image} />}
                        {article.image == "default.png" && <img src="https://demofree.sirv.com/nope-not-here.jpg?w=250" />}
                    </div>
                    <input type="file" id="file" name="image0" />
                </div>

                <input type="submit" value="Guardar" className="btn btn-submit" />
            </form>
        </div>
    )
}
