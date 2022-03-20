const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'pug');

const productos = [
  {
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    thumbnail: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
  }
];

const PORT = 8082;
const srv = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
srv.on('error', (error) => console.log(`Server error ${error}`));

app.get('/', (req, res) => {
  res.render('loadProducts', {})
});

app.get('/productos', (req, res) => {
  res.render('viewProducts', {
      productos
  })
});

app.post('/productos', (req, res) => {
  const { body } = req;
  productos.push(body);
  res.render('viewProducts', {
    productos
  })
});