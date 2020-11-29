import { body } from 'express-validator';
const createSchema = [
    body('name').notEmpty().withMessage('name is require.').isString().trim(),
    body('price').notEmpty().withMessage('Price is required.').isNumeric().withMessage('Price should be numeric.').trim(),
    body('brand').notEmpty().withMessage('brand is required.').isString().trim(),
    body('barcode').notEmpty().withMessage('barcode is required.').isString().trim(),
    body('return_days').optional({checkFalsy: true}).isNumeric().withMessage('Return days should be number.').trim(),
    body('status').if(body('status').exists()).isInt(),
    body('category').notEmpty().withMessage('category is required.').isString().trim(),
    body('subcategory').notEmpty().withMessage('subcategory is required.').isString().trim(),
    body('feature').notEmpty().withMessage('feature is required.').isString().trim(),
    body('specification').notEmpty().withMessage('specification is required.').isString().trim(),
    body('description').optional({checkFalsy: true}).isString().trim(),
    body('offer_upto').optional({checkFalsy: true}).isNumeric().trim(),
    body('offer_unit').custom(async (value, { req }) => {
        if (await req.body.offer_upto !== '' && value === '') {
            throw new Error('offer unit is required.')
        }
        return true;
    }).withMessage('offer unit is required.').trim()
]
export = createSchema ;