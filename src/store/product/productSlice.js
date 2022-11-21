import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    product: {},
    quantity: 0,
    isLoading: false
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        startLoadingProduct: (state) => {
            state.isLoading = true;
        },
        setProduct: (state, action) => {
            state.isLoading = false;
            state.product = action.payload.product;
        },
        increment: (state) => {
            state.quantity += 1
        },
        decrement: (state) => {
            state.quantity -= 1
        },
    }
})

export const { startLoadingProduct, setProduct, increment, decrement } = productSlice.actions;
