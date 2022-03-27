import fs from 'fs';

class Products {
    constructor (json) {
        this.file = json;

    }

    save(product, res) {
        let products = []; 
        products = fs.readFile(this.file, 'utf-8', (error, content)  => {
            if (error) {
                console.log('There are no products')
                product.id = 1;
                products = [];
                products.push(product);
                this.saveProducts(products);
                res(products);
            } else {
                try {
                    products = JSON.parse(content);
                    product.id = this.readMaxId(products) + 1;
                    products.push(product);
                    this.saveProducts(products);
                    res(products);
                } catch {}                           
            }
        });
    }
    updateProduct(product, res) {
        let products = []; 
        products = fs.readFile(this.file, 'utf-8', (error, content)  => {
            if (error) {
                res('There are no products')
                return true;
            } else {      
                products = JSON.parse(content);
                for(let i of products){
                    if (i.id==product.id){
                        i.title = product.title;
                        i.price = product.price;
                        i.thumbnail = product.thumbnail;
                    }
                }
                this.saveProducts(products);
                res(product);                                      
            }
        });
    }
    readMaxId(products) {
        let id = 1;
        products.map(prod => {
            if (prod.id>id) {
                id = prod.id;
            }
        })
        return id;
    }
    saveProducts(products) {
        fs.writeFile(this.file, JSON.stringify(products), error =>{
            if (error) {
                console.log('Failed to save file');
            } else {
                return true;
            }
        })
    }

    getById(Number, product) {
        let products = []; 
        products = fs.readFile(this.file, 'utf-8', (error, content)  => {
            if (error) {
                console.log('There are no products')
                product(null);
            } else {
                products = JSON.parse(content);
                const prod = products.find( prod => prod.id==Number);
                product(prod);
            }
        });
    }
    getAll(all) {
        let products = []; 
        products = fs.readFile(this.file, 'utf-8', (error, content)  => {
            if (error) {
                console.log('There are no products')
                all(null);
            } else {
                products = JSON.parse(content);
                all(products);
            }
        });
    }

    deleteById(Number, res) {
        let products = []; 
        products = fs.readFile(this.file, 'utf-8', (error, content)  => {
            if (error) {
                res('There are no products')
            } else {
                products = JSON.parse(content);
                const prod = products.find( prod => prod.id==Number);
                try {
                    if (prod.length==0) {
                        res(`There product with ID ${Number} was not found`)
                    } else {
                        const i = products.indexOf(prod);
                        console.log(`Index # ${i}`)
                        products.splice(i, 1);
                        this.saveProducts(products)
                        res(`The product with ID ${Number} has been deleted`)
                    }
                } catch {
                    res(`The product with ID ${Number} was not found`)
                }                
            }
        });
    }

    deleteAll() {     
        fs.unlink(this.file, error => {
            if (error) {
                console.log('The products could not be deleted');
            } else {
                console.log('Products deleted');
            }
        })  
    }
}

export default Products;

