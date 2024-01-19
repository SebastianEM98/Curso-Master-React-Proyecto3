const { connection } = require("./database/connection");
const exppress = require("express");
const cors = require("cors");


// Connection to data base
connection();


// Node server creation
const app = exppress();
const port = 3700;


// CORS setup
app.use(cors());

// Middlewares (convert body to JSON object)
app.use(exppress.json());
app.use(exppress.urlencoded({extended: true}));


// Load Route Files
const article_routes = require("./routes/article");


// Routes
app.use("/api", article_routes);


// Server creation and http request listening
app.listen(port, () => {
    console.log(`######## Servidor corriendo correctamente en la url: localhost:${port} ########`);
});