// components/CourseCard.tsx
import { getImageUrl } from "@/utils/getImageUrl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
interface ClassProps {
  title: string;
  speaker: {
    firstName: string;
    avatar: string;
    lastName: string;
    _id?: string;
    userName: string;
  };
  thumbnail: string;
  slug: string;
  privateClass?: boolean,
}

export default function ClassCard({ title, speaker, thumbnail, slug, privateClass }: ClassProps) {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-100 group transition-all hover:shadow-md">
      {/* Course Image & Badge */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Link href={privateClass ? `/class/private/${slug}` : `/class/${slug}`}>
          <Image 
            src={getImageUrl(thumbnail, "classes")}
            alt={title}
            fill // Fill the aspect-ratio container
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-5 relative">
        {/* Instructor Info */}
        <Link className="flex items-center gap-2 mb-3" href={`/speaker/${speaker?.userName}`}>
          <Image src={getImageUrl(speaker?.avatar, "profile")} alt={speaker?.firstName} className="w-8 h-8 rounded-full object-cover" width={100} height={100} />
          <span className="text-gray-600 hover:text-teal transition-colors text-sm font-medium">{speaker?.firstName} {speaker?.lastName}</span>
        </Link>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 leading-tight mb-3">
          <Link href={privateClass ? `/class/private/${slug}` : `/class/${slug}`} className="hover:text-teal transition-colors">
            {title}
          </Link>
        </h3>

        {/* Description Placeholder */}
        <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
          <Link href={privateClass ? `/class/private/${slug}` : `/class/${slug}`}>Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...</Link>
        </p>

        {/* Action Button (Circle) */}
        <Link href={privateClass ? `/class/private/${slug}` : `/class/${slug}`} className="absolute -top-6 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-50 text-teal group-hover:bg-black group-hover:text-white transition-colors">
          <Icon icon="maki:arrow" width="15" height="15" />
        </Link>
      </div>
    </div>
  );
}