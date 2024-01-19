import { useState } from "react";


export const useForm = (initialObject = {}) => {

    const [form, setForm] = useState(initialObject);

    const serializeForm = (form) => {

        const formData = new FormData(form);

        const completeObject = {};

        for (let [name, value] of formData) {
            completeObject[name] = value;
        }

        return completeObject;
    }

    const submited = (e) => {
        e.preventDefault();

        let curso = serializeForm(e.target);
        setFormulario(curso);
    }

    const changed = ({ target }) => {
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value
        });
    }


    return {
        form,
        submited,
        changed
    }
}