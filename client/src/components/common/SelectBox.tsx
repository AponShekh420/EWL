import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectBoxProps {
  name: string;
  label: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: { label: string; value: string }[];
}

export default function SelectBox({
  className,
  name,
  label,
  placeholder,
  value,
  onChange,
  options,
}: SelectBoxProps) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="capitalize mb-4 block">
        {label}
      </Label>
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger id={name} className="w-full py-5">
          <SelectValue placeholder={placeholder || "Select option"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
