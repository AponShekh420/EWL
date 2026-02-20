import Image from 'next/image';
import Link from 'next/link';

const speakers = [
  { name: "Chaya jamploskey", courses: 1, image: "/images/speakers/speaker-1.jpg" },
  { name: "Aliza Greenbaum", courses: 2, image: "/images/speakers/speaker-1.jpg" },
  { name: "Aliza Greenbaum", courses: 3, image: "/images/speakers/speaker-1.jpg" },
  { name: "Aliza Greenbaum", courses: 4, image: "/images/speakers/speaker-1.jpg" },
  { name: "Aliza Greenbaum", courses: 5, image: "/images/speakers/speaker-1.jpg" },
  { name: "Aliza Greenbaum", courses: 6, image: "/images/speakers/speaker-1.jpg" },
  { name: "Aliza Greenbaum", courses: 7, image: "/images/speakers/speaker-1.jpg" },
  { name: "Aliza Greenbaum", courses: 8, image: "/images/speakers/speaker-1.jpg" },
  { name: "Aliza Greenbaum", courses: 9, image: "/images/speakers/speaker-1.jpg" },
  { name: "Avrohom Hillel Reich", courses: 1, image: "/images/speakers/speaker-2.jpg" },
  // ... add the rest of your data here
];

export default function SpeakerGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {speakers.map((speaker, index) => (
          <Link href={`/speaker/${speaker.name.toLowerCase().replace(/\s+/g, '-')}`} 
            key={index} 
            className="group flex flex-col items-center text-center cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative w-40 h-40 mb-4 overflow-hidden rounded-full ring-4 ring-transparent group-hover:ring-blue-500/20 transition-all duration-300 shadow-md">
              <Image
                src={speaker.image}
                alt={speaker.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Text Content */}
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal transition-colors">
              {speaker.name}
            </h3>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {speaker.courses} {speaker.courses === 1 ? 'Course' : 'Courses'}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}