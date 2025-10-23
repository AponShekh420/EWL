import { Icon } from "@iconify/react";
import { Input } from "../ui/input";
interface SearchBoxT extends React.ComponentProps<"input"> {
  width?: string;
  className?: string;
}
export default function SearchBox({
  width = "w-[15rem] lg:w-[18rem]",
  className,
  ...rest
}: SearchBoxT) {
  return (
    <div className={`flex items-center  border rounded-md px-2 ${width}`}>
      <Icon
        icon="iconamoon:search-light"
        className="size-5"
        width="18"
        height="18"
      />

      <Input
        className={`!py-2.5 h-full w-full block border-none focus-visible:ring-0 text-sm placeholder:font-medium placeholder:text-gray-400 ${className}`}
        {...rest}
      />
    </div>
  );
}
