import express from "express";
const  dashboardRoutes = express.Router();
import {requiredLogin} from "./../middlewares/requiredLogin";
dashboardRoutes.get('/dashboard',requiredLogin,(req:express.Request, res:express.Response) => {
    res.render('dashboard',{title:'Dashboard'});
})
export {dashboardRoutes}