"use client";
import { RootState } from "@/redux/store";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputBox from "../common/InputBox";
import TextBox from "../common/TextBox";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, Command } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { FieldDescription } from "../ui/field";
import { addCourseCheckoutField } from "@/redux/features/checkout/courseCheckoutFormSlice";
type SelectBoxFiled = {
  label: string;
  value: string;
};


export default function CheckoutForm() {
  const checkoutForm = useSelector((state: RootState) => state.courseCheckout);
  const {errors} = useSelector((state: RootState) => state.courseCheckout);
  const dispatch = useDispatch();
  const [countries] = useState(
    Country.getAllCountries().map((item) => ({
      label: item.name,
      value: item.isoCode,
    })),
  );
  const [states, setStates] = useState<SelectBoxFiled[]>([]);
  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);

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

  return (
    <form action="" className="my-10  ">
      {/* billing address */}
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <InputBox
              name="FullName"
              label="Full name"
              value={checkoutForm.fullName}
              onChange={(e) =>
                dispatch(addCourseCheckoutField({ fullName: e.target.value }))
              }
              placeholder="Enter full name"
            />
            {errors?.fullName && (
              <FieldDescription className="text-red-600">
                {errors?.fullName?.msg}
              </FieldDescription>
            )}
          </div>
          <div>
            <InputBox
              name="email"
              label="Email"
              value={checkoutForm.email}
              onChange={(e) => dispatch(addCourseCheckoutField({ email: e.target.value }))}
              placeholder="Enter email address"
            />
            {errors?.email && (
              <FieldDescription className="text-red-600">
                {errors?.email?.msg}
              </FieldDescription>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <InputBox
              name="spouseName"
              label="Spouse name"
              placeholder="Enter Spouse name"
              value={checkoutForm.spouseName}
              onChange={(e) =>
                dispatch(addCourseCheckoutField({ spouseName: e.target.value }))
              }
            />
            {errors?.spouseName && (
              <FieldDescription className="text-red-600">
                {errors?.spouseName?.msg}
              </FieldDescription>
            )}
          </div>
          <div>
            <InputBox
              name="hearAboutUs"
              label="How did you hear about us"
              placeholder="Enter your answer"
              value={checkoutForm.howDidYouHearAboutUs}
              onChange={(e) =>
                dispatch(
                  addCourseCheckoutField({ howDidYouHearAboutUs: e.target.value }),
                )
              }
            />
            {errors?.howDidYouHearAboutUs && (
              <FieldDescription className="text-red-600">
                {errors?.howDidYouHearAboutUs?.msg}
              </FieldDescription>
            )}
          </div>
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
                        dispatch(addCourseCheckoutField({ country: {
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
          {errors?.country && (
            <FieldDescription className="text-red-600">
              {errors?.country?.msg}
            </FieldDescription>
          )}
        </div>


        <div>
          <InputBox
            name="streetAddress"
            label="Street address"
            placeholder="Enter your street address"
            value={checkoutForm.streetAddress}
            onChange={(e) =>dispatch(addCourseCheckoutField({ streetAddress: e.target.value }))}
          />
          {errors?.streetAddress && (
            <FieldDescription className="text-red-600">
              {errors?.streetAddress?.msg}
            </FieldDescription>
          )}
        </div>

        <div>
          <InputBox
            name=""
            label=""
            placeholder="Appartment, suite, unit, etc (optional)"
            value={checkoutForm.apartment}
            onChange={(e) =>
              dispatch(addCourseCheckoutField({ apartment: e.target.value }))
            }
          />
          {errors?.apartment && (
            <FieldDescription className="text-red-600">
              {errors?.apartment?.msg}
            </FieldDescription>
          )}
        </div>
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
                          dispatch(addCourseCheckoutField({ state: {
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
            {errors?.state && (
              <FieldDescription className="text-red-600">
                {errors?.state?.msg}
              </FieldDescription>
            )}
          </div>
          <div>
            <InputBox
              name="city"
              label="Town/City"
              placeholder="Enter city"
              value={checkoutForm.city}
              onChange={(e) => dispatch(addCourseCheckoutField({ city: e.target.value }))}
            />
            {errors?.city && (
              <FieldDescription className="text-red-600">
                {errors?.city?.msg}
              </FieldDescription>
            )}
          </div>
          <div>
            <InputBox
              name="zip"
              label="ZIP Code"
              placeholder="Enter ZIP code"
              value={checkoutForm.zipCode}
              onChange={(e) => dispatch(addCourseCheckoutField({ zipCode: e.target.value }))}
            />
            {errors?.zip && (
              <FieldDescription className="text-red-600">
                {errors?.zip?.msg}
              </FieldDescription>
            )}
          </div>
        </div>

        



        <div className="grid grid-cols-2 gap-4">
          <div>
            <InputBox
              name="phone"
              label="Phone number"
              placeholder="Enter phone number"
              value={checkoutForm.phoneNumber}
              onChange={(e) =>
                dispatch(addCourseCheckoutField({ phoneNumber: e.target.value }))
              }
            />
            {errors?.phoneNumber && (
              <FieldDescription className="text-red-600">
                {errors?.phoneNumber?.msg}
              </FieldDescription>
            )}
          </div>
          <InputBox
            name="otherPhone"
            label="Other Phone number (optional)"
            placeholder="Enter other phone number"
            value={checkoutForm.otherPhoneNumber}
            onChange={(e) =>
              dispatch(addCourseCheckoutField({ otherPhoneNumber: e.target.value }))
            }
          />
          {errors?.otherPhoneNumber && (
            <FieldDescription className="text-red-600">
              {errors?.otherPhoneNumber?.msg}
            </FieldDescription>
          )}
        </div>
      </div>

      

      <TextBox
        name="oderNote"
        label="Order notes (optional)"
        placeholder="Notes about your e.g. special notes for delivery"
        onChange={(e)=> dispatch(addCourseCheckoutField({orderNotes: e.target.value}))}
      />
    </form>
  );
}
