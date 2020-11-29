import { string } from "joi";
import { Document, Model, model, PaginateModel, Schema } from "mongoose";
import { Category } from "../../category/model/Category";
import { SubCategory } from "../../category/model/SubCategory";
import { ProductInterface } from "../interface/product";
import mongoosePaginate from "mongoose-paginate-v2";
export interface IProduct extends ProductInterface, Document {}
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    feature: {
      type: String,
      required: true,
    },
    main_images: {
      type: String,
      required: true,
    },
    other_images: {
      type: String,
    },
    other: {
      type: String,
    },
    description: {
      type: String,
    },
    specification: {
      type: String,
    },
    barcode:{
        type:String
    },
    return_days:{
      type:String
    },
    offer: {
      upto: {
        type: String,
      },
      unit: {
        type: String,
        enum: ["per", "flat"],
      },
    },
    status: {
      type: Number,
      default: 1,
    },
    reference: {
      type: String,
      required: true,
    },
    category: { type: Schema.Types.ObjectId, ref: Category },
    subcategory: { type: Schema.Types.ObjectId,ref: SubCategory},
  },
  { timestamps: true }
);
productSchema.plugin(mongoosePaginate);
interface Product<T extends Document> extends PaginateModel<T> {};
export const Product: Product<IProduct> = model<IProduct>("Product", productSchema) as Product<IProduct>;
