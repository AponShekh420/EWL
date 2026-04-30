/* eslint-disable @typescript-eslint/no-unused-expressions */
import { getClassBySlug } from '@/actions/class';
import AudioList from '@/components/courses/AudioList';
import VideoList from '@/components/courses/VideoList';
import { Icon } from '@iconify/react';
import Link from 'next/link';


const CoursePage = async ({params}: {params: {slug: string}}) => {
  const availableTabs:string[] = [];
  const {slug} = await params;
  const {data: classItem} = await getClassBySlug(slug);
  const { 
  contentOne,
  contentTwo,
  audiosOne,
  audiosTwo,
  videosOne,
  videosTwo,
  } = classItem;

  contentOne != "<p><br></p>" && availableTabs.push("contentOne");
  contentTwo != "<p><br></p>" && availableTabs.push("contentTwo");


  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-10">
      
      <main className="container mx-auto p-8 bg-white rounded-lg flex flex-col gap-8">
        
        {contentOne != "<p><br></p>" && (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contentOne }} />
        )}
        {<AudioList audios={audiosOne} />}
        {<VideoList videos={videosOne} />}
        {contentOne != "<p><br></p>" && (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contentOne }} />
        )}
        {<AudioList audios={audiosTwo} />}
        {<VideoList videos={videosTwo} />}

        <Link href={`/class/checkout/${classItem.slug}`} className='self-end'>
        <button className="bg-teal font-semibold text-white px-4 py-2 rounded hover:bg-black transition flex items-center gap-1">
          Get Class
          <Icon icon="maki:arrow" width="15" height="15" />
        </button>
        </Link>
      </main>
    </div>
  );
};

export default CoursePage;