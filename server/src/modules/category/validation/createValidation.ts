import  { body }  from 'express-validator';
const createSchema = [
    body('name').notEmpty().withMessage('category name is require.').isString().trim(),
    body('description').isString().trim(),
    body('status').if(body('status').exists()).isNumeric(),
    body('subcategory').isArray(),
    body('subcategory.*.subCatname').isString().notEmpty().trim(),
    body('subcategory.*.subCatdescription').isString().trim(),
]
export = createSchema;
