import express from "express";
const categoriesRoute = express.Router();
import {
    getCategories,
} from "./../modules/category/services/createApiService";
categoriesRoute.get(
    "/api/categories",
    async (req: express.Request, res: express.Response) => {
        try {
            const response = await Promise.resolve(getCategories()); 
            if(!response){
                res.status(404).json('Data Not Found');
            }
            res.status(201).json(response);
        } catch (e) {
            const msg = {
                type: "error",
                body: "Some thing went wrong!",
            }
        }
    }
);
export { categoriesRoute };