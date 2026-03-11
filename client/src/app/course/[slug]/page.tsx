/* eslint-disable @typescript-eslint/no-unused-expressions */
import { getCourseBySlug } from '@/actions/course';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getImageUrl } from '@/utils/getImageUrl';
import Image from 'next/image';
import Link from 'next/link';




const CoursePage = async ({params}: {params: {slug: string}}) => {
  const availableTabs:string[] = [];
  const {slug} = await params;
  const {data: course} = await getCourseBySlug(slug);
  const { 
  speaker,
  date,
  lectures,
  time,
  aboutTab,
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
  } = course;

  overviewTab != "<p><br></p>" && availableTabs.push("Overview");
  courseTopicsTab != "<p><br></p>" && availableTabs.push("Course Topics");
  speakerProfileTab != "<p><br></p>" && availableTabs.push("Speaker Profile");
  aboutTab != "<p><br></p>" && availableTabs.push("About");
  FAQsTab != "<p><br></p>" && availableTabs.push("FAQs");
  testimonialsTab != "<p><br></p>" && availableTabs.push("Testimonial");
  moreInfoTab != "<p><br></p>" && availableTabs.push("More Info");

  const installmentPricePerMonth = installmentMonths > 0 ? (price / installmentMonths).toFixed(2) : null;
  const modulePricePerMonth = module > 0 ? (price / module).toFixed(2) : null;

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
            <p className="text-lg italic text-gray-600 mt-2">
              {headline}
            </p>
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
            <Tabs defaultValue="testimonial" className="w-full">
              {/* 1. Use -space-x-6 or -space-x-8 to ensure overlap 
                2. Use items-end to align them to the bottom content border
              */}
              <TabsList className="flex flex-wrap h-auto w-full justify-start items-end bg-transparent p-0 sm:-space-x-6 gap-y-2 overflow-visible">
                {availableTabs?.map((tab, index) => (
                  <TabsTrigger
                    key={tab + index}
                    value={tab.toLowerCase()}
                    className="
                      relative h-11 px-8 text-[12px] md:text-[13px] font-bold uppercase tracking-tight
                      /* Use a slightly less aggressive clip-path for better wrapping look */
                      [clip-path:polygon(10%_0%,_90%_0%,_100%_100%,_0%_100%)]
                      transition-all duration-200 min-w-[120px] md:min-w-[140px]
                      
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
              <div className="relative z-40 -mt-[1px] bg-white border-t-2 border-t-[#0266a1] shadow-lg rounded-b-xl p-8">
                <TabsContent value="about">
                  <div
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: aboutTab }}
                  />
                </TabsContent>
                <TabsContent value="overview">
                  <div
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: overviewTab }}
                  />
                </TabsContent>
                <TabsContent value="course topics">
                  <div
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: courseTopicsTab }}
                  />
                </TabsContent>
                <TabsContent value="speaker profile">
                  <div
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: speakerProfileTab }}
                  />
                </TabsContent>
                <TabsContent value="faqs">
                  <div
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: FAQsTab }}
                  />
                </TabsContent>
                <TabsContent value="testimonial">
                  <div
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: testimonialsTab}}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* --- RIGHT SIDEBAR (Sticky) --- */}
        <aside className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            
            {/* Purchase Card */}
            {/* We add 'relative' and 'overflow-hidden' to clip the rotated tape */}
            <div className="group relative overflow-hidden bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-2xl text-white shadow-xl shadow-emerald-200">
              
              {/* 1. The Rotated Tape Label */}
              {(installmentPricePerMonth || modulePricePerMonth) && (
                <span className="absolute top-4 -left-9 bg-yellow-400 text-emerald-900 text-[9px] text-center font-black uppercase py-1 w-32 -rotate-45 shadow-sm border-b border-yellow-500">
                  {installmentPricePerMonth ? "Installment" : "Module Plan"}
                </span>
              )}

              <Link href={offline ? externalLink : `/course/checkout?slug=${slug}`} className='!h-full p-6 block'>
                <div 
                  className="w-full flex items-center justify-between"
                >
                  {/* 2. Action Text (Added a tiny bit of left padding to clear the tape) */}
                  <div className='flex flex-col'>
                    <span className={`text-xl font-bold tracking-tight ${(modulePricePerMonth || installmentPricePerMonth) ? 'pl-5' : 'pl-2'}`}>GET COURSE</span>
                    {(installmentPricePerMonth || modulePricePerMonth)  && (
                      <span className="text-[10px] opacity-70 uppercase tracking-wider mt-1 pl-5">
                        Limited Time Offer
                      </span>
                    )}
                  </div>
                  
                  {/* 3. Dynamic Price Section */}
                  <div className="flex flex-col items-end border-l border-emerald-400 pl-4 transition-transform group-hover:scale-105">
                    <span className="text-2xl font-light leading-none">
                      {(installmentPricePerMonth || modulePricePerMonth) ? `$${installmentPricePerMonth || modulePricePerMonth}` : `$${price}`}
                    </span>
                    {(installmentPricePerMonth || modulePricePerMonth) && (
                      <span className="text-[10px] opacity-80 mt-1 uppercase tracking-tighter">
                        Per {installmentPricePerMonth ? "Month" : "Module"} / {installmentMonths ? `${installmentMonths} mo.` : `${module} mod.`}
                      </span>)}
                  </div>
                </div>
              </Link>
            </div>

                
            <Link href={`/preview/${slug}`} className='mb-8 block'>
              <button className="w-full bg-teal hover:bg-teal-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg/50 shadow-teal hover:shadow-teal-600">
                Preview
              </button>
            </Link>

            {/* Course Details List */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              {time && (
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">🕒</span>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900 block">Time</span>
                    {time}
                  </p>
                </div>
              )}
              {date && (
                <div className="flex items-start gap-3 border-t pt-4">
                  <span className="text-blue-500 mt-1">📅</span>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900 block">Date</span>
                    {date}
                  </p>
                </div>
              )}
              {lectures && (
                <div className="flex items-start gap-3 border-t pt-4">
                  <span className="text-blue-500 mt-1">👥</span>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900 block">Lectures</span>
                    {lectures}
                  </p>
                </div>
              )}
              {duration && (
                <div className="flex items-start gap-3 border-t pt-4">
                  <span className="text-blue-500 mt-1">⏳</span>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900 block">Duration</span>
                    {duration}
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default CoursePage;