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
import { addProductField } from "@/redux/features/product/productFormSlice";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const Editor = dynamic(
  () => import("@/components/dashboard/common/editor/Editor"),
  {
    ssr: false,
  }
);

export default function CreateProductForm() {
  const dispatch = useDispatch();
  const { step } = useSelector((state: RootState) => state.stepper);
  const productForm = useSelector((state: RootState) => state.productForm);
  const totalStep = 6;

  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.clear();
    console.log(productForm);
  };

  return (
    <MultiStepper totalStep={totalStep}>
      <form action="#" className="min-h-[50vh]" onSubmit={onHandleSubmit}>
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
                />
                <SelectBox
                  name="category"
                  label="Category"
                  value={productForm.title}
                  onChange={(val) =>
                    dispatch(addProductField({ category: val }))
                  }
                  options={[
                    { label: "Fruits", value: "fruits" },
                    { label: "Grocery", value: "grocery" },
                    { label: "Meat", value: "meat" },
                    { label: "Cat Food", value: "cat-food" },
                  ]}
                />
                <InputBox
                  name="product-tags"
                  label="Product tags"
                  placeholder='Write tags separated by comma (" , ")'
                  value={productForm.tags}
                  onChange={(e) =>
                    dispatch(addProductField({ tags: e.target.value }))
                  }
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
              </div>
              <div>
                <Label className="mb-4 mt-8">Full description</Label>
                <Editor
                  value={productForm.description}
                  onChange={(val) =>
                    dispatch(addProductField({ description: val }))
                  }
                />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {productForm.thumbnail && (
                    <div className="relative w-fit">
                      <Image
                        src={URL.createObjectURL(productForm.thumbnail)}
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
              />
              <InputBox
                name="isbn"
                label="GTIN, UPC, EAN, OR ISBN"
                placeholder="978-3-16-148410-0"
                value={productForm.isbn}
                onChange={(e) =>
                  dispatch(addProductField({ isbn: e.target.value }))
                }
              />

              <InputBox
                type="number"
                name="regular-price"
                label="Regular Price"
                placeholder="25"
                icon="$"
                value={productForm.regularPrice}
                onChange={(e) =>
                  dispatch(addProductField({ regularPrice: e.target.value }))
                }
              />
              <InputBox
                type="number"
                name="sale-price"
                label="Sale Price"
                placeholder="20"
                icon="$"
                value={productForm.salePrice}
                onChange={(e) =>
                  dispatch(addProductField({ salePrice: e.target.value }))
                }
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
                value={productForm.stock}
                onChange={(e) =>
                  dispatch(addProductField({ stock: e.target.value }))
                }
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
                  value={productForm.weight}
                  onChange={(e) =>
                    dispatch(addProductField({ weight: e.target.value }))
                  }
                />
                <InputBox
                  type="number"
                  name="declared-value"
                  label="Declared Value ($)"
                  placeholder="Use product's price"
                  value={productForm.declaredValue}
                  onChange={(e) =>
                    dispatch(addProductField({ declaredValue: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="mb-4 mt-8">Dimensions (cm)</Label>
                <div className="grid sm:grid-cols-3 gap-8">
                  <InputBox
                    type="number"
                    name="length"
                    label=""
                    placeholder="Length"
                    value={productForm.dimensionLength}
                    onChange={(e) =>
                      dispatch(
                        addProductField({ dimensionLength: e.target.value })
                      )
                    }
                  />
                  <InputBox
                    type="number"
                    name="width"
                    label=""
                    placeholder="Width"
                    value={productForm.dimensionWidth}
                    onChange={(e) =>
                      dispatch(
                        addProductField({ dimensionWidth: e.target.value })
                      )
                    }
                  />
                  <InputBox
                    type="number"
                    name="Height"
                    label=""
                    placeholder="Height"
                    value={productForm.dimensionHeight}
                    onChange={(e) =>
                      dispatch(
                        addProductField({ dimensionHeight: e.target.value })
                      )
                    }
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 mt-8">
                <SelectBox
                  name="tax-status"
                  label="Tax Status"
                  value={productForm.textStatus}
                  onChange={(val) =>
                    dispatch(addProductField({ textStatus: val }))
                  }
                  options={[
                    { label: "Fruits", value: "fruits" },
                    { label: "Grocery", value: "grocery" },
                    { label: "Meat", value: "meat" },
                    { label: "Cat Food", value: "cat-food" },
                  ]}
                />
                <SelectBox
                  name="tax-class"
                  label="Tax class"
                  value={productForm.textClass}
                  onChange={(val) =>
                    dispatch(addProductField({ textClass: val }))
                  }
                  options={[
                    { label: "Fruits", value: "fruits" },
                    { label: "Grocery", value: "grocery" },
                    { label: "Meat", value: "meat" },
                    { label: "Cat Food", value: "cat-food" },
                  ]}
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
                />
              </div>
              <div className="flex items-center gap-x-2 mt-8">
                <Checkbox className="size-5 checkbox-t" />

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
              />
              <div>
                <Label className="mb-4">Upload Attachment</Label>{" "}
                <Input
                  name="attachment"
                  type="file"
                  onChange={(e) =>
                    dispatch(addProductField({ attachment: e.target.files }))
                  }
                />
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
                value={productForm.metaData}
                onChange={(e) =>
                  dispatch(addProductField({ metaData: e.target.value }))
                }
              />
              <TextBox
                label="Meta Description"
                name="Meta Description"
                placeholder="Write meta description"
                className="min-h-30"
                value={productForm.metaDescription}
                onChange={(e) =>
                  dispatch(addProductField({ metaDescription: e.target.value }))
                }
              />
            </div>
          </div>
        )}
        {step === totalStep && (
          <Button variant="blue" type="submit" className="ml-auto block mt-10">
            Submit
          </Button>
        )}
      </form>
    </MultiStepper>
  );
}
