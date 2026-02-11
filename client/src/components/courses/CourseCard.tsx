// components/CourseCard.tsx
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
interface CourseProps {
  title: string;
  instructor: string;
  price: string;
  image: string;
  avatar: string;
}

export default function CourseCard({ title, instructor, image, avatar }: CourseProps) {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-100 group transition-all hover:shadow-md">
      {/* Course Image & Badge */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Link href={"/course/348574783"}>
          <Image 
            src={image} 
            alt={title} 
            fill // Fill the aspect-ratio container
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <Link href={"/preview/348574783"} className="absolute top-3 left-3 hover:bg-teal border-2 border-teal text-teal hover:text-white text-xs font-bold px-2 py-1 rounded cursor-pointer transition-colors">
          Preview
        </Link>
      </div>

      {/* Content */}
      <div className="p-5 relative">
        {/* Instructor Info */}
        <Link className="flex items-center gap-2 mb-3" href={"/spearker/348574783"}>
          <Image src={avatar} alt={instructor} className="w-8 h-8 rounded-full object-cover" width={100} height={100} />
          <span className="text-gray-600 hover:text-teal transition-colors text-sm font-medium">{instructor}</span>
        </Link>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 leading-tight mb-3 min-h-[3.5rem]">
          <Link href={"/course/348574783"} className="hover:text-teal transition-colors">
            {title}
          </Link>
        </h3>

        {/* Description Placeholder */}
        <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2">
          <Link href={"/course/348574783"}>Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...</Link>
        </p>

        {/* Action Button (Circle) */}
        <Link href={"/course/348574783"} className="absolute -top-6 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
          <Icon icon="maki:arrow" width="15" height="15" />
        </Link>
      </div>
    </div>
  );
}