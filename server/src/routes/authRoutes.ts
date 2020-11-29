import express from "express";
import passport from "passport";
import VlaidationSchema from "./../modules/users/validation/authValidation";
import { joiErrorFormatter } from "./../utils/validationFormatter";
const authRoutes = express.Router();
import { checkLogin } from "./../middlewares/checkLogin";
authRoutes.get("/", checkLogin, async (req: express.Request, res: express.Response) => {
  res.render("auth/login", { layout: 'layouts/login' });
});
authRoutes.post(
  "/login", checkLogin,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const validationResult = VlaidationSchema.loginSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      const formErrors = joiErrorFormatter(validationResult.error);
      req.flash('formErrors', JSON.stringify(formErrors))
      req.flash('formData', JSON.stringify(req.body))
      return res.redirect("/");
    }
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        const msg = {
          type: "error",
          body: "Login failed",
        };
        req.flash('messages', JSON.stringify(msg))
        return res.redirect("/");
      }
      if (!user) {
        const msg = {
          type: "error",
          body: info.error,
        };
        req.flash('messages', JSON.stringify(msg))
        return res.redirect("/");
      }

      req.logIn(user, (err) => {
        if (err) {
          const msg = {
            type: "error",
            body: "Login failed",
          };
          req.flash('messages', JSON.stringify(msg))
        }
        return res.redirect("/dashboard");
      });
    })(req, res, next);
  }
);
export { authRoutes };
