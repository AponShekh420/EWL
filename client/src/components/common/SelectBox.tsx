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
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: { label: string; value: string }[];
  error?: string;
}

export default function SelectBox({
  className,
  name,
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  options,
  error,
}: SelectBoxProps) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="capitalize  block mb-4">
        {label}
      </Label>
      <Select
        onValueChange={onChange}
        defaultValue={defaultValue}
        value={value}
      >
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
      {error && <span className="text-red-500 text-xs mt-2 ml-1">{error}</span>}
    </div>
  );
}
