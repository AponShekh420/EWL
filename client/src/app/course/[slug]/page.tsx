/* eslint-disable @typescript-eslint/no-unused-expressions */
import { getCourseBySlug } from '@/actions/course';
import CourseSidebar from '@/components/courses/CourseSidebar';
import ModuleTabList from '@/components/courses/ModuleTabList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getImageUrl } from '@/utils/getImageUrl';
import Image from 'next/image';
import Link from 'next/link';




const CoursePage = async ({params}: {params: {slug: string}}) => {
  const availableTabs:string[] = [];
  const {slug} = await params;
  const {data: course, ordered, orderedCourse} = await getCourseBySlug(slug);
  const { 
  speaker,
  date,
  lectures,
  time,
  // aboutTab,
  overviewTab,
  courseTopicsTab,
  speakerProfileTab,
  FAQsTab,
  testimonialsTab,
  moreInfoTab,
  offline,
  externalLink,
  duration,
  title,
  headline,
  bio,
  price,
  installmentMonths,
  module,
  modules
  } = course;

  moreInfoTab && moreInfoTab != "<p><br></p>" && availableTabs.push("About");
  modules.length > 0 && availableTabs.push("Modules");
  courseTopicsTab && courseTopicsTab != "<p><br></p>" && availableTabs.push("Course Topics");
  FAQsTab && FAQsTab != "<p><br></p>" && availableTabs.push("FAQs");
  speakerProfileTab && speakerProfileTab != "<p><br></p>" && availableTabs.push("Speaker Profile");
  testimonialsTab && testimonialsTab != "<p><br></p>" && availableTabs.push("Testimonials");
  overviewTab && overviewTab != "<p><br></p>" && availableTabs.push("Takeaways");
  // aboutTab && aboutTab != "<p><br></p>" && availableTabs.push("About");

  const installmentPricePerMonth = installmentMonths > 0 ? (price / installmentMonths).toFixed(2) : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* --- HEADER SECTION --- */}
      <header className="bg-white pt-12 pb-8 px-6 border-b border-gray-100">
        <div className="container mx-auto flex items-center gap-6">
          <div className="relative min-w-24 min-h-24 rounded-full overflow-hidden border-2 border-blue-100">
            <Image src={getImageUrl(speaker?.avatar, "profile")} alt={speaker?.firstName} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              <Link href={`/speaker/${speaker?.userName}`} className="hover:underline">
                {speaker.firstName} {speaker.lastName}
              </Link> - <span className="text-blue-700">{title}</span>
            </h1>
            <div className="prose prose-lg max-w-none mt-2" dangerouslySetInnerHTML={{ __html: headline }} />
            <p className="text-lg italic text-gray-600 mt-2">
              {bio}
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* --- LEFT CONTENT COLUMN --- */}
        <div className="lg:col-span-2">
          {/* Navigation Tabs */}
          <div className="w-full max-w-5xl mx-auto p-4">
            <Tabs defaultValue={(availableTabs[0])?.toLowerCase()} className="w-full !relative">
              {/* 1. Use -space-x-6 or -space-x-8 to ensure overlap 
                2. Use items-end to align them to the bottom content border
              */}
              <TabsList className="flex flex-wrap w-full justify-start items-end bg-transparent p-0 sm:-space-x-6 gap-y-1 overflow-visible !h-fit">
                {availableTabs?.map((tab, index) => (
                  <TabsTrigger
                    key={tab + index}
                    value={tab.toLowerCase()}
                    className="
                      relative h-11 px-8 text-[12px] md:text-[13px] font-bold uppercase tracking-tight
                      /* Use a slightly less aggressive clip-path for better wrapping look */
                      [clip-path:polygon(10%_0%,_90%_0%,_100%_100%,_0%_100%)]
                      transition-all duration-200 min-w-[130px] sm:min-w-[150px] md:min-w-[145px] max-w-[170px]
                      
                      bg-[#cbd5e1] text-[#64748b] border-none
                      
                      data-[state=active]:bg-white 
                      data-[state=active]:text-[#0266a1]
                      data-[state=active]:z-30
                      data-[state=active]:shadow-[0_-4px_10px_rgba(0,0,0,0.05)]
                      
                      /* Blue Top Bar */
                      data-[state=active]:after:content-['']
                      data-[state=active]:after:absolute
                      data-[state=active]:after:top-0
                      data-[state=active]:after:left-[10%]
                      data-[state=active]:after:right-[10%]
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
              <div className="-mt-[1px] bg-white border-t-2 border-t-[#0266a1] shadow-lg rounded-b-xl p-8 z-30 sticky !top-full !w-full">
                <TabsContent value="about">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: moreInfoTab }}
                  />
                </TabsContent>
                <TabsContent value="modules">
                  <ModuleTabList modules={modules} orderedModules={orderedCourse?.modules} ordered={ordered}/>
                </TabsContent>
                <TabsContent value="takeaways">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: overviewTab }}
                  />
                </TabsContent>
                <TabsContent value="course topics">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: courseTopicsTab }}
                  />
                </TabsContent>
                <TabsContent value="speaker profile">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: speakerProfileTab }}
                  />
                </TabsContent>
                <TabsContent value="faqs">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: FAQsTab }}
                  />
                </TabsContent>
                <TabsContent value="testimonials">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: testimonialsTab}}
                  />
                </TabsContent>
                <TabsContent value="more info">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: moreInfoTab}}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* --- RIGHT SIDEBAR (Sticky) --- */}
        <CourseSidebar
          time={time}
          ordered={ordered}
          slug={slug}
          price={price}
          module={module}
          offline={offline}
          externalLink={externalLink}
          installmentPricePerMonth={installmentPricePerMonth}
          installmentMonths={installmentMonths}
          lectures={lectures}
          date={date}
          duration={duration}
          course={course}
          order={orderedCourse}
        />

      </main>
    </div>
  );
};

export default CoursePage;