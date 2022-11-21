import { shopifyApi } from '../../api/shopifyApi';
import { setProduct, startLoadingProduct } from './productSlice';

export const getProduct = () => {
    return async ( dispatch, getState ) => {
        dispatch(startLoadingProduct());

        const { data } = await shopifyApi.get();
        dispatch(setProduct({ product: data }));
    }
}