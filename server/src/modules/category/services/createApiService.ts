import { Category, ICategory } from "../model/Category";
export const getCategories = async () => {
  return await Category
    .aggregate([
      {
        "$lookup": {
          "from": "subcategories",
          "localField": "_id",
          "foreignField": "category",
          "as": "subcategories",
        },
      }, { "$project": { "name": 1, "subcategories.name": 1, "subcategories._id": 1 } }
    ]);
};