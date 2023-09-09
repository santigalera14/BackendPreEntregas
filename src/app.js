import productRouter from './routers/products.routers.js'
import "../src/db/dbConfig.js"
// import carritoRouters from './routers/cart.routers.js';

// import realTimeProductsRouter from './routers/realtimeproducts.router.js';
// import homeRouter from './routers/home.router.js';

import express from 'express';
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';
import { Server } from "socket.io";

const app = express();

// configuracion de express:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public'));

// configuracion de handlebars:
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// configuracion de rutas:
app.use('/api/products', productRouter);
// app.use('/api/carts', carritoRouters);
// app.use('/realtimeproducts', realTimeProductsRouter);
// app.use('/', homeRouter);

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {

  console.log('Cliente conectado!', socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado!', socket.id);
    });

    socket.on('productoEliminado', (id) => {
        socketServer.emit('productoEliminado', id);
        console.log('productoEliminado', id);
    });

    socket.on('productoAgregado', (producto) => {
        socketServer.emit('productoAgregado', producto);
        console.log('Servidor: roducto agregado', producto);
    });
});