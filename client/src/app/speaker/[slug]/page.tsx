import CoursesGrid from "@/components/speaker-profile/CoursesGrid";
import InstructorProfile from "@/components/speaker-profile/InstructorProfile";
import Link from "next/link";
export default function Volunteer() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative h-[300px] w-full overflow-hidden bg-[linear-gradient(rgba(0,120,200,0.4),rgba(0,120,200,0.4)),url('/images/volunteer/backlit-bird-clouds-755385.png')] bg-cover bg-center">
        <div className="relative z-10 container mx-auto h-full flex flex-col justify-end pb-24 px-6">
          <h1 className="text-5xl font-serif font-bold text-white mb-2">Speaker Profile</h1>
          <nav className="text-blue-100 flex gap-2 text-sm uppercase tracking-widest">
            <Link href="/">Home</Link> / <Link href={"/speakers"}>Speakers</Link> / <span className="text-white font-bold">Avrohom Hillel Reich</span>
          </nav>
        </div>
      </section>
      <InstructorProfile />
      <CoursesGrid />
    </main>
  );
}


