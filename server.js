const express = require('express')
const {router} = require('./router/router.js')


const app = express();
const port = 8080;

// Middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use( express.urlencoded({extended: true}));
 
//ROUTES 

app.use('/api/productos', router)
 
app.listen(port, () => console.log('Server started on port 8080')).on('error', error => console.log(`Error al levantar el servidor ${error}`))


