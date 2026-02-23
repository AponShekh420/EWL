import CourseCard from "../common/CourseCard";
import { ArrowUpRight } from "lucide-react";

const courses = [
  { id: 1, title: "Starting SEO as your Home Based Business", instructor: "Edward Norton", price: "30", image: "/images/courses/course.jpg", avatar: "/images/user.png" },
  { id: 2, title: "Grow Personal Financial Security Thinking & Principles", instructor: "Emilie Bryant", price: "49", image: "/images/courses/course.jpg", avatar: "/images/user.png" },
  { id: 3, title: "Grow Personal Financial Security Thinking & Principles", instructor: "Emilie Bryant", price: "49", image: "/images/courses/course.jpg", avatar: "/images/user.png" },
  { id: 4, title: "Grow Personal Financial Security Thinking & Principles", instructor: "Emilie Bryant", price: "49", image: "/images/courses/course.jpg", avatar: "/images/user.png" },
  { id: 5, title: "Grow Personal Financial Security Thinking & Principles", instructor: "Emilie Bryant", price: "49", image: "/images/courses/course.jpg", avatar: "/images/user.png" },
  { id: 6, title: "Grow Personal Financial Security Thinking & Principles", instructor: "Emilie Bryant", price: "49", image: "/images/courses/course.jpg", avatar: "/images/user.png" },
  { id: 7, title: "Grow Personal Financial Security Thinking & Principles", instructor: "Emilie Bryant", price: "49", image: "/images/courses/course.jpg", avatar: "/images/user.png" },
  { id: 8, title: "Grow Personal Financial Security Thinking & Principles", instructor: "Emilie Bryant", price: "49", image: "/images/courses/course.jpg", avatar: "/images/user.png" },
  { id: 9, title: "Grow Personal Financial Security Thinking & Principles", instructor: "Emilie Bryant", price: "49", image: "/images/courses/course.jpg", avatar: "/images/user.png" },
  // ... duplicate for other 7 items
];

const CoursesGrid = () => {
    return (
      <section className="container px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-3xl font-bold text-slate-800 underline decoration-amber-400 decoration-4 underline-offset-8">Featured Courses</h3>
          <button className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 transition-all">
            View All Courses <ArrowUpRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.map(course => (
            <CourseCard key={course.id} {...course} />
        ))}
        </div>
      </section>
    );
}

export default CoursesGrid;