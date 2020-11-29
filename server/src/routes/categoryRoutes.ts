import express from "express";
import createSchema from "./../modules/category/validation/createValidation";
import {
  mongooseErrorFormatter,
} from "./../utils/validationFormatter";
import {
  addCategory,
  getCategory,
  getCategories,
  updateCategory,
  addSubCategory,
} from "./../modules/category/services/createService";
import { requiredLogin } from "./../middlewares/requiredLogin";
import { validationResult } from "express-validator";
const categoriesRoute = express.Router();
categoriesRoute.get(
  "/categories",
  requiredLogin,
  async (req: express.Request, res: express.Response) => {
    try {
      const model = await getCategories(req.query);
      res.render("categories", { title: "Categories", model });
    } catch (e) {
      const msg = {
        type: "error",
        body: "Some thing went wrong!",
      };
      req.flash('messages', JSON.stringify(msg))
    }
  }
);
categoriesRoute.get(
  "/category/create",
  requiredLogin,
  (req: express.Request, res: express.Response) => {
    res.render("categories/create", { title: "Create Categories" });
  }
);
categoriesRoute.post(
  "/category/create",
  requiredLogin,
  createSchema,
  async (req: express.Request, res: express.Response) => {
    try {
      console.log("body", req.body)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash('formErrors', JSON.stringify(errors.mapped()))
        req.flash('formData', JSON.stringify(req.body))
        return res.redirect("/category/create");
      }
      const model = await addCategory(req);
      await addSubCategory(req, model);
      const msg = {
        type: "success",
        body: "Category Created Successfully!",
      };
      req.flash('messages', JSON.stringify(msg))
      return res.redirect("/categories");
    } catch (e) {
      const msg = {
        type: "error",
        body: "Validation Errors",
      };
      req.flash('messages', JSON.stringify(msg))
      req.flash('formErrors', mongooseErrorFormatter(e))
      req.flash('formData', JSON.stringify(req.body))
      return res.redirect("/category/create");
    }
  }
);
categoriesRoute.get(
  "/category/edit/:id",
  requiredLogin,
  async (req: express.Request, res: express.Response) => {
    try {
      const formData = await getCategory(req.params.id);
      res.render("categories/edit", { title: "Edit Category", formData });
    } catch (e) {
      const msg = {
        type: "error",
        body: "Some thing went wrong!",
      };
      req.flash('messages', JSON.stringify(msg))
    }
  }
);
categoriesRoute.post(
  "/category/update/:id",
  requiredLogin, createSchema,
  async (req: express.Request, res: express.Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash('formErrors', JSON.stringify(errors.mapped()))
        req.flash('formData', JSON.stringify(req.body))
        return res.redirect(`/category/edit/${req.params.id}`);
      }
      await updateCategory(req);
      const msg = {
        type: "success",
        body: "Category Updated Successfully!",
      };
      req.flash('messages', JSON.stringify(msg))
      return res.redirect("/categories");
    } catch (e) {
      const msg = {
        type: "error",
        body: "Validation Errors",
      };
      req.flash('messages', JSON.stringify(msg))
      req.flash('formErrors', mongooseErrorFormatter(e))
      req.flash('formData', JSON.stringify(req.body))
    }
    return res.redirect(`/category/edit/${req.params.id}`);
  }
);
categoriesRoute.post(
  "/category/add-sub-category",
  requiredLogin,
  async (req: express.Request, res: express.Response) => {
    res.render("categories/_sub-category", {
      layout: false,
      i: req.body.id,
    });
  }
);
categoriesRoute.get(
  "/category/view/:id",
  requiredLogin,
  async (req: express.Request, res: express.Response) => {
    try {
      const formData = await getCategory(req.params.id);
      res.render("categories/view", { title: "View Category", formData });
    } catch (e) {
      const msg = {
        type: "error",
        body: "Something went wrong!",
      };
      req.flash('messages', JSON.stringify(msg))
    }
  }
);
export { categoriesRoute };
