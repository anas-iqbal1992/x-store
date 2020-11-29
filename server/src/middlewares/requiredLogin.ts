import express from "express";
export const requiredLogin = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/");
    }
    return next();
}