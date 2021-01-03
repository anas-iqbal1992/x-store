import {
  Document,
  Model,
  model,
  PaginateModel,
  Schema,
  models,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import uniqueValidator from "mongoose-unique-validator";
import { CategoryInterface } from "../interfaces/category";
import { SubCategory } from "./SubCategory";
export interface ICategory extends CategoryInterface, Document {
  transform(): ICategory;
}
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
    reference: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
categorySchema.plugin(uniqueValidator);
categorySchema.plugin(mongoosePaginate);
interface Category<T extends Document> extends PaginateModel<T> { };
const Category: Category<ICategory> = model<ICategory>(
  "Category",
  categorySchema
) as Category<ICategory>;
export { Category };
