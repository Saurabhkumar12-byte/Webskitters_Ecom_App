import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProducts: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addProduct: (state, action: PayloadAction<{ id: string; name: string; description: string; price: number; imageUrl?: string; }>) => {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess: (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    editProduct: (state, action: PayloadAction<{ id: string; name: string; price: number; description:string;imageUrl?:string }>) => {
      state.loading = true;
      state.error = null;
    },
    editProductSuccess: (state, action: PayloadAction<Product>) => {
      state.loading = false;
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    editProductFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    deleteProductFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProduct,
  addProductSuccess,
  addProductFailure,
  editProduct,
  editProductSuccess,
  editProductFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
} = productSlice.actions;

export const selectProductById = (state: ProductState, id: string) =>
  state.products.find(product => product.id === id);

export default productSlice.reducer;
