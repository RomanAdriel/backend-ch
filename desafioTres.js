const {Contenedor} = require('./desafioDos.js')
const express = require('express');

const container = new Contenedor("productos.txt");
const app = express();
const port = 8080;

const server = app.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)

    app.get("/productos", async (req, res) => {
        await container.getAll().then((productos) => {
            res.send(`<div>${JSON.stringify(productos)}</div>`);
        });
    })

    app.get("/productoRandom", async (req, res) => {
        let randomProd = Math.floor(Math.random() * (3 - 1) + 1);
        await container.getById(randomProd).then((producto) => {
            res.send(`<div>${JSON.stringify(producto)}</div>`)
        })
    });
})

server.on("error", error => console.log(`Error en servidor ${error}`));