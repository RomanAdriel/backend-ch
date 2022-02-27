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
                    fileContent.sort(function(a, b){
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
            await fs.promises.readFile(this.nombreArchivo, 'utf-8').then((file) => {
                let fileContent = JSON.parse(file);
                let foundProduct = fileContent.find(product => product.id == productId);
                if (typeof foundProduct === 'undefined') {
                    console.log("The product selected has not been found!")
                } else {
                    console.log("The product selected is: ", foundProduct)
                }
            }).catch(() => console.log("The product selected has not been found!"))
        }

        async getAll() {
            await fs.promises.readFile(this.nombreArchivo, 'utf-8').then((file) => 
                console.log(JSON.parse(file))).catch(() => console.log("Unable to load products!"))
    }

        async deleteById(productId) {
            await fs.promises.readFile(this.nombreArchivo, 'utf-8').then((file) => {
                let fileContent = JSON.parse(file);
                let filteredProducts = fileContent.filter(product => product.id != productId);
                fs.promises.writeFile(this.nombreArchivo, JSON.stringify(filteredProducts)).then(() => console.log("Product with ID = ", productId ," successfully deleted from 'Productos' file!")).catch((() => console.log("Unable to delete the product from 'Productos' file!")))
        }).catch(() => console.log("Unable to read 'Productos' file!"))
    }

        async deleteAll() {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([])).catch(() => console.log("Unable to clean file!"))
        }
}
    // Test Calls (en este orden, al ser asíncronas, van a dejar el archivo malformado. Se pueden probar de una)
    let container = new Contenedor("productos.txt")
    container.save({
        "title": "Prueba",
        "price": 123,
        thumbnail: "url"
    })

    container.getById(23)

    container.getAll();

    container.deleteById(13);

    
    container.deleteAll();