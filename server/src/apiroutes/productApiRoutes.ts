import express from "express";
const productsRoute = express.Router();
import {getProductsList,getProducts} from './../modules/product/services/createApiService';
productsRoute.get('/api/get-products-list', async (req: express.Request, res: express.Response) => {
    try {
        const response = await Promise.resolve(getProductsList());
        if (!response) {
            res.status(404).json('Data Not Found');
        }
        res.status(201).json(response);
    } catch (e) {
        res.status(500).json(e.message);
    }
});
productsRoute.get('/api/get-products/:id',async (req: express.Request, res: express.Response) => {
    try{
        const response = await getProducts(req);
        res.status(201).json(response);
    }catch(e){
        res.status(500).json(e.message);
    }
})
export { productsRoute }