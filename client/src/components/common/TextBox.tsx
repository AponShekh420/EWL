import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

interface TextBoxProps extends React.ComponentProps<"textarea"> {
  name: string;
  label: string;
  className?: string;
}

export default function TextBox({
  className,
  name,
  label,
  ...rest
}: TextBoxProps) {
  return (
    <div>
      <Label htmlFor={name} className="capitalize mb-4">
        {label}
      </Label>

      <Textarea
        id={name}
        name={name}
        className={`py-5 ${className}`}
        {...rest}
      />
    </div>
  );
}
