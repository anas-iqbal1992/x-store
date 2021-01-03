import express from "express";
const productRoute = express.Router();
import { requiredLogin } from "./../middlewares/requiredLogin";
import { uploadFile } from "./../middlewares/multer";
import { CommonHelper } from "./../utils/commonHelper";
import createSchema from "./../modules/product/validation/createValidation";
import { addProduct, uploadImages, getProducts } from "./../modules/product/services/createService";
import { validationResult } from "express-validator";
import {
  mongooseErrorFormatter,
} from "./../utils/validationFormatter";

productRoute.get(
  "/product/create",
  requiredLogin,
  async (req: express.Request, res: express.Response) => {
    const category = await CommonHelper.getCategory();
    const brands = await CommonHelper.getBrands();
    res.render("products/create", {
      title: "Create Products",
      category,
      brands,
    });
  }
);
productRoute.get(
  "/product/:page?",
  requiredLogin,
  async (req: express.Request, res: express.Response) => {
    try {
      const model = await getProducts(req);
      res.render("products/index", { title: "Products", model });
    } catch (e) {
      const msg = {
        type: "error",
        body: "Some thing went wrong!",
      };
      req.flash('messages', JSON.stringify(msg))
    }
  }
);
productRoute.get(
  "/product/get-sub-categories/:id",
  requiredLogin,
  async (req: express.Request, res: express.Response) => {
    const subCategory = await CommonHelper.getSubCategory(req.params.id);
    res.render("products/_options", {
      layout: false,
      subCategory,
    });
  }
);
productRoute.post(
  "/product/create",
  requiredLogin,
  uploadFile,
  createSchema,
  async (req: express.Request, res: express.Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash('formErrors', JSON.stringify(errors.mapped()))
        req.flash('formData', JSON.stringify(req.body))
        return res.redirect("/product/create");
      }
      const dataFiles = await uploadImages(req);
      await addProduct(req, dataFiles);
      const msg = {
        type: "success",
        body: "Category Created Successfully!",
      };
      req.flash('messages', JSON.stringify(msg))
      return res.redirect("/product");
    } catch (e) {
      const msg = {
        type: "error",
        body: "Validation Errors",
      };
      req.flash('messages', JSON.stringify(msg))
      req.flash('formErrors', mongooseErrorFormatter(e))
      req.flash('formData', JSON.stringify(req.body))
      return res.redirect("/product/create");
    }
  }
);
export { productRoute };
