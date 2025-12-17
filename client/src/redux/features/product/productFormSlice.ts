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
  //   2nd tab
  existingThumbnail: "",
  existingAttachment: "",
  existingImages: [],
  deletedImages: [],
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

  taxStatus: "",
  taxClass: "",
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
    deleteExistingThumb: (state, action: { type: string; payload: string }) => {
      if (!state.existingThumbnail) {
        return;
      }
      state.existingThumbnail = "";
      state.deletedImages?.push(action.payload);
    },
    deleteExistingAttachment: (
      state,
      action: { type: string; payload: string }
    ) => {
      if (!state.existingAttachment) {
        return;
      }
      state.existingAttachment = "";
      state.deletedImages?.push(action.payload);
    },
    deleteExistingImages: (
      state,
      action: { type: string; payload: string }
    ) => {
      if (!state.existingImages) {
        return;
      }
      state.existingImages = state?.existingImages.filter(
        (img) => img !== action.payload
      );

      state.deletedImages?.push(action.payload);
    },
    resetProductFields: () => {
      return initialState;
    },
  },
});

export const {
  addProductField,
  resetProductFields,
  deleteExistingThumb,
  deleteExistingImages,
  deleteExistingAttachment,
} = productFormSlice.actions;

export default productFormSlice.reducer;
