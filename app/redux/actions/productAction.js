import { FETCH_PRODUCTS } from './types';
import { getProducts } from '../../data';

export const fetchProducts = (products) => dispatch => {
     dispatch({
        type: FETCH_PRODUCTS,
        payload: products
    })
}