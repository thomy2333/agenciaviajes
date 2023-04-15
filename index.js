import express from "express";
import router from "./routes/index.js";
import db from './config/db.js'


const app = express(); 

// Conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch( error => console.log(error));

//definir el puerto
const port = process.env.PORT || 4000;

//habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
});

// Habilitar express.json
app.use(express.urlencoded({ extended: false }));

//definir la carpeta publica
app.use(express.static('public'))

//agregar router
app.use('/', router)

app.listen(port, () =>{
    console.log(`el servidor esta corriedo el puerto ${port}`);
})