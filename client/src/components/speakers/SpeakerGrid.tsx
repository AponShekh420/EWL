import { getImageUrl } from '@/utils/getImageUrl';
import Image from 'next/image';
import Link from 'next/link';

interface Speaker {
  fullName: string;
  _id: string;
  userName: string;
  avatar: string;
  courses: string[];
}


export default function SpeakerGrid({ speakers }: { speakers: Speaker[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {speakers.map((speaker, index) => (
          <Link href={`/speaker/${speaker?.userName}`} 
            key={index} 
            className="group flex flex-col items-center text-center cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative w-40 h-40 mb-4 overflow-hidden rounded-full ring-4 ring-transparent group-hover:ring-blue-500/20 transition-all duration-300 shadow-md">
              <Image
                src={getImageUrl(speaker?.avatar, "profile")} 
                alt={speaker?.fullName || "Speaker Avatar"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Text Content */}
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal transition-colors">
              {speaker.fullName}
            </h3>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {speaker.courses.length} {speaker.courses.length === 1 ? 'Course' : 'Courses'}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}