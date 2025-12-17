
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";


const Register = () => {
  return (
    <div>
      <p className="text-[#333333] mt-4">Ohel Miriam is a sensitive site for frum adults looking to learn more or buy products related to marital intimacy. Due to the nature of our content, we require all users to create a free account in order to view the website in full. We will not pass on your information to a third party.
      Put a button to the form
      </p>

      <div className="w-ful mt-5">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username<span className="text-red-600">*</span></FieldLabel>
              <Input id="username" type="text" placeholder="example123" />
              {/* <FieldDescription>
                Choose a unique username for your account.
              </FieldDescription> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="first-name">First Name<span className="text-red-600">*</span></FieldLabel>
              <Input id="first-name" type="text" placeholder="Enter your first name" />
              {/* <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="last-name">Last Name<span className="text-red-600">*</span></FieldLabel>
              <Input id="last-name" type="text" placeholder="Enter your last name" />
              {/* <FieldDescription>
                Choose a unique username for your account.
              </FieldDescription> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email Address<span className="text-red-600">*</span></FieldLabel>
              <Input id="email" type="email" placeholder="example@gmail.com" />
              {/* <FieldDescription>
                Choose a unique username for your account.
              </FieldDescription> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password<span className="text-red-600">*</span></FieldLabel>
              <Input id="password" type="password" placeholder="••••••••" />
              {/* <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password<span className="text-red-600">*</span></FieldLabel>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
              {/* <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription> */}
            </Field>

            <Field>
              <FieldLabel>Gender<span className="text-red-600">*</span></FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Male</SelectItem>
                    <SelectItem value="design">Female</SelectItem>
                  </SelectContent>
                </Select>
              {/* <FieldDescription>
                Select your department or area of work.
              </FieldDescription> */}
            </Field>
            

            {/* redio */}
            <FieldSet>
              <FieldLabel>Are you an Orthodox Jew?<span className="text-red-600">*</span></FieldLabel>
              <RadioGroup defaultValue="yes">
                <Field orientation="horizontal">
                  <RadioGroupItem value="yes" id="yes" />
                  <FieldLabel htmlFor="yes" className="font-normal">
                    Yes
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="no" id="no" />
                  <FieldLabel htmlFor="no" className="font-normal">
                    No
                  </FieldLabel>
                </Field>
              </RadioGroup>
            </FieldSet>


            <FieldSet>
              <FieldLabel>Are you married or have ever been married?<span className="text-red-600">*</span></FieldLabel>
              <RadioGroup defaultValue="yes">
                <Field orientation="horizontal">
                  <RadioGroupItem value="yes" id="yes" />
                  <FieldLabel htmlFor="yes" className="font-normal">
                    Yes
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="no" id="no" />
                  <FieldLabel htmlFor="no" className="font-normal">
                    No
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="other" id="other" />
                  <FieldLabel htmlFor="other" className="font-normal">
                    Other
                  </FieldLabel>
                </Field>
              </RadioGroup>
            </FieldSet>

            <FieldSet>
              <FieldLabel>Do you keep Shabbos, Kashrus and Taharas Hamishpacha?<span className="text-red-600">*</span></FieldLabel>
              <RadioGroup defaultValue="yes">
                <Field orientation="horizontal">
                  <RadioGroupItem value="yes" id="yes" />
                  <FieldLabel htmlFor="yes" className="font-normal">
                    Yes
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="no" id="no" />
                  <FieldLabel htmlFor="no" className="font-normal">
                    No
                  </FieldLabel>
                </Field>
              </RadioGroup>
            </FieldSet>
            
            <Field>
              <FieldDescription>
                To verify that you are our intended target audience, please answer the following questions
              </FieldDescription>
              <FieldLabel htmlFor="how-long">How long is the preparation (Chafifa) for mikvah on the day of mikvah supposed to take?<span className="text-red-600">*</span></FieldLabel>
              <Input id="how-long" type="text" placeholder="" />
            </Field>

            <Field>
              <FieldLabel htmlFor="feedback">If hot chicken soup spilled in your dairy sink, what would you do?<span className="text-red-600">*</span></FieldLabel>
              <Textarea
                id="feedback"
                placeholder=""
                rows={4}
              />
              {/* <FieldDescription>
                Share your thoughts about our service.
              </FieldDescription> */}
            </Field>
          </FieldGroup>
        </FieldSet>
        <button className="mt-5 w-full py-3 text-white font-medium text-lg rounded-lg 
          bg-gradient-to-r from-teal via-purple-500 to-pink-500 
          bg-[length:200%_200%] transition-all duration-500 hover:bg-right">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;