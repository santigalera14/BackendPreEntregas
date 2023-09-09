import {productsMongo} from "../managers/products/ProductsMongo.js"
import { Router } from "express"

const router = Router()

router.post("/", async(rec,res ) => {
    const obj = rec.body

    try { const newProduct = await productsMongo.createProduct (obj)
        res.send ("producto creado")
    } catch(error){res.status(500).json({error}) 
        
    }
})

export default router;

