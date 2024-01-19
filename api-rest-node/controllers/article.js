const fs = require("fs");
const path = require("path");
const { validateArticle } = require("../helpers/validate");
const Article = require("../models/Article");

const create = (req, res) => {

    let parameters = req.body;

    try {
        validateArticle(parameters);

    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "Faltan datos por enviar",
            error: error.message
        });
    }

    const article = new Article(parameters);

    article.save().then((savedArticle) => {

        if (!savedArticle) {
            return res.status(400).json({
                status: "Error",
                message: "No se ha guardado el articulo"
            });
        }

        return res.status(200).json({
            status: "Success",
            article: savedArticle
        });
    });
}


const list = (req, res) => {
    let query = Article.find();

    if (req.params.latest) {
        query.limit(3);
    }

    query.sort({ date: -1 }).exec().then((articles) => {

        if (!articles) {
            return res.status(404).json({
                status: "Error",
                message: "No se han encontrado articulos"
            });
        }

        return res.status(200).json({
            status: "Success",
            articles
        });
    });
}


const getOne = (req, res) => {
    const id = req.params.id;

    Article.findById(id).then((article) => {
        return res.status(200).json({
            status: "Success",
            article
        });

    }).catch((error) => {
        return res.status(404).json({
            status: "Error",
            message: "No se han encontrado el articulo"
        });
    });
}


const deleteOne = (req, res) => {

    const articleId = req.params.id;

    Article.findOneAndDelete({ _id: articleId }).then((article) => {
        return res.status(200).json({
            status: "Success",
            message: "Articulo borrado",
            article
        });

    }).catch((error) => {
        return res.status(404).json({
            status: "Error",
            message: "No se han encontrado el articulo a borrar"
        });
    });
}


const updateOne = async (req, res) => {

    const articleId = req.params.id;
    const parameters = req.body;

    try {
        validateArticle(parameters);

    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "Faltan datos por enviar",
            error: error.message
        });
    }

    Article.findOneAndUpdate({ _id: articleId }, parameters, { new: true }).then((updatedArticle) => {
        return res.status(200).json({
            status: "Success",
            message: "Articulo actualizado",
            article: updatedArticle
        });

    }).catch((error) => {
        return res.status(404).json({
            status: "Error",
            message: "No se han encontrado el articulo a modificar"
        });
    });
}


const uploadImage = (req, res) => {

    // Setup multer

    // Get the uploaded image file
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "Error",
            message: "Peticion no valida"
        });
    }

    // File name
    let fileName = req.file.originalname;

    // File extension
    let fileNameSplit = fileName.split("\.");
    let fileExtension = fileNameSplit[1];

    // Check valid file extension
    if (fileExtension != "png" && fileExtension != "jpg" && fileExtension != "jpeg" && fileExtension != "gif") {
        // Delete file
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "Error",
                message: "Imagen no valida"
            });
        });
    } else {

        const articleId = req.params.id;

        Article.findOneAndUpdate({ _id: articleId }, { image: req.file.filename }, { new: true }).then((updatedArticle) => {
            return res.status(200).json({
                status: "Success",
                message: "Fichero actualizado",
                file: req.file,
                article: updatedArticle
            });

        }).catch((error) => {
            return res.status(404).json({
                status: "Error",
                message: "No se han encontrado el articulo a modificar"
            });
        });
    }
}


const showImage = (req, res) => {
    let file = req.params.file
    let physicalPath = "./images/articles/" + file;

    fs.stat(physicalPath, (error, exists) => {
        if (exists) {
            return res.sendFile(path.resolve(physicalPath));
        } else {
            return res.status(404).json({
                status: "Error",
                message: "La imagen no existe",
                file,
                path: physicalPath
            });
        }
    });
}


const searArticle = (req, res) => {

    // Getting the search string
    let search = req.params.search;

    // Find OR
    Article.find({ "$or": [
        {"title": {"$regex": search, "$options": "i"}},   // If title includes the search string
        {"content": {"$regex": search, "$options": "i"}}  // If content includes the search string
    ]})
    .sort({date: -1}).exec().then((foundArticles) => {

        if (!foundArticles || foundArticles.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se ha encontrado ningun articulo"
            });
        }

        return res.status(200).json({
            status: "Success",
            articles: foundArticles
        });
    });
}

module.exports = { 
    create,
    list,
    getOne,
    deleteOne,
    updateOne,
    uploadImage,
    showImage,
    searArticle
}