"use client";
import InputBox from "@/components/common/InputBox";
import SelectBox from "@/components/common/SelectBox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  addShippingField,
  addShippingMethod,
  resetShippingFields,
} from "@/redux/features/shipping/shippingFormSlice";
import { RootState } from "@/redux/store";
import { ShippingErrorType, ShippingType } from "@/types/Shipping";
import { BASE_URL } from "@/utils/envVariable";
import { Country } from "country-state-city";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
export default function ShippingForm({
  shipping,
}: {
  shipping?: ShippingType;
}) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<ShippingErrorType>({});
  const [shippingCost, setShippingCost] = useState({
    localPickup:
      shipping?.shippingMethods.find(
        (item) => item.methodName === "local-pickup",
      )?.cost || 0,
    flatRate:
      shipping?.shippingMethods.find((item) => item.methodName === "flat-rate")
        ?.cost || 0,
    myShemenClass:
      shipping?.shippingMethods.find(
        (item) => item.methodName === "my-shemen-class",
      )?.cost || 0,
    lbClass:
      shipping?.shippingMethods.find(
        (item) => item.methodName === "1.5-lb-class",
      )?.cost || 0,
    ebookClass:
      shipping?.shippingMethods.find(
        (item) => item.methodName === "ebook-class",
      )?.cost || 0,
  });
  const [countries] = useState(
    Country.getAllCountries().map((item) => ({
      label: item.name,
      value: item.isoCode,
    })),
  );
  const { shippingId, zoneName, region, shippingMethods } = useSelector(
    (state: RootState) => state.shippingForm,
  );
  const path = usePathname();
  const router = useRouter();
  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("zoneName", zoneName);
      formData.append("region", region);
      formData.append("shippingMethods", JSON.stringify(shippingMethods));
      if (path.includes("edit")) {
        if (!shipping?._id) return;
        const res = await fetch(
          BASE_URL + "/api/ecommerce/shipping/" + shippingId,
          {
            method: "PUT",
            body: JSON.stringify({
              zoneName,
              region,
              shippingMethods,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const data = await res.json();
        console.log("response", data);
        if (!data.success) {
          setErrors(data.errors || {});
          toast.error(data.message);
        } else {
          dispatch(resetShippingFields());
          router.push("/dashboard/ecommerce/shipping");
          toast.success(data.message);
        }
      } else {
        const res = await fetch(BASE_URL + "/api/ecommerce/shipping/", {
          method: "POST",
          body: JSON.stringify({
            zoneName,
            region,
            shippingMethods,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        console.log("response", data);
        if (!data.success) {
          setErrors(data.errors || {});
          toast.error(data.message);
        } else {
          dispatch(resetShippingFields());
          toast.success(data.message);
        }
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (!shipping) {
      return;
    }
    console.log(shipping);
    dispatch(
      addShippingField({
        ...shipping,
        shippingId: shipping._id,
      }),
    );
  }, [shipping, dispatch]);
  useEffect(() => {
    console.log(shippingMethods);
  }, [shippingMethods]);
  return (
    <div>
      <form
        onSubmit={onHandleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4 mt-10"
      >
        <div>
          <h5 className="font-bold text-lg capitalize">
            Shipping method for delivery
          </h5>
          <p className=" text-gray-700 mt-2">
            Create or Update shipping method with charges
          </p>
        </div>
        <div>
          <div className="grid sm:grid-cols-1 gap-8">
            <InputBox
              label="Zone Name"
              name="zone-name"
              value={zoneName}
              onChange={(e) =>
                dispatch(addShippingField({ zoneName: e.target.value }))
              }
              error={errors?.zoneName?.msg}
            />
            <SelectBox
              name="Region's"
              label="region"
              value={region}
              onChange={(val) => dispatch(addShippingField({ region: val }))}
              options={[
                { label: "Everywhere", value: "everywhere" },
                ...countries,
              ]}
              error={errors?.taxStatus?.msg}
            />
          </div>
          <div>
            <h5 className="font-bold text-lg mt-8">Shipping Methods</h5>
            <p className=" text-gray-700 mt-2">
              Add shipping methods for this shipping zone
            </p>
            {/* Shipping Methods Form */}
            <div className="grid sm:grid-cols-1 gap-8 mt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Checkbox
                    className="size-6"
                    checked={shippingMethods.some(
                      (method) => method.methodName === "usps",
                    )}
                    onCheckedChange={(value) =>
                      dispatch(
                        addShippingMethod({
                          checked: value,
                          methodName: "usps",
                          cost: 0,
                        }),
                      )
                    }
                  />
                  <span className="ml-2">USPS</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Checkbox
                    checked={shippingMethods.some(
                      (method) => method.methodName === "free-shipping",
                    )}
                    className="size-6"
                    onCheckedChange={(value) =>
                      dispatch(
                        addShippingMethod({
                          checked: value,
                          methodName: "free-shipping",
                          cost: 0,
                        }),
                      )
                    }
                  />
                  <span className="ml-2">Free Shipping</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Checkbox
                    checked={shippingMethods.some(
                      (method) => method.methodName === "local-pickup",
                    )}
                    className="size-6"
                    onCheckedChange={(value) =>
                      dispatch(
                        addShippingMethod({
                          checked: value,
                          methodName: "local-pickup",
                          cost: shippingCost.localPickup,
                        }),
                      )
                    }
                  />
                  <span className="ml-2 text-nowrap">Local pickup</span>
                </div>
                <InputBox
                  label=""
                  name="cost"
                  disabled={shippingMethods.some(
                    (method) => method.methodName === "local-pickup",
                  )}
                  value={shippingCost.localPickup}
                  className="-mt-4 w-25 sm:w-full"
                  onChange={(e) => {
                    setShippingCost((prev) => ({
                      ...prev,
                      localPickup: Number(e.target.value),
                    }));
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Checkbox
                    className="size-6"
                    checked={shippingMethods.some(
                      (method) => method.methodName === "flat-rate",
                    )}
                    onCheckedChange={(value) =>
                      dispatch(
                        addShippingMethod({
                          checked: value,
                          methodName: "flat-rate",
                          cost: shippingCost.flatRate,
                        }),
                      )
                    }
                  />
                  <span className="ml-2 text-nowrap">Flat Rate</span>
                </div>
                <InputBox
                  label=""
                  disabled={shippingMethods.some(
                    (method) => method.methodName === "flat-rate",
                  )}
                  name="cost"
                  value={shippingCost.flatRate}
                  className="-mt-4 w-25 sm:w-full"
                  onChange={(e) =>
                    setShippingCost((prev) => ({
                      ...prev,
                      flatRate: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Checkbox
                    className="size-6"
                    checked={shippingMethods.some(
                      (method) => method.methodName === "my-shemen-class",
                    )}
                    onCheckedChange={(value) =>
                      dispatch(
                        addShippingMethod({
                          checked: value,
                          methodName: "my-shemen-class",
                          cost: shippingCost.myShemenClass,
                        }),
                      )
                    }
                  />
                  <span className="ml-2 text-nowrap">My Shemen Class</span>
                </div>
                <InputBox
                  label=""
                  disabled={shippingMethods.some(
                    (method) => method.methodName === "my-shemen-class",
                  )}
                  name="cost"
                  value={shippingCost.myShemenClass}
                  className="-mt-4 w-25 sm:w-full"
                  onChange={(e) =>
                    setShippingCost((prev) => ({
                      ...prev,
                      myShemenClass: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Checkbox
                    className="size-6"
                    checked={shippingMethods.some(
                      (method) => method.methodName === "1.5-lb-class",
                    )}
                    onCheckedChange={(value) =>
                      dispatch(
                        addShippingMethod({
                          checked: value,
                          methodName: "1.5-lb-class",
                          cost: shippingCost.lbClass,
                        }),
                      )
                    }
                  />
                  <span className="ml-2 text-nowrap">1.5 lb class</span>
                </div>
                <InputBox
                  label=""
                  disabled={shippingMethods.some(
                    (method) => method.methodName === "1.5-lb-class",
                  )}
                  name="cost"
                  value={shippingCost.lbClass}
                  className="-mt-4 w-25 sm:w-full"
                  onChange={(e) =>
                    setShippingCost((prev) => ({
                      ...prev,
                      lbClass: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Checkbox
                    className="size-6"
                    checked={shippingMethods.some(
                      (method) => method.methodName === "ebook-class",
                    )}
                    onCheckedChange={(value) =>
                      dispatch(
                        addShippingMethod({
                          checked: value,
                          methodName: "ebook-class",
                          cost: shippingCost.ebookClass,
                        }),
                      )
                    }
                  />
                  <span className="ml-2 text-nowrap">Ebook class</span>
                </div>
                <InputBox
                  label=""
                  disabled={shippingMethods.some(
                    (method) => method.methodName === "ebook-class",
                  )}
                  name="cost"
                  value={shippingCost.ebookClass}
                  className="-mt-4 w-25 sm:w-full"
                  onChange={(e) =>
                    setShippingCost((prev) => ({
                      ...prev,
                      ebookClass: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <Button className="ml-auto w-fit block my-8" variant="blue">
            {path.includes("edit") ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
