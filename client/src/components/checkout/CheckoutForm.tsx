"use client";
import { addCheckoutField } from "@/redux/features/checkout/checkoutFormSlice";
import { RootState } from "@/redux/store";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputBox from "../common/InputBox";
import SelectBox from "../common/SelectBox";
import TextBox from "../common/TextBox";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
type SelectBoxFiled = {
  label: string;
  value: string;
};
export default function CheckoutForm() {
  const checkoutForm = useSelector((state: RootState) => state.checkout);
  const dispach = useDispatch();
  const [countries] = useState(
    Country.getAllCountries().map((item) => ({
      label: item.name,
      value: item.isoCode,
    })),
  );
  const [states, setStates] = useState<SelectBoxFiled[]>([]);
  const [statesDifferent, setStatesDifferent] = useState<SelectBoxFiled[]>([]);

  // Update states whenever the country changes
  useEffect(() => {
    if (checkoutForm.country) {
      const countryStates = State.getStatesOfCountry(checkoutForm.country);
      console.log(countryStates);
      const filterState = countryStates.map((item) => ({
        label: item.name,
        value: item.isoCode,
      }));
      setStates(filterState);
    } else {
      setStates([]);
    }
  }, [checkoutForm.country]);

  useEffect(() => {
    if (checkoutForm.differentBillingAddress.country) {
      const countryStates = State.getStatesOfCountry(
        checkoutForm.differentBillingAddress.country,
      );
      const filterState = countryStates.map((item) => ({
        label: item.name,
        value: item.isoCode,
      }));
      setStatesDifferent(filterState);
    } else {
      setStatesDifferent([]);
    }
  }, [checkoutForm.differentBillingAddress.country]);
  return (
    <form action="" className="my-10  ">
      {/* billing address */}
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <InputBox
            name="FistName"
            label="First name"
            value={checkoutForm.firstName}
            onChange={(e) =>
              dispach(addCheckoutField({ firstName: e.target.value }))
            }
            placeholder="Enter first name"
          />
          <InputBox
            name="lastName"
            label="Last name"
            value={checkoutForm.lastName}
            onChange={(e) =>
              dispach(addCheckoutField({ lastName: e.target.value }))
            }
            placeholder="Enter last name"
          />
        </div>
        <InputBox
          name="email"
          label="Email"
          value={checkoutForm.email}
          onChange={(e) => dispach(addCheckoutField({ email: e.target.value }))}
          placeholder="Enter email address"
        />
        <div className="grid grid-cols-2 gap-4">
          <InputBox
            name="spouseName"
            label="Spouse name"
            placeholder="Enter Spouse name"
            value={checkoutForm.spouseName}
            onChange={(e) =>
              dispach(addCheckoutField({ spouseName: e.target.value }))
            }
          />
          <InputBox
            name="hearAboutUs"
            label="How did you hear about us"
            placeholder="Enter your answer"
            value={checkoutForm.howDidYouHearAboutUs}
            onChange={(e) =>
              dispach(
                addCheckoutField({ howDidYouHearAboutUs: e.target.value }),
              )
            }
          />
        </div>
        <div>
          <Label htmlFor="country" className="capitalize mb-4">
            Country/Region
          </Label>
          <SelectBox
            name=""
            label=""
            className={`w-full `}
            placeholder="Choose country"
            value={checkoutForm.country}
            onChange={(val) => dispach(addCheckoutField({ country: val }))}
            options={countries}
          />
        </div>
        <InputBox
          name="streetAddress"
          label="Street address"
          placeholder="Enter your street address"
          value={checkoutForm.streetAddress}
          onChange={(e) =>
            dispach(addCheckoutField({ streetAddress: e.target.value }))
          }
        />

        <InputBox
          name=""
          label=""
          placeholder="Appartment, suite, unit, etc (optional)"
          value={checkoutForm.apartment}
          onChange={(e) =>
            dispach(addCheckoutField({ apartment: e.target.value }))
          }
        />
        <div className="grid grid-cols-3 gap-4">
          <SelectBox
            name="state"
            label="State"
            className={`w-full `}
            placeholder="Choose state"
            value={checkoutForm.state}
            onChange={(val) => dispach(addCheckoutField({ state: val }))}
            options={states}
          />
          <InputBox
            name="city"
            label="Town/City"
            placeholder="Enter city"
            value={checkoutForm.city}
            onChange={(e) =>
              dispach(addCheckoutField({ city: e.target.value }))
            }
          />
          <InputBox
            name="zip"
            label="ZIP Code"
            placeholder="Enter ZIP code"
            value={checkoutForm.zipCode}
            onChange={(e) =>
              dispach(addCheckoutField({ zipCode: e.target.value }))
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputBox
            name="phone"
            label="Phone number"
            placeholder="Enter phone number"
            value={checkoutForm.phoneNumber}
            onChange={(e) =>
              dispach(addCheckoutField({ phoneNumber: e.target.value }))
            }
          />
          <InputBox
            name="otherPhone"
            label="Other Phone number (optional)"
            placeholder="Enter other phone number"
            value={checkoutForm.otherPhoneNumber}
            onChange={(e) =>
              dispach(addCheckoutField({ otherPhoneNumber: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="flex items-center py-10">
        <Checkbox
          checked={checkoutForm.isDifferentBillingAddress}
          onCheckedChange={(val) =>
            dispach(
              addCheckoutField({
                isDifferentBillingAddress: val as boolean,
              }),
            )
          }
          className="size-5 border-black"
        />
        <p className="ml-2 inline-block font-bold">
          {checkoutForm.isDifferentBillingAddress ? "Skip " : ""}Different
          Billing Address
        </p>
      </div>
      {/* diffent billing address */}
      {checkoutForm.isDifferentBillingAddress && (
        <div className="space-y-8 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <InputBox
              name="differentBillingAddress.firstName"
              label="First name"
              value={checkoutForm.differentBillingAddress.firstName}
              onChange={(e) =>
                dispach(
                  addCheckoutField({
                    differentBillingAddress: {
                      ...checkoutForm.differentBillingAddress,
                      firstName: e.target.value,
                    },
                  }),
                )
              }
              placeholder="Enter first name"
            />

            <InputBox
              name="differentBillingAddress.lastName"
              label="Last name"
              value={checkoutForm.differentBillingAddress.lastName}
              onChange={(e) =>
                dispach(
                  addCheckoutField({
                    differentBillingAddress: {
                      ...checkoutForm.differentBillingAddress,
                      lastName: e.target.value,
                    },
                  }),
                )
              }
              placeholder="Enter last name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputBox
              name="differentBillingAddress.email"
              label="Email"
              value={checkoutForm.differentBillingAddress.email}
              onChange={(e) =>
                dispach(
                  addCheckoutField({
                    differentBillingAddress: {
                      ...checkoutForm.differentBillingAddress,
                      email: e.target.value,
                    },
                  }),
                )
              }
              placeholder="Enter email address"
            />
            <InputBox
              name="differentBillingAddress.spouseName"
              label="Spouse name"
              value={checkoutForm.differentBillingAddress.spouseName}
              onChange={(e) =>
                dispach(
                  addCheckoutField({
                    differentBillingAddress: {
                      ...checkoutForm.differentBillingAddress,
                      spouseName: e.target.value,
                    },
                  }),
                )
              }
              placeholder="Enter spouse name"
            />
          </div>

          <SelectBox
            name="differentBillingAddress.country"
            label="Country/Region"
            value={checkoutForm.differentBillingAddress.country}
            onChange={(val) =>
              dispach(
                addCheckoutField({
                  differentBillingAddress: {
                    ...checkoutForm.differentBillingAddress,
                    country: val,
                  },
                }),
              )
            }
            placeholder="Choose country"
            options={countries}
          />

          <InputBox
            name="differentBillingAddress.streetAddress"
            label="Street address"
            value={checkoutForm.differentBillingAddress.streetAddress}
            onChange={(e) =>
              dispach(
                addCheckoutField({
                  differentBillingAddress: {
                    ...checkoutForm.differentBillingAddress,
                    streetAddress: e.target.value,
                  },
                }),
              )
            }
            placeholder="Enter street address"
          />

          <InputBox
            name="differentBillingAddress.apartment"
            label=""
            value={checkoutForm.differentBillingAddress.apartment}
            onChange={(e) =>
              dispach(
                addCheckoutField({
                  differentBillingAddress: {
                    ...checkoutForm.differentBillingAddress,
                    apartment: e.target.value,
                  },
                }),
              )
            }
            placeholder="Apartment, suite, unit, etc"
          />

          <div className="grid grid-cols-3 gap-4 ">
            <SelectBox
              name="differentBillingAddress.state"
              label="State"
              value={checkoutForm.differentBillingAddress.state}
              onChange={(val) =>
                dispach(
                  addCheckoutField({
                    differentBillingAddress: {
                      ...checkoutForm.differentBillingAddress,
                      state: val,
                    },
                  }),
                )
              }
              placeholder="Choose state"
              options={statesDifferent}
            />

            <InputBox
              name="differentBillingAddress.city"
              label="Town/City"
              value={checkoutForm.differentBillingAddress.city}
              onChange={(e) =>
                dispach(
                  addCheckoutField({
                    differentBillingAddress: {
                      ...checkoutForm.differentBillingAddress,
                      city: e.target.value,
                    },
                  }),
                )
              }
              placeholder="Enter city"
            />

            <InputBox
              name="differentBillingAddress.zipCode"
              label="ZIP Code"
              value={checkoutForm.differentBillingAddress.zipCode}
              onChange={(e) =>
                dispach(
                  addCheckoutField({
                    differentBillingAddress: {
                      ...checkoutForm.differentBillingAddress,
                      zipCode: e.target.value,
                    },
                  }),
                )
              }
              placeholder="Enter ZIP code"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputBox
              name="differentBillingAddress.phoneNumber"
              label="Phone number"
              value={checkoutForm.differentBillingAddress.phoneNumber}
              onChange={(e) =>
                dispach(
                  addCheckoutField({
                    differentBillingAddress: {
                      ...checkoutForm.differentBillingAddress,
                      phoneNumber: e.target.value,
                    },
                  }),
                )
              }
              placeholder="Enter phone number"
            />

            <InputBox
              name="differentBillingAddress.otherPhoneNumber"
              label="Other Phone number"
              value={checkoutForm.differentBillingAddress.otherPhoneNumber}
              onChange={(e) =>
                dispach(
                  addCheckoutField({
                    differentBillingAddress: {
                      ...checkoutForm.differentBillingAddress,
                      otherPhoneNumber: e.target.value,
                    },
                  }),
                )
              }
              placeholder="Enter other phone number"
            />
          </div>
        </div>
      )}

      <TextBox
        name="oderNote"
        label="Order notes (optional)"
        placeholder="Notes about your e.g. special notes for delivery"
      />
    </form>
  );
}
