"use client"
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { debounce } from "@/utils/debounce";
import { Icon } from "@iconify/react";
import { getClassByQuery } from "@/actions/class";
import ClassCard from "../common/ClassCard";
import { ClassType } from "@/types/Class";


export default function ClassDirectory() {
  const [tab, setTab] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [classes, setClasses] = useState<ClassType[]>([]);

  const getClassesByFilter = async () => {
    try {
      setLoading(true);
      const query = `category=${tab}&search=${search}&status=${"publish"}`;
      const { data } = await getClassByQuery(query);
      setClasses(data);
      console.log("Fetched classes:", data);  
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
    // Fetch classes based on the filter
  }

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 500),
    [tab] // Recreate the debounced function when the tab changes
  );

  useEffect(() => {
    // Fetch classes based on the selected tab (category)
     getClassesByFilter();
  }, [tab, search]);

  return (
    <main className="p-8 min-h-screen">
      
      {/* tabs */}
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <div className="w-full mb-4 flex justify-center">
        <TabsList variant="line">
          <TabsTrigger value="">All</TabsTrigger>
          <TabsTrigger value="men">Men</TabsTrigger>
          <TabsTrigger value="women">Women</TabsTrigger>
          <TabsTrigger value="couples">Couples</TabsTrigger>
        </TabsList>
      </div>
    </Tabs>

      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-gray-600 text-sm">
          Showing <span className="text-teal font-bold">{classes.length}</span> Of <span className="text-teal font-bold">{classes.length}</span> Results
        </h2>
        
        <div className="relative w-full md:w-80">
          <input 
            type="search" 
            placeholder="Search by class title..."
            onChange={(e) => debouncedSearch(e.target.value)}
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
      {loading ? (
        <div className="flex items-center justify-center w-full mt-36">
          <Icon icon="eos-icons:bubble-loading" width="50" height="50" className="text-teal"/>
        </div>
        ) : (
        classes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {classes.map(classItem => (
              <ClassCard key={classItem._id} title={classItem?.title || ""} slug={classItem?.slug || ""} thumbnail={classItem?.thumbnail || ""} speaker={classItem?.speaker || ""}/>
            ))}
          </div>) : (
            <div className="flex flex-col items-center justify-center w-full mt-36 gap-4">
              <Icon icon="mdi:folder-search-outline" width="50" height="50" className="text-gray-400"/>
              <p className="text-gray-500">No classes found.</p>
            </div>
          )
        )
      }
    </main>
  );
}