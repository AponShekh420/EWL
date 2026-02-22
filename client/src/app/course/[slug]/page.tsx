"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

const CoursePage = () => {

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* --- HEADER SECTION --- */}
      <header className="bg-white pt-12 pb-8 px-6 border-b border-gray-100">
        <div className="container mx-auto flex items-center gap-6">
          <div className="relative min-w-24 min-h-24 rounded-full overflow-hidden border-2 border-blue-100">
            <Image src="/images/user.png" alt="Chaya Reich" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Chaya Reich - <span className="text-blue-700">Soulmates Physical Intimacy Course</span>
            </h1>
            <p className="text-lg italic text-gray-600 mt-2">
              A transformative 6-part journey into understanding, embracing, and elevating physical intimacy.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* --- LEFT CONTENT COLUMN --- */}
        <div className="lg:col-span-2">
          {/* Navigation Tabs */}
          <div className="w-full max-w-5xl mx-auto p-4">
            <Tabs defaultValue="testimonial" className="w-full">
              {/* 1. Use -space-x-6 or -space-x-8 to ensure overlap 
                2. Use items-end to align them to the bottom content border
              */}
              <TabsList className="flex h-auto w-full justify-start items-end bg-transparent p-0 -space-x-6 overflow-visible">
                
                {["About", "Speaker Profile", "Pricing", "Curriculum", "Testimonial", "Overview"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase()}
                    className="
                      relative h-11 px-10 text-[13px] font-bold uppercase tracking-tight
                      [clip-path:polygon(12%_0%,_88%_0%,_100%_100%,_0%_100%)]
                      transition-all duration-200 min-w-[140px]
                      
                      bg-[#cbd5e1] text-[#64748b] border-none
                      
                      data-[state=active]:bg-white 
                      data-[state=active]:text-[#0266a1]
                      data-[state=active]:z-30 /* Higher Z-index to hide neighbors' edges */
                      data-[state=active]:shadow-[0_-4px_10px_rgba(0,0,0,0.05)]
                      
                      /* Blue Top Bar - Specific to Active */
                      data-[state=active]:after:content-['']
                      data-[state=active]:after:absolute
                      data-[state=active]:after:top-0
                      data-[state=active]:after:left-[12%]
                      data-[state=active]:after:right-[12%]
                      data-[state=active]:after:h-[4px]
                      data-[state=active]:after:bg-[#0266a1]

                      hover:bg-[#e2e8f0]
                      data-[state=active]:hover:bg-white
                    "
                  >
                    <span className="relative z-10">{tab}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Content Container */}
              <div className="relative z-40 -mt-[1px] bg-white border-t-2 border-t-[#0266a1] shadow-lg rounded-b-xl p-8">
                <TabsContent value="about">Content here...</TabsContent>
                <TabsContent value="speaker profile">Content here...</TabsContent>
                <TabsContent value="testimonial">Testimonial here...</TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* --- RIGHT SIDEBAR (Sticky) --- */}
        <aside className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            
            {/* Purchase Card */}
            <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-xl shadow-emerald-200">
              <button className="w-full flex items-center justify-between group">
                <span className="text-xl font-bold tracking-tight">GET COURSE</span>
                <span className="text-2xl font-light border-l border-emerald-400 pl-4 group-hover:scale-110 transition-transform">
                  $499.00
                </span>
              </button>
            </div>

            <button className="w-full bg-teal hover:bg-teal-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg/50 shadow-teal hover:shadow-teal-600">
              Preview
            </button>

            {/* Course Details List */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">🕒</span>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900 block">Time</span>
                  Tuesdays 2:00 pm & repeats 8:30 pm, Sundays 10:30 am EST
                </p>
              </div>
              <div className="flex items-start gap-3 border-t pt-4">
                <span className="text-blue-500 mt-1">📅</span>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900 block">Date</span>
                  Starting November 18th
                </p>
              </div>
              <div className="flex items-start gap-3 border-t pt-4">
                <span className="text-blue-500 mt-1">👥</span>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900 block">Lectures</span>
                  6 classes 3 Q&A
                </p>
              </div>
              <div className="flex items-start gap-3 border-t pt-4">
                <span className="text-blue-500 mt-1">⏳</span>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900 block">Duration</span>
                  6 weeks
                </p>
              </div>
            </div>

          </div>
        </aside>

      </main>
    </div>
  );
};

export default CoursePage;