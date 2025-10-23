import { ProductFormState } from "@/types/Product";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProductFormState = {
  title: "",
  category: "",
  shortDescription: "",
  tags: "",
  description: "",
  //   2nd tab
  thumbnail: null,
  images: null,
  //   3rd tab
  sku: "",
  isbn: "",
  regularPrice: "",
  salePrice: "",
  stock: "",
  stockStatus: "",
  isVisibleProductPage: false,
  trackStockQuantity: false,
  limitOneItemPerOrder: false,
  //   4th tab
  weight: "",
  declaredValue: "",
  dimensionLength: "",
  dimensionWidth: "",
  dimensionHeight: "",

  textStatus: "",
  textClass: "",
  shippingClass: "",
  enelope: false,
  //   5th tab
  customMessage: "",
  attachment: null,
  checkoutPageMessage: "",
  metaData: "",
  metaDescription: "",
};

export const productFormSlice = createSlice({
  name: "product-form",
  initialState,
  reducers: {
    addProductField: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetProductFields: () => {
      return initialState;
    },
  },
});

export const { addProductField, resetProductFields } = productFormSlice.actions;

export default productFormSlice.reducer;
