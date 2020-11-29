import { Category, ICategory } from "./../model/Category";
import { SubCategory, ISubCategory } from "./../model/SubCategory";
export const addCategory = async (req: any) => {
  const body = await req.body;
  const category = await new Category();
  category.name = body.name;
  category.description = body.description;
  category.reference = req.user._id;
  await category.save();
  return category;
};
export const addSubCategory = async (req: any, category: ICategory) => {
  const body = await req.body;
  body.subcategory.forEach((item: {subCatname:string,subCatdescription:string}) => {
    const model = new SubCategory();
      model.name = item.subCatname
      model.description = item.subCatdescription
      model.category = category._id
      model.save()
  });
}
export const getCategories = async (query: {}) => {
  const options = {
    sort: { createdAt: -1 },
    lean: true,
    page: 1,
    limit: 10,
  };
  return await Category.paginate({}, options);
};
export const getCategory = async (_id: string) => {
  return await Category.findById(_id);
};
export const updateCategory = async (req: any) => {
  const body = await req.body;
  await Category.replaceOne({ _id: req.params.id }, { subcategories: [] });
  const category = await Category.findOne({ _id: req.params.id });
  if (!category) throw new Error("data not found");
  category.name = body.name;
  category.description = body.description;
  category.reference = req.user._id;
  await category.save();
  return category;
};
export const updateSubCategory = async (req:any, category: ICategory) => {
  SubCategory.deleteMany({ category: category._id }, function (err) {
    if(err)  throw new Error("data not found");;
  });
  const body = await req.body;
  body.subcategory.forEach((item: {subCatname:string,subCatdescription:string}) => {
    const model = new SubCategory();
      model.name = item.subCatname
      model.description = item.subCatdescription
      model.category = category._id
      model.save()
  });
}
