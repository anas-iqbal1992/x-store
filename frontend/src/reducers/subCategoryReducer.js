import {  GET_SUBCATEGORIES } from '../actions/types';
export default function (state = [], action) {
    switch (action.type) {
        case GET_SUBCATEGORIES:
            return action.payload;
        default:
            return state;
    }
}