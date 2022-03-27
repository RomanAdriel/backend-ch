import ProdsApi from "./routes/api/products.js";
import UploadApi from "./routes/api/uploadFile.js";
import ProdsRoutes from "./routes/products.js";
import Products from "./controllers/products.js";

import express  from 'express';
import http from 'http';
import { engine } from "express-handlebars";
import { Server } from 'socket.io';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class App {
   constructor (PORT) {
      this.port = PORT;
      this.app = express();
      this.server = http.createServer(this.app);
      this.io = new Server(this.server, {
         cors: { origin: '*'}
     });
     this.messages = [];
   }
   listen() {
      this.server .listen(this.port);
   }
   start() {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use("/api/productos", ProdsApi);
      this.app.use("/api/subir", UploadApi);
      this.app.use("/", ProdsRoutes);

      this.app.use(express.static('public'));
      this.app.use("/uploads", express.static(path.resolve(__dirname, "/uploads")));
      this.app.set("views", "public");
      this.app.set("view engine", "hbs");
      this.app.engine(
            "hbs",
            engine({
               extname: ".hbs",
               defaultLayout: "index.hbs",
               layoutsDir: __dirname+"/public/layouts",
               partialsDir: __dirname+"/public/partials"
            }),
         );
      console.log(`Listening on http://localhost:${this.port}`)    

      this.io.on('connection', (socket) => {
         console.log('User connected!');
         socket.emit('Welcome', {
            msg: 'Chat with us!'               
         });
         
         socket.on('disconnect', () => {
             console.log('User disconnected');
             socket.emit('Welcome', 'Thank you for your time!' );
         });
         
         socket.on('notification', (data) => {
             console.log(`Received: ${data}`);
         })

         socket.on('getProds', () =>{
            const products = new Products(`products.json`);
            products.getAll( prods => {
               this.io.sockets.emit('sendProds', prods);
            });
         })

         socket.on('deleteProds', (data) =>{
            const products = new Products(`products.json`);
            products.deleteById(data.id, () => {
               products.getAll( prods => {
                  this.io.sockets.emit('sendProds', prods);
               });
            })
         })

         socket.on('updateProds', (data) =>{
            const products = new Products(`products.json`);
            products.updateProduct(data, () => {
               products.getAll( prods => {
                  this.io.sockets.emit('sendProds', prods);
               });
            })
         })
     
         socket.on('clientMessage', (data) =>{
             this.messages.push({
                 id: socket.id,
                 us: data.us,
                 email: data.email,
                 message: data.message,
                 fh: data.fh
             });
             this.io.sockets.emit('serverMessage', this.messages);
         })
     })
   }
}

export default App;