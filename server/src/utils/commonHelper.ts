import { SubCategory } from "./../modules/category/model/SubCategory";
import { Category } from "./../modules/category/model/Category";
import { Brand } from "../modules/brands/models/Brands";
export class CommonHelper {
  public static async getCategory() {
    let category = [];
    for await (const doc of await Category.find({ status: 1 })) {
      category[doc._id] = doc.name;
    }
    return category;
  }
  public static async getSubCategory(id: string) {
    let subCategory = []
    for await (const doc of await SubCategory.find({ category: id })) {
      subCategory[doc._id] = doc.name;
    }
    return subCategory;
  }
  public static async getBrands() {
    let brands = [];
    for await (const doc of await Brand.find({ status: 1 })) {
      brands[doc._id] = doc.name;
    }
    return brands;
  }
}
