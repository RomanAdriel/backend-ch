const express = require("express");
const {
    Contenedor
} = require("../contenedor.js")

const router = express.Router();
const container = new Contenedor("productos.txt");

router.get('/', async (req, res) => {
    await container.getAll().then((productos) => {
        res.send(`<div>${JSON.stringify(productos)}</div>`);
    });
})

router.get('/:id', async (req, res) => {
    await container.getById(req.params.id).then((producto) => {
        res.send(`<div>${JSON.stringify(producto)}</div>`)
    })
})

router.post('/', async (req, res) => {

    const {
        title,
        price,
        thumbnail
    } = req.body;
    await container.save({
        "title": title,
        "price": price,
        "thumbnail": thumbnail
    })

    const productoNuevo = await container.getLastProduct();

    res.json({
        productoNuevo
    });
})

router.put('/:id', async (req, res) => {

    await container.updateById(req.params.id, req.body).then(updateResult => {

        if (updateResult === "Product not found") {
            res.status(400).json({
                error: updateResult
            })
        } else {
            res.json({
                msg: "Product successfully updated!",
                updateResult
            })
        }
    })
})

router.delete('/:id', async (req, res) => {

    await container.deleteById(req.params.id).then(deleteResult => {

        if (deleteResult === "Product not found") {
            res.status(400).json({
                error: deleteResult
            })
        } else {
            res.json({
                msg: "Product successfully deleted!",
            })
        }
    })
})


module.exports = {
    router
};