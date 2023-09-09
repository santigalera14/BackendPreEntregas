import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    const products = JSON.parse(fs.readFileSync('./src/JSONs/productos.json', 'utf-8'));
    res.render('realTimeProducts', {products}  );
});

export default router;