import FadeInSection from "@/components/common/FadeInSection";
import CourseDirectory from "@/components/courses/CourseDirectory";
export default function Volunteer() {
  return (
    <main>
      <section className="bg-[linear-gradient(rgba(0,120,200,0.4),rgba(0,120,200,0.4)),url('/images/volunteer/backlit-bird-clouds-755385.png')] bg-cover bg-center h-[200px] w-full grid place-items-center">
        <FadeInSection
          initial={{ opacity: 0, y: -50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: -50 }}
          margin="40px 0px -40px 0px"
        >
          <h1 className="text-white font-extrabold text-3xl lg:text-4xl text-center">
            Courses
          </h1>
        </FadeInSection>
      </section>
      <section className="container mt-10 sm:mt-14 md:mt-16">
        <CourseDirectory />
      </section>
    </main>
  );
}


