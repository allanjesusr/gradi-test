import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    product: {},
    quantity: 1,
    isLoading: false,
    totalPay: 28500
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
        increment: (state, { payload }) => {
            state.quantity += 1;
            state.totalPay = state.quantity * payload.price

        },
        decrement: (state, { payload }) => {
            if (state.quantity === 1) {
                state.quantity = 1;
            } else {
                state.quantity -= 1;
                state.totalPay = state.quantity * payload.price
            }

        },
    }
})

export const { startLoadingProduct, setProduct, increment, decrement } = productSlice.actions;
