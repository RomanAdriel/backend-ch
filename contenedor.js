const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo) {
        this.id = 1
        this.nombreArchivo = nombreArchivo;
    }
    async save(producto) {
        await fs.promises.access(this.nombreArchivo, fs.F_OK).then(() => {
            console.log("File exists! Appending...");
            fs.promises.readFile(this.nombreArchivo, 'utf-8').then((file) => {
                let fileContent = JSON.parse(file);
                fileContent.sort(function (a, b) {
                    return a.id - b.id;
                });
                producto.id = Object.keys(fileContent).length + 1;
                fileContent.push(producto);
                fs.promises.writeFile(this.nombreArchivo, JSON.stringify(fileContent)).then(() => console.log("New product added to the 'Productos' file!")).catch(() => console.log("Failed to append new product to 'Productos' file!"))
            })
        }).catch(() => {
            console.log("File does not exist! Creating...")
            producto.id = this.id;
            fs.promises.writeFile(this.nombreArchivo, JSON.stringify([producto])).then(() => console.log("'Productos' file created successfully!")).catch((() => console.log("Writing the new 'productos' file failed!")))
        })
    }

    async getById(productId) {
        return await fs.promises.readFile(this.nombreArchivo, 'utf-8').then(file => JSON.parse(file)).then(file => file.find(product => product.id == productId)).catch(() => console.log("The product selected has not been found!"))
    }

    async getAll() {
        return await fs.promises.readFile(this.nombreArchivo, 'utf-8').then((file => JSON.parse(file))).catch(() => console.log("Unable to load products!"))
    }

    async getLastProduct() {
        return await fs.promises.readFile(this.nombreArchivo, 'utf-8').then(file => JSON.parse(file)).then(file => this.getById(file.length + 1)).catch(() => console.log("The product selected has not been found!"))
    }

    async deleteById(productId) {
        let fileContent = fs.readFileSync(this.nombreArchivo, 'utf-8')
        fileContent = JSON.parse(fileContent);
        let productToDelete = fileContent.find(product => product.id === parseInt(productId));
        let index = fileContent.findIndex(product => product === productToDelete);
        if (!productToDelete) {
            return 'Product not found'
        }
        fileContent.splice(index, 1);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(fileContent))
        console.log("Product with ID = ", productId, " successfully deleted from 'Productos' file!")
    }

    async deleteAll() {
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([])).catch(() => console.log("Unable to clean file!"))
    }

    async updateById(productId, productContent) {
        let fileContent = fs.readFileSync(this.nombreArchivo, 'utf-8')
        fileContent = JSON.parse(fileContent);
        let productToUpdate = fileContent.find(product => product.id == parseInt(productId));
        let index = fileContent.findIndex(product => product === productToUpdate);
        if (!productToUpdate) {
            return 'Product not found'
        }
        let {
            title,
            price,
            thumbnail
        } = productContent;
        productToUpdate.title = title;
        productToUpdate.price = price;
        productToUpdate.thumbnail = thumbnail;
        fileContent.splice(index, 1, productToUpdate);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(fileContent))
        console.log("Product with ID =", productId, "successfully updated in 'Productos' file!")
        return productToUpdate;

    }
}

module.exports.Contenedor = Contenedor;