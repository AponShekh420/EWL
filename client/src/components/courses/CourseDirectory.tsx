// app/page.tsx

import CourseCard from "./CourseCard";

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

export default function CourseDirectory() {
  return (
    <main className="max-w-6xl mx-auto p-8 min-h-screen">
      
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-gray-600 text-sm">
          Showing <span className="text-teal font-bold">1-9</span> Of <span className="text-teal font-bold">62</span> Results
        </h2>
        
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search Courses..." 
            className="w-full bg-gray-100 border-none rounded px-4 py-2 text-sm focus:ring-2 focus:ring-teal outline-none"
          />
          <button className="absolute right-3 top-2.5 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* The 3x3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </main>
  );
}