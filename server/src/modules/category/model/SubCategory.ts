import { Document, Schema,model,Model } from "mongoose";
import { SubCategoryInterface } from "../interfaces/SubCategory";
import { Category } from "./Category";
export interface ISubCategory extends SubCategoryInterface, Document {}
const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    category:{
      type: Schema.Types.ObjectId, ref: Category,
      required: true
    }
  },
  { timestamps: false }
);
export const SubCategory: Model<ISubCategory> = model<ISubCategory>("SubCategory", subCategorySchema);

