
import express  from 'express';
const prodsRouter = express.Router();
import Products from '../controllers/products.js';

prodsRouter.get("/", (req, res) => {
    res.render("main", {
        load: true
    })
});

prodsRouter.get("/productos", (req, res) => {
    res.render("main", {
       load: false
    });
});
  
prodsRouter.post('/productos', (req, res) => {
    const { body } = req;
    const prod = new Products(`products.json`);
    prod.save(body, (prods) =>{
        res.render("main", {
          prods, load: false
        })
    });
});   


export default prodsRouter;