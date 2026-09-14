'use client';

import { BASE_URL } from '@/utils/envVariable';
import { useEffect, useState } from 'react';

interface CounterData {
  couples: number;
  courses: number;
  speakers: number;
  lectures: number;
}

const DEFAULT_STATS: CounterData = {
  couples: 6000,
  courses: 15,
  speakers: 45,
  lectures: 90,
};

const Counter = () => {
  const [stats, setStats] = useState<CounterData>(DEFAULT_STATS);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(BASE_URL + '/api/home/counter-stats');
        const json = await res.json();
        if (json.success && json.data) {
          setStats({
            couples: json.data.couples ?? DEFAULT_STATS.couples,
            courses: json.data.courses ?? DEFAULT_STATS.courses,
            speakers: json.data.speakers ?? DEFAULT_STATS.speakers,
            lectures: json.data.lectures ?? DEFAULT_STATS.lectures,
          });
        }
      } catch (error) {
        console.error('Failed to fetch stats, displaying defaults:', error);
      }
    };

    fetchStats();
  }, []);

  const items = [
    {
      value: stats.couples.toLocaleString(),
      title: 'Couples',
      description: 'Who really want to know!',
    },
    {
      value: stats.courses.toLocaleString(),
      title: 'Courses',
      description: 'Comprehensive In-depth information',
    },
    {
      value: stats.speakers.toLocaleString(),
      title: 'Speakers',
      description: 'Professionals in the field',
    },
    {
      value: stats.lectures.toLocaleString(),
      title: 'Lectures',
      description: 'Answers to questions you’re embarrassed to ask.',
    },
  ];

  return (
    <div className="mt-20">
      <div className="container">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-3 gap-y-15">

          {/* grid 1 */}
          {items.map((item, index) => (
            <div key={index} className="flex items-center flex-col">
              <p className="text-teal font-bold text-5xl">{item.value}</p>
              <p className="font-semibold text-teal text-lg mt-2 text-center">{item.title}</p>
              <p className="text-md text-[#333333] text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Counter;