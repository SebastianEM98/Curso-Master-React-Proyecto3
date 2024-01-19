import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Request } from '../../helpers/Request';
import { Global } from '../../helpers/Global';

export const Create = () => {

    const { form, submited, changed } = useForm({});
    const [message, setMessage] = useState("");

    let messageLabel = document.querySelector(".article-message");

    useEffect(() => {
        if (messageLabel) {
            messageLabel.style.display = "none";
        }
    }, []);

    const saveArticle = async (e) => {
        e.preventDefault();

        let newArticle = form;

        const { data } = await Request(Global.url + "create-article", "POST", newArticle);

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

        e.target.reset();
    }


    const showMessage = (classToAdd, classToRemove, text) => {
        messageLabel.style.display = "block";
        messageLabel.classList.add(classToAdd);
        messageLabel.classList.remove(classToRemove);
        setMessage(text);
    }


    return (
        <div className="jumbo">
            <h1>Crear Artículo</h1>
            <p>Formulario para crear un artículo</p>

            <strong className="article-message">{message}</strong>

            <form className="form-create" onSubmit={saveArticle}>
                <div className="form-group">
                    <label htmlFor="title">Titulo</label>
                    <input type="text" id="title" name="title" onChange={changed} />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Contenido</label>
                    <textarea id="content" name="content" onChange={changed}></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="file">Imagen</label>
                    <input type="file" id="file" name="image0" />
                </div>

                <input type="submit" value="Guardar" className="btn btn-submit" />
            </form>
        </div>
    )
}
