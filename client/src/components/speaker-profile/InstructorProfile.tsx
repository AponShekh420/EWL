import React from 'react';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import { getImageUrl } from '@/utils/getImageUrl';

interface InstructorProfileProps {
  speaker: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    courses: string[];
    userName: string;
  };
}


const ModernSpeakerProfile = ({speaker}: InstructorProfileProps) => {
  return (
    <section className="container px-6 -mt-16 relative z-20">
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start">
        <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-teal rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image src={getImageUrl(speaker?.avatar, "profile")} alt={speaker?.firstName} width={200} height={200} className="w-full h-full object-cover" />
        </div>
        </div>

        <div className="flex-1 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-4xl font-bold text-slate-800">{speaker?.firstName} {speaker?.lastName}</h2>
            <div className="flex gap-3">
            {/* <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-bold border border-amber-100">
                <GraduationCap size={16} /> 24 Students
            </span> */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100">
                <BookOpen size={16} /> {speaker?.courses.length} {speaker?.courses.length === 1 ? 'Course' : 'Courses'}
            </span>
            </div>
        </div>
        
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Co-founder of the <span className="font-semibold text-slate-900">&quot;How To Make Your Spouse Your Soulmate&quot;</span> series. 
            A seasoned Chosson teacher and Shalom Bayis mentor with over 30 years of experience serving the Monsey community.
        </p>
        </div>
    </div>
    </section>
  );
};

export default ModernSpeakerProfile;