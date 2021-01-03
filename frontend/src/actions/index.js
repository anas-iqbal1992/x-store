import axios from "axios";
import { GET_CATEGORIES,GET_PRODUCT_LIST,GET_PRODUCTS} from './types';
export const getCategories = () => async (dispatch) => {
    const res = await axios.get('/api/categories');
    dispatch({ type: GET_CATEGORIES, payload: res.data });
};
export const getProductList = () => async(dispatch) => {
    const res = await axios.get('/api/get-products-list');
    dispatch({type:GET_PRODUCT_LIST, payload:res.data})
}
export const  getProducts = (id) => async (dispatch) => {
    const res = await axios.get(`/api/get-products/${id}`);
    dispatch({type:GET_PRODUCTS, payload:res.data})
}