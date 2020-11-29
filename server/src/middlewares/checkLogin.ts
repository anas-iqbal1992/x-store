import express from "express";
export const checkLogin = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  return next();
};
