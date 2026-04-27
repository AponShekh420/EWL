/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { addCheckoutField } from "@/redux/features/checkout/checkoutFormSlice";
import { RootState } from "@/redux/store";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputBox from "../common/InputBox";
import TextBox from "../common/TextBox";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { toast } from "react-hot-toast";
import { BASE_URL } from "@/utils/envVariable";
import { CartType } from "@/types/Cart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, Command } from "@/components/ui/command";
import { cn } from "@/lib/utils";
type SelectBoxFiled = {
  label: string;
  value: string;
};


let shippingTimeOut: NodeJS.Timeout;
export default function CheckoutForm({cart}: {cart: CartType}) {
  const checkoutForm = useSelector((state: RootState) => state.checkout);
  const dispatch = useDispatch();
  const [countries] = useState(
    Country.getAllCountries().map((item) => ({
      label: item.name,
      value: item.isoCode,
    })),
  );
  const [states, setStates] = useState<SelectBoxFiled[]>([]);
  const [statesDifferent, setStatesDifferent] = useState<SelectBoxFiled[]>([]);
  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [openDifferentState, setOpenDifferentState] = useState(false);
  const [openDifferentCountry, setOpenDifferentCountry] = useState(false);

  // Update states whenever the country changes
  useEffect(() => {
    if (checkoutForm.country) {
      const countryStates = State.getStatesOfCountry(checkoutForm.country.value);
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
        checkoutForm.differentBillingAddress.country.value,
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

  
  const handleShippingAndTax = async (cartData: CartType) => {
    console.log("cart", cartData);
    const bilingAddress = {
      name: checkoutForm.firstName || "Anonymous",
      country: checkoutForm.country.value,
      line1: checkoutForm.streetAddress,
      city: checkoutForm.city,
      state: checkoutForm.state.value,
      postal_code: checkoutForm.zipCode,
    }
    const differentShippingAddress = checkoutForm.isDifferentBillingAddress ? {
      name: checkoutForm.differentBillingAddress.firstName || "Anonymous",
      country: checkoutForm.differentBillingAddress.country.value,
      line1: checkoutForm.differentBillingAddress.streetAddress,
      city: checkoutForm.differentBillingAddress.city,
      state: checkoutForm.differentBillingAddress.state.value,
      postal_code: checkoutForm.differentBillingAddress.zipCode,
    } : undefined;

    const products = cartData.items.map(item => ({
      _id: item.product._id,
      quantity: item.quantity,
    }))
    const requestBody = {
      products : products,
      shippingAddress: checkoutForm.isDifferentBillingAddress ? differentShippingAddress : bilingAddress
    }


    try {
      const res = await fetch(
        BASE_URL + "/api/ecommerce/cart/tax-shipping",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
      }
      if (data.success) {
        dispatch(
        addCheckoutField({
          shippingAndTaxDetails: data
        })
      );
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (
      (checkoutForm.country.value &&
      checkoutForm.streetAddress &&
      checkoutForm.city &&
      checkoutForm.state.value &&
      checkoutForm.zipCode) || (checkoutForm.differentBillingAddress.country.value &&
        checkoutForm.differentBillingAddress.streetAddress &&
        checkoutForm.differentBillingAddress.city &&
        checkoutForm.differentBillingAddress.state.value &&
        checkoutForm.differentBillingAddress.zipCode)
    ) {
      clearTimeout(shippingTimeOut);

      shippingTimeOut = setTimeout(() => {
        handleShippingAndTax(cart);
      }, 2000);
    }
  }, [
    checkoutForm.country,
    checkoutForm.streetAddress,
    checkoutForm.city,
    checkoutForm.state,
    checkoutForm.zipCode,
    checkoutForm.differentBillingAddress.country,
    checkoutForm.differentBillingAddress.streetAddress,
    checkoutForm.differentBillingAddress.city,
    checkoutForm.differentBillingAddress.state,
    checkoutForm.differentBillingAddress.zipCode,
    cart
  ]);

  useEffect(() => {
    console.log("checkout countries", checkoutForm.country);
    console.log("checkout states", checkoutForm.state);
    console.log("checkout different billing states", checkoutForm.differentBillingAddress.state);
    console.log("checkout different billing countries", checkoutForm.differentBillingAddress.country);
  }, [checkoutForm.country.value, checkoutForm.differentBillingAddress.country.value, checkoutForm.state.value, checkoutForm.differentBillingAddress.state.value]);

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
              dispatch(addCheckoutField({ firstName: e.target.value }))
            }
            placeholder="Enter first name"
          />
          <InputBox
            name="lastName"
            label="Last name"
            value={checkoutForm.lastName}
            onChange={(e) =>
              dispatch(addCheckoutField({ lastName: e.target.value }))
            }
            placeholder="Enter last name"
          />
        </div>
        <InputBox
          name="email"
          label="Email"
          value={checkoutForm.email}
          onChange={(e) => dispatch(addCheckoutField({ email: e.target.value }))}
          placeholder="Enter email address"
        />
        <div className="grid grid-cols-2 gap-4">
          <InputBox
            name="spouseName"
            label="Spouse name"
            placeholder="Enter Spouse name"
            value={checkoutForm.spouseName}
            onChange={(e) =>
              dispatch(addCheckoutField({ spouseName: e.target.value }))
            }
          />
          <InputBox
            name="hearAboutUs"
            label="How did you hear about us"
            placeholder="Enter your answer"
            value={checkoutForm.howDidYouHearAboutUs}
            onChange={(e) =>
              dispatch(
                addCheckoutField({ howDidYouHearAboutUs: e.target.value }),
              )
            }
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <Label className="text-slate-600 font-medium">Country/Region</Label>
          <Popover open={openCountry} onOpenChange={setOpenCountry}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between border-slate-200 h-11 hover:border-teal rounded-lg"
              >
                { checkoutForm.country.label || "Select or search country..." }
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="!w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Choose country"
                  className="h-9"
                />
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup className="max-h-60 overflow-y-auto">
                  {countries.map((country) => (
                    <CommandItem
                      key={country.value}
                      value={country.label}
                      onSelect={() => {
                        dispatch(addCheckoutField({ country: {
                          value: country.value,
                          label: country.label
                        } }));
                        setOpenCountry(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          checkoutForm.country.value === country.value
                            ? "opacity-100 text-teal"
                            : "opacity-0",
                        )}
                      />
                      {country?.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {/* {errors?.classId && (
            <p className="text-xs pl-1.5 text-red-500">
              {errors?.classId?.msg}
            </p>
          )} */}
        </div>


        <InputBox
          name="streetAddress"
          label="Street address"
          placeholder="Enter your street address"
          value={checkoutForm.streetAddress}
          onChange={(e) =>dispatch(addCheckoutField({ streetAddress: e.target.value }))}
        />

        <InputBox
          name=""
          label=""
          placeholder="Appartment, suite, unit, etc (optional)"
          value={checkoutForm.apartment}
          onChange={(e) =>
            dispatch(addCheckoutField({ apartment: e.target.value }))
          }
        />
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="space-y-4 flex flex-col">
            <Label className="font-semibold">State</Label>
            <Popover open={openState} onOpenChange={setOpenState}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between border-slate-200 h-11 hover:border-teal rounded-lg"
                >
                  { checkoutForm.state?.label || "Select or search state..." }
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="!w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Choose state"
                    className="h-9"
                  />
                  <CommandEmpty>No state found.</CommandEmpty>
                  <CommandGroup className="max-h-60 overflow-y-auto">
                    {states.map((state) => (
                      <CommandItem
                        key={state.value}
                        value={state.label}
                        onSelect={() => {
                          dispatch(addCheckoutField({ state: {
                            value: state.value,
                            label: state.label
                          }}));
                          setOpenState(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            checkoutForm.state.value === state.value
                              ? "opacity-100 text-teal"
                              : "opacity-0",
                          )}
                        />
                        {state?.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {/* {errors?.classId && (
              <p className="text-xs pl-1.5 text-red-500">
                {errors?.classId?.msg}
              </p>
            )} */}
          </div>
          <InputBox
            name="city"
            label="Town/City"
            placeholder="Enter city"
            value={checkoutForm.city}
            onChange={(e) => dispatch(addCheckoutField({ city: e.target.value }))}
          />
          <InputBox
            name="zip"
            label="ZIP Code"
            placeholder="Enter ZIP code"
            value={checkoutForm.zipCode}
            onChange={(e) => dispatch(addCheckoutField({ zipCode: e.target.value }))}
          />
        </div>

        



        <div className="grid grid-cols-2 gap-4">
          <InputBox
            name="phone"
            label="Phone number"
            placeholder="Enter phone number"
            value={checkoutForm.phoneNumber}
            onChange={(e) =>
              dispatch(addCheckoutField({ phoneNumber: e.target.value }))
            }
          />
          <InputBox
            name="otherPhone"
            label="Other Phone number (optional)"
            placeholder="Enter other phone number"
            value={checkoutForm.otherPhoneNumber}
            onChange={(e) =>
              dispatch(addCheckoutField({ otherPhoneNumber: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="flex items-center py-10">
        <Checkbox
          checked={checkoutForm.isDifferentBillingAddress}
          onCheckedChange={(val) =>
            dispatch(
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
                dispatch(
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
                dispatch(
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
                dispatch(
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
                dispatch(
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


          {/* different country */}
          <div className="space-y-2 flex flex-col">
            <Label className="text-slate-600 font-medium">Country/Region</Label>
            <Popover open={openDifferentCountry} onOpenChange={setOpenDifferentCountry}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between border-slate-200 h-11 hover:border-teal rounded-lg"
                >
                  { checkoutForm.differentBillingAddress.country.label || "Select or search country..." }
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="!w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Choose country"
                    className="h-9"
                  />
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup className="max-h-60 overflow-y-auto">
                    {countries.map((country) => (
                      <CommandItem
                        key={country.value}
                        value={country.label}
                        onSelect={() => {
                          dispatch(
                            addCheckoutField({
                              differentBillingAddress: {
                                ...checkoutForm.differentBillingAddress,
                                country: {
                                  value: country.value,
                                  label: country.label
                                },
                              },
                            }
                          ));
                          setOpenDifferentCountry(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            checkoutForm.differentBillingAddress.country.value === country.value
                              ? "opacity-100 text-teal"
                              : "opacity-0",
                          )}
                        />
                        {country?.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {/* {errors?.classId && (
              <p className="text-xs pl-1.5 text-red-500">
                {errors?.classId?.msg}
              </p>
            )} */}
          </div>

          <InputBox
            name="differentBillingAddress.streetAddress"
            label="Street address"
            value={checkoutForm.differentBillingAddress.streetAddress}
            onChange={(e) =>
              dispatch(
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
              dispatch(
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
            <div className="space-y-4 flex flex-col">
              <Label className="font-semibold">State</Label>
              <Popover open={openDifferentState} onOpenChange={setOpenDifferentState}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between border-slate-200 h-11 hover:border-teal rounded-lg"
                  >
                    { checkoutForm.differentBillingAddress.state.label || "Select or search state..." }
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="!w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Choose state"
                      className="h-9"
                    />
                    <CommandEmpty>No state found.</CommandEmpty>
                    <CommandGroup className="max-h-60 overflow-y-auto">
                      {statesDifferent.map((state) => (
                        <CommandItem
                          key={state.value}
                          value={state.label}
                          onSelect={() => {
                            dispatch(
                              addCheckoutField({
                                differentBillingAddress: {
                                  ...checkoutForm.differentBillingAddress,
                                  state: {
                                    label: state.label,
                                    value: state.value
                                  },
                                },
                              }),
                            );
                            setOpenDifferentState(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              checkoutForm.differentBillingAddress.state.value === state.value
                                ? "opacity-100 text-teal"
                                : "opacity-0",
                            )}
                          />
                          {state?.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* {errors?.classId && (
                <p className="text-xs pl-1.5 text-red-500">
                  {errors?.classId?.msg}
                </p>
              )} */}
            </div>

            <InputBox
              name="differentBillingAddress.city"
              label="Town/City"
              value={checkoutForm.differentBillingAddress.city}
              onChange={(e) =>
                dispatch(
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
                dispatch(
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
                dispatch(
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
                dispatch(
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
