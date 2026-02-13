import { Icon } from "@iconify/react";
import { useState } from "react";

type RatingProps = {
  value?: number; // default rating
  onChange?: (rating: number) => void;
};

export default function RatingController({ value = 0, onChange }: RatingProps) {
  const [rating, setRating] = useState(value);
  const [hover, setHover] = useState(0);

  const handleClick = (rate: number) => {
    setRating(rate);
    onChange?.(rate);
  };

  const getIcon = (index: number) => {
    const current = hover || rating;

    if (current >= index + 1) {
      return "solar:star-bold";
    }
    if (current >= index + 0.5) {
      return "mingcute:star-half-fill";
    }
    return "codicon:star-empty";
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="relative cursor-pointer">
          {/* LEFT HALF */}
          <div
            className="absolute left-0 top-0 h-full w-1/2 z-10"
            onMouseEnter={() => setHover(index + 0.5)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleClick(index + 0.5)}
          />

          {/* RIGHT HALF */}
          <div
            className="absolute right-0 top-0 h-full w-1/2 z-10"
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleClick(index + 1)}
          />

          <Icon
            width="24"
            height="24"
            icon={getIcon(index)}
            className={`transition-colors ${
              (hover || rating) >= index + 0.5
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
