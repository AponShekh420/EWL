"use client";
import DragAndDropFiles from "@/components/common/DragAndDropFiles";
import InputBox from "@/components/common/InputBox";
import MultiStepper from "@/components/common/MultiStepper";
import SelectBox from "@/components/common/SelectBox";
import TextBox from "@/components/common/TextBox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  addProductField,
  deleteExistingImages,
  deleteExistingThumb,
  resetProductFields,
} from "@/redux/features/product/productFormSlice";
import { activeStep } from "@/redux/features/stepper/stepperSlice";
import { RootState } from "@/redux/store";
import { ProductType, ProductValidationErrors } from "@/types/Product";
import { createFormData } from "@/utils/createFormData";
import { BASE_URL } from "@/utils/envVariable";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Editor = dynamic(
  () => import("@/components/dashboard/common/editor/Editor"),
  {
    ssr: false,
  }
);

export default function CreateProductForm({
  productData,
  categories,
}: {
  productData?: ProductType;
  categories?: { label: string; value: string }[];
}) {
  const [errors, setErrors] = useState<ProductValidationErrors>({});
  const dispatch = useDispatch();
  const { step } = useSelector((state: RootState) => state.stepper);
  const productForm = useSelector((state: RootState) => state.productForm);
  const path = usePathname();
  const router = useRouter();
  const totalStep = 6;

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = createFormData(productForm);

    if (path.includes("edit")) {
      if (!productData?._id) return;
      const res = await fetch(
        BASE_URL + "/api/ecommerce/products/" + productData?._id,
        {
          method: "PUT",
          body: formData,
        }
      );
      const data = await res.json();

      if (!data.success) {
        setErrors(data.errors || {});
        toast.error(data.message);
      }
      if (data.success) {
        toast.success(data.message);
        dispatch(resetProductFields());
        setTimeout(() => {
          router.push("/dashboard/ecommerce/products");
        }, 2000);
      }
    } else {
      const res = await fetch(BASE_URL + "/api/ecommerce/product", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!data.success) {
        setErrors(data.errors || {});
      }
      if (data.success) {
        toast.success(data.message);
        dispatch(resetProductFields());
        dispatch(activeStep(1));
      }
    }
  };

  useEffect(() => {
    if (!productData) return;
    dispatch(
      addProductField({
        ...productData,
        tags: productData?.tags.join(","),
        thumbnail: null,
        images: [],
        category: productData?.category,
        existingThumbnail: productData?.thumbnail,
        existingImages: productData?.images,
        existingAttachment: productData?.attachment,
      })
    );
  }, []);

  return (
    <MultiStepper totalStep={totalStep}>
      <form className="min-h-[50vh]" onSubmit={onHandleSubmit}>
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4">
            <div>
              <h5 className="font-bold text-lg">Product information</h5>
              <p className=" text-gray-700 mt-2">
                Add your product description and necessary information from here
              </p>
            </div>
            <div>
              <div className="grid sm:grid-cols-2 gap-8">
                <InputBox
                  name="title"
                  label="title"
                  placeholder="Product title"
                  value={productForm.title}
                  onChange={(e) =>
                    dispatch(addProductField({ title: e.target.value }))
                  }
                  error={errors?.title?.msg}
                />

                <SelectBox
                  name="category"
                  label="Category"
                  value={productForm?.category}
                  defaultValue={productForm?.category}
                  onChange={(val) =>
                    dispatch(addProductField({ category: val }))
                  }
                  options={categories ? categories : []}
                  error={errors?.category?.msg}
                />
                <InputBox
                  name="product-tags"
                  label="Product tags"
                  placeholder='Write tags separated by comma (" , ")'
                  value={productForm.tags}
                  onChange={(e) =>
                    dispatch(addProductField({ tags: e.target.value }))
                  }
                  error={errors?.tags?.msg}
                />
              </div>

              <div>
                <Label className="mb-4 mt-8">Short description</Label>
                <Editor
                  value={productForm.shortDescription}
                  onChange={(val) =>
                    dispatch(addProductField({ shortDescription: val }))
                  }
                />
                {errors.shortDescription && (
                  <span className="text-red-500 text-xs mt-2 ml-1">
                    {errors?.shortDescription?.msg}
                  </span>
                )}
              </div>
              <div>
                <Label className="mb-4 mt-8">Full description</Label>
                <Editor
                  value={productForm.description}
                  onChange={(val) =>
                    dispatch(addProductField({ description: val }))
                  }
                />
                {errors.description && (
                  <span className="text-red-500 text-xs mt-2 ml-1">
                    {errors?.description?.msg}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4 ">
            <div>
              <h5 className="text-lg font-bold">Upload images</h5>
              <p className=" text-gray-700 mt-2">
                Upload your product gallery and thumbnail image here
              </p>
            </div>
            <div className="grid sm:grid-cols-1 gap-8">
              <div className="">
                <label htmlFor="" className="mb-4 inline-block font-medium">
                  Thumbnail image
                </label>
                <DragAndDropFiles
                  onFileChange={(files) => {
                    if (files && files?.length > 0) {
                      console.log(files);
                      dispatch(addProductField({ thumbnail: files[0] }));
                    }
                  }}
                />
                {errors.thumbnail && (
                  <span className="text-red-500 text-xs mt-2 ml-1">
                    {errors?.thumbnail?.msg}
                  </span>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {productForm.thumbnail && (
                    <div className="relative w-fit">
                      <Image
                        src={URL.createObjectURL(productForm?.thumbnail)}
                        alt="preview"
                        width={220}
                        height={220}
                        className="rounded-md object-cover size-[220px]"
                      />
                      <button
                        className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                        type="button"
                        onClick={() =>
                          dispatch(addProductField({ thumbnail: null }))
                        }
                      >
                        <Icon
                          icon="material-symbols-light:delete-rounded"
                          width="22"
                          height="22"
                        />
                      </button>
                    </div>
                  )}
                  {productForm.existingThumbnail && (
                    <div className="relative w-fit">
                      <Image
                        src={productForm.existingThumbnail}
                        alt="preview"
                        width={220}
                        height={220}
                        className="rounded-md object-cover size-[220px]"
                      />
                      <button
                        className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                        type="button"
                        onClick={() => {
                          if (!productForm.existingThumbnail) {
                            return;
                          }

                          dispatch(
                            deleteExistingThumb(productForm.existingThumbnail)
                          );
                        }}
                      >
                        <Icon
                          icon="material-symbols-light:delete-rounded"
                          width="22"
                          height="22"
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="">
                <label htmlFor="" className="mb-4 inline-block font-medium">
                  Product Gallery Image
                </label>
                <DragAndDropFiles
                  MAX_FILES={5}
                  onFileChange={(files) => {
                    if (files && files?.length > 0) {
                      console.log(files);
                      dispatch(addProductField({ images: files }));
                    }
                  }}
                />
                {errors.images && (
                  <span className="text-red-500 text-xs mt-2 ml-1">
                    {errors?.images?.msg}
                  </span>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {productForm.images &&
                    productForm.images.length > 0 &&
                    productForm.images.map((file: File, index) => (
                      <div key={index} className="relative w-fit">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          width={220}
                          height={220}
                          className="rounded-md object-cover size-[220px]"
                        />
                        <button
                          className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                          type="button"
                          onClick={() => {
                            if (productForm.images) {
                              const filteredFiles = productForm.images.filter(
                                (_, i) => i !== index
                              );
                              dispatch(
                                addProductField({ images: filteredFiles })
                              );
                            }
                          }}
                        >
                          <Icon
                            icon="material-symbols-light:delete-rounded"
                            width="22"
                            height="22"
                          />
                        </button>
                      </div>
                    ))}
                  {productForm.existingImages &&
                    productForm.existingImages.length > 0 &&
                    productForm.existingImages.map(
                      (img: string, index: number) => (
                        <div key={index} className="relative w-fit">
                          <Image
                            src={img}
                            alt="preview"
                            width={220}
                            height={220}
                            className="rounded-md object-cover size-[220px]"
                          />
                          <button
                            className="p-1 bg-gray-200 rounded-md absolute top-2 right-2 hover:text-red-500"
                            type="button"
                            onClick={() => {
                              dispatch(deleteExistingImages(img));
                            }}
                          >
                            <Icon
                              icon="material-symbols-light:delete-rounded"
                              width="22"
                              height="22"
                            />
                          </button>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4">
            <div>
              <h5 className="text-lg font-bold">Inventory management</h5>
              <p className=" text-gray-700 mt-2">
                Add your inventory details here
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <InputBox
                name="sku"
                label="SKU"
                placeholder="SKU"
                value={productForm.sku}
                onChange={(e) =>
                  dispatch(addProductField({ sku: e.target.value }))
                }
                error={errors?.sku?.msg}
              />
              <InputBox
                name="isbn"
                label="GTIN, UPC, EAN, OR ISBN"
                placeholder="978-3-16-148410-0"
                value={productForm.isbn}
                onChange={(e) =>
                  dispatch(addProductField({ isbn: e.target.value }))
                }
                error={errors?.isbn?.msg}
              />

              <InputBox
                type="number"
                name="regular-price"
                label="Regular Price"
                placeholder="25"
                min="0"
                icon="$"
                value={productForm.regularPrice}
                onChange={(e) =>
                  dispatch(addProductField({ regularPrice: e.target.value }))
                }
                error={errors?.regularPrice?.msg}
              />
              <InputBox
                type="number"
                name="sale-price"
                label="Sale Price"
                placeholder="20"
                min="0"
                icon="$"
                value={productForm.salePrice}
                onChange={(e) =>
                  dispatch(addProductField({ salePrice: e.target.value }))
                }
                error={errors?.salePrice?.msg}
              />

              {/* <InputBox
                name="attributes-name"
                label="Attributes Name"
                placeholder="e.g color, size"
              />
              <InputBox
                name="attribute-values"
                label="Attributes values"
                placeholder="Separate values with a vertical bar (|)"
              /> */}
              <InputBox
                type="number"
                name="initial-stock"
                label="Initial number in stock"
                placeholder="0"
                min="0"
                value={productForm.stock}
                onChange={(e) =>
                  dispatch(addProductField({ stock: e.target.value }))
                }
                error={errors?.stock?.msg}
              />
              <div className="capitalize ">
                <Label className="mb-4">Stock Status</Label>
                <RadioGroup
                  value={productForm.stockStatus}
                  onValueChange={(val) =>
                    dispatch(addProductField({ stockStatus: val }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="in-stock"
                      id="in-stock"
                      className="size-5"
                    />
                    <Label htmlFor="option-one">in stock</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="out-of-stock"
                      id="out-of-stock"
                      className="size-5"
                    />
                    <Label htmlFor="out-of-stock">out of stock</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="on-backorder"
                      id="on-backorder"
                      className="size-5"
                    />
                    <Label htmlFor="on-backorder">On backorder</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-10">
                <div className="flex items-center gap-x-2">
                  <Checkbox
                    className="size-5 checkbox-t"
                    checked={productForm.isVisibleProductPage}
                    onCheckedChange={(val) =>
                      dispatch(addProductField({ isVisibleProductPage: val }))
                    }
                  />
                  <Label>Visible on the product page</Label>
                </div>
                <div className="flex items-center gap-x-2">
                  <Checkbox
                    className="size-5 checkbox-t"
                    checked={productForm.trackStockQuantity}
                    onCheckedChange={(val) =>
                      dispatch(addProductField({ trackStockQuantity: val }))
                    }
                  />
                  <Label>Track Stock quantity this product</Label>
                </div>
                <div className="flex items-center gap-x-2">
                  <Checkbox
                    className="size-5 checkbox-t"
                    checked={productForm.limitOneItemPerOrder}
                    onCheckedChange={(val) =>
                      dispatch(addProductField({ limitOneItemPerOrder: val }))
                    }
                  />

                  <Label>Limit purchases to 1 item per order?</Label>
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4">
            <div>
              <h5 className="text-lg font-bold">Shipping And Taxes</h5>
              <p className=" text-gray-700 mt-2">
                Add your shipping and tax info here
              </p>
            </div>
            <div>
              <div className="grid sm:grid-cols-2 gap-8">
                <InputBox
                  type="number"
                  name="weight"
                  label="Weight (LBS)"
                  placeholder="0"
                  min="0"
                  value={productForm.weight}
                  onChange={(e) =>
                    dispatch(addProductField({ weight: e.target.value }))
                  }
                  error={errors?.weight?.msg}
                />
                <InputBox
                  type="number"
                  name="declared-value"
                  label="Declared Value ($)"
                  placeholder="Use product's price"
                  min="0"
                  value={productForm.declaredValue}
                  onChange={(e) =>
                    dispatch(addProductField({ declaredValue: e.target.value }))
                  }
                  error={errors?.declaredValue?.msg}
                />
              </div>
              <div>
                <Label className="mb-4 mt-8">Dimensions (cm)</Label>
                <div className="grid sm:grid-cols-3 gap-8">
                  <InputBox
                    type="number"
                    name="length"
                    label=""
                    min="0"
                    placeholder="Length"
                    value={productForm.dimensionLength}
                    onChange={(e) =>
                      dispatch(
                        addProductField({ dimensionLength: e.target.value })
                      )
                    }
                    error={errors?.dimensionLength?.msg}
                  />
                  <InputBox
                    type="number"
                    name="width"
                    label=""
                    min="0"
                    placeholder="Width"
                    value={productForm.dimensionWidth}
                    onChange={(e) =>
                      dispatch(
                        addProductField({ dimensionWidth: e.target.value })
                      )
                    }
                    error={errors?.dimensionWidth?.msg}
                  />
                  <InputBox
                    type="number"
                    name="Height"
                    label=""
                    min="0"
                    placeholder="Height"
                    value={productForm.dimensionHeight}
                    onChange={(e) =>
                      dispatch(
                        addProductField({ dimensionHeight: e.target.value })
                      )
                    }
                    error={errors?.dimensionHeight?.msg}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 mt-8">
                <SelectBox
                  name="tax-status"
                  label="Tax Status"
                  value={productForm.taxStatus}
                  onChange={(val) =>
                    dispatch(addProductField({ taxStatus: val }))
                  }
                  options={[
                    { label: "Fruits", value: "fruits" },
                    { label: "Grocery", value: "grocery" },
                    { label: "Meat", value: "meat" },
                    { label: "Cat Food", value: "cat-food" },
                  ]}
                  error={errors?.taxStatus?.msg}
                />
                <SelectBox
                  name="tax-class"
                  label="Tax class"
                  value={productForm.taxClass}
                  onChange={(val) =>
                    dispatch(addProductField({ taxClass: val }))
                  }
                  options={[
                    { label: "Fruits", value: "fruits" },
                    { label: "Grocery", value: "grocery" },
                    { label: "Meat", value: "meat" },
                    { label: "Cat Food", value: "cat-food" },
                  ]}
                  error={errors?.taxClass?.msg}
                />
                <SelectBox
                  name="shipping-class"
                  label="Shipping Class"
                  value={productForm.shippingClass}
                  onChange={(val) =>
                    dispatch(addProductField({ shippingClass: val }))
                  }
                  options={[
                    { label: "Fruits", value: "fruits" },
                    { label: "Grocery", value: "grocery" },
                    { label: "Meat", value: "meat" },
                    { label: "Cat Food", value: "cat-food" },
                  ]}
                  error={errors?.shippingClass?.msg}
                />
              </div>
              <div className="flex items-center gap-x-2 mt-8">
                <Checkbox
                  checked={productForm.enelope}
                  onCheckedChange={(val) =>
                    dispatch(addProductField({ enelope: val }))
                  }
                  className="size-5 checkbox-t"
                />

                <Label>Enelope?</Label>
              </div>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4">
            <div>
              <h5 className="text-lg font-bold">Message management</h5>
              <p className=" text-gray-700 mt-2">
                Add your custom and checkout message
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <TextBox
                label="Add a custom message"
                name="custom-message"
                placeholder="Write custom message"
                value={productForm.customMessage}
                onChange={(e) =>
                  dispatch(addProductField({ customMessage: e.target.value }))
                }
                error={errors?.customMessage?.msg}
              />
              <div>
                <Label className="mb-4">Upload Attachment</Label>{" "}
                <Input
                  name="attachment"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      dispatch(
                        addProductField({
                          attachment: e.target.files[0] as File,
                        })
                      );
                      dispatch(
                        addProductField({
                          existingAttachment: "",
                        })
                      );
                    }
                  }}
                />
                {errors.customMessage && (
                  <span className="text-red-500 text-xs mt-2 ml-1">
                    {errors?.customMessage?.msg}
                  </span>
                )}
              </div>
              <TextBox
                label="Message on checkout page"
                name="checkout-message"
                placeholder="Write checkout page message"
                value={productForm.checkoutPageMessage}
                onChange={(e) =>
                  dispatch(
                    addProductField({ checkoutPageMessage: e.target.value })
                  )
                }
                error={errors?.checkoutPageMessage?.msg}
              />
            </div>
          </div>
        )}
        {step === 6 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4">
            <div>
              <h5 className="text-lg font-bold">SEO management</h5>
              <p className=" text-gray-700 mt-2">
                Add your product SEO meta data
              </p>
            </div>
            <div className="grid sm:grid-cols-1 gap-8">
              <InputBox
                name="meta-title"
                label="Meta Title"
                placeholder="Meta Title"
                value={productForm.metaTitle}
                onChange={(e) =>
                  dispatch(addProductField({ metaTitle: e.target.value }))
                }
                error={errors?.metaTitle?.msg}
              />
              {path.includes("edit") && (
                <InputBox
                  name="meta-slug"
                  label="Meta Slug"
                  placeholder="Meta slug"
                  value={productForm.slug}
                  onChange={(e) =>
                    dispatch(addProductField({ slug: e.target.value }))
                  }
                  error={errors?.slug?.msg}
                />
              )}

              <TextBox
                label="Meta Description"
                name="Meta Description"
                placeholder="Write meta description"
                className="min-h-30"
                value={productForm.metaDescription}
                onChange={(e) =>
                  dispatch(addProductField({ metaDescription: e.target.value }))
                }
                error={errors?.metaDescription?.msg}
              />
            </div>
          </div>
        )}
        {step === totalStep && (
          <Button variant="blue" type="submit" className="ml-auto block mt-10">
            {path.includes("edit") ? "Update" : "Submit"}
          </Button>
        )}
      </form>
    </MultiStepper>
  );
}
