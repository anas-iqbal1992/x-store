import { combineReducers } from 'redux';
import categories from './categoryReducer';
import subCategories from './subCategoryReducer';
import productList from './productListReducer';
import products from './productsReducer';
export default combineReducers({
    categories,
    subCategories,
    productList,
    products
});