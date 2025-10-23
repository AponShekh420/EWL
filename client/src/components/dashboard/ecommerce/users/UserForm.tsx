"use client";
import InputBox from "@/components/common/InputBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function UserForm() {
  return (
    <div className="mt-14">
      <form className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-4 xl:gap-8 2xl:gap-16">
        <div>
          <h5 className="font-bold text-lg">Product information</h5>
          <p className=" text-gray-700 mt-2">
            Add your product description and necessary information from here
          </p>
        </div>
        <div className="order-2 lg:order-1">
          <div>
            <div className="grid sm:grid-cols-2 gap-8">
              <InputBox
                label="Full Name"
                placeholder="Full name"
                name="full-name"
              />
              <InputBox label="Email" placeholder="Email" name="email" />
              <InputBox
                label="Password"
                placeholder="Password"
                name="password"
              />
              <InputBox
                label="Confirm password"
                placeholder="c-password"
                name="c-password"
              />
            </div>
            <div className="mt-8">
              <Label className="mb-4">Upload your photo (optional)</Label>{" "}
              <Input
                name="attachment"
                type="file"
                onChange={(e) => console.log(e)}
              />
            </div>
          </div>

          <Button className="ml-auto w-fit block my-8" variant="blue">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
