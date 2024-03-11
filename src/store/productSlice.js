import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: []
    },
    reducers: {
        updateProduct: (state, action) => {
            state.products = action.payload
            console.log(state.products);
        }
    }
})

export const { updateProduct } = productSlice.actions;

export default productSlice