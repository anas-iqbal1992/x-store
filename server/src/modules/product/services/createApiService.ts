import { Category } from "../../category/model/Category";
import { Product } from "../../product/models/Product";
import _ from 'lodash';
export const getProductsList = async () => {
  return await Category
    .aggregate([
      {
        "$lookup": {
          "from": "products",
          "as": "product",
          "let": { "indicator_id": '$_id' },
          "pipeline": [
            { "$match": { "$expr": { "$eq": ["$category", "$$indicator_id"] } } },
            { "$limit": 6 }
          ],

        },
      },
      {
        "$project": {
          '_id': '$_id', "name": 1, "product.name": 1, "product._id": 1, "product.main_images": 1, "product.price": 1, "product.offer": 1, "product.brand": 1
        }
      }
    ]).limit(4);
};
export const getProducts = async (req: any) => {
  return new Promise(async (resolve, reject) => {
    const page = _.isUndefined(req.params.page) ? 1 : req.params.page;
    const options = {
      sort: { createdAt: -1 },
      lean: true,
      page: page,
      limit: 20,
      populate: [{ path: "category", select: 'name' }, { path: "subcategory", select: 'name' }]
    };
    const products = await Product.paginate({ status: 1, subcategory: req.params.id }, options);
    if (!_.isEmpty(products)) {
      resolve(products);
    } else {
      reject(new Error('Something went wrong!'));
    }
  });
}