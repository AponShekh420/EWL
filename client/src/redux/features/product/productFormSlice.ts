import { ProductFormState } from "@/types/Product";
import { createSlice } from "@reduxjs/toolkit";
export const stepProductFields = {
  step1: ["title", "category", "shortDescription", "tags", "description"],
  step2: ["thumbnail", "images"],
  step3: ["sku", "isbn", "regularPrice", "salePrice", "stock", "stockStatus"],
  step4: [
    "weight",
    "declaredValue",
    "dimensionLength",
    "dimensionWidth",
    "dimensionHeight",
    "taxStatus",
    "shippingClass",
  ],
  step5: ["customMessage", "attachment", "checkoutPageMessage"],
  step6: ["metaTitle", "metaDescription"],
};
const initialState: ProductFormState = {
  title: "",
  category: "",
  shortDescription: "",
  slug: "",
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
  stockStatus: "in-stock",
  isVisibleProductPage: true,
  trackStockQuantity: false,
  limitOneItemPerOrder: false,
  //   4th tab
  weight: "",
  declaredValue: "",
  dimensionLength: "",
  dimensionWidth: "",
  dimensionHeight: "",

  taxStatus: "no",
  shippingClass: "",
  enelope: false,
  //   5th tab
  customMessage: "",
  attachment: null,
  checkoutPageMessage: "",
  metaTitle: "",
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
      action: { type: string; payload: string },
    ) => {
      if (!state.existingAttachment) {
        return;
      }
      state.existingAttachment = "";
      state.deletedImages?.push(action.payload);
    },
    deleteExistingImages: (
      state,
      action: { type: string; payload: string },
    ) => {
      if (!state.existingImages) {
        return;
      }
      state.existingImages = state?.existingImages.filter(
        (img) => img !== action.payload,
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
