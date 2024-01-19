const multer = require("multer");

const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/article");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./images/articles");
    },
    filename: function (req, file, cb) {
        cb(null, "article" + Date.now() + file.originalname);
    }
});

const uploads = multer({ storage: storage });

router.post("/create-article", ArticleController.create);
router.get("/articles/:latest?", ArticleController.list);
router.get("/article/:id", ArticleController.getOne);
router.delete("/article/:id", ArticleController.deleteOne);
router.put("/article/:id", ArticleController.updateOne);
router.post("/upload-image/:id", [uploads.single("image0")], ArticleController.uploadImage);
router.get("/image/:file", ArticleController.showImage);
router.get("/search-article/:search", ArticleController.searArticle);


module.exports = router;