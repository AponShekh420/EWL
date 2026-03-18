"use client";

import React, { useState, useRef } from 'react';
import { Check, ChevronsUpDown, Plus, ChevronUp, Upload, Link as LinkIcon, Play, Pause, Volume2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icon } from '@iconify/react';
import ReactPlayer from 'react-player'

// --- CUSTOM PLAYER COMPONENT (Matches your Orange/Black Screenshot) ---
const CustomPlayer = ({ url, type }: { url: string; type: 'audio' | 'video' }) => {
  const mediaRef = useRef<HTMLMediaElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (mediaRef.current?.paused) {
      mediaRef.current.play();
      setIsPlaying(true);
    } else {
      mediaRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      const current = (mediaRef.current.currentTime / mediaRef.current.duration) * 100;
      setProgress(current || 0);
    }
  };

  // Convert YouTube link to embed if necessary
  const getDisplayUrl = (link: string) => {
    if (link.includes("youtube.com/watch?v=")) return link.replace("watch?v=", "embed/");
    return link;
  };

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return (
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border-2 border-slate-800">
        <iframe className="w-full h-full" src={getDisplayUrl(url)} allowFullScreen />
      </div>
    );
  }

  return (
    <div className={`w-full ${type === 'video' ? 'bg-black p-2' : 'bg-[#111] p-4'} rounded-xl flex flex-col gap-2 border-2 border-slate-800`}>
      {type === 'video' ? (
        <video ref={mediaRef as any} onTimeUpdate={handleTimeUpdate} className="w-full rounded-lg" src={url} />
      ) : (
        <audio ref={mediaRef as any} onTimeUpdate={handleTimeUpdate} src={url} className="hidden" />
      )}
      
      <div className="flex items-center gap-4">
        <button onClick={togglePlay} className="text-[#FF9F00] hover:scale-110 transition-transform">
          {isPlaying ? <Pause fill="#FF9F00" size={24} /> : <Play fill="#FF9F00" size={24} />}
        </button>

        <div className="flex-1 h-1 bg-slate-700 rounded-full relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-white transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center gap-3 text-[#FF9F00]">
          <Volume2 size={18} />
          <Settings size={18} />
        </div>
      </div>
    </div>
  );
};

// --- MOCK DATA ---
const classes = [
  { value: "halacha-101", label: "Halacha 101" },
  { value: "parsha-insights", label: "Parsha Insights" },
];

const speakers = [
  { value: "avrohom-reich", label: "Avrohom Hillel Reich" },
  { value: "apon-shekh", label: "Apon Shekh" },
  { value: "shipon-reich", label: "Shipon Reich" },
];

export default function AddClassPage() {
  // Select States
  const [openClass, setOpenClass] = useState(false);
  const [classValue, setClassValue] = useState("");
  const [openSpeaker, setOpenSpeaker] = useState(false);
  const [speakerValue, setSpeakerValue] = useState("");

  // Media States
  const [mediaType, setMediaType] = useState<"audio" | "video">("video");
  const [sourceType, setSourceType] = useState<"external" | "internal">("external");
  const [externalLink, setExternalLink] = useState("");
  const [localFileUrl, setLocalFileUrl] = useState<string | null>(null);
  const [classNumber, setClassNumber] = useState("");
  
  // The Dynamic List
  const [addedClasses, setAddedClasses] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (localFileUrl) URL.revokeObjectURL(localFileUrl);
      setLocalFileUrl(URL.createObjectURL(file));
    }
  };

  const handleAddClass = () => {
    const newEntry = {
      id: Date.now(),
      number: classNumber || (addedClasses.length + 1),
      url: sourceType === "external" ? externalLink : localFileUrl,
      type: mediaType
    };
    if (newEntry.url) {
      setAddedClasses([...addedClasses, newEntry]);
      // Reset form part
      setExternalLink("");
      setLocalFileUrl(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12 bg-white min-h-screen font-sans text-slate-900">
      
      {/* SECTION 1: Header Inputs */}
      <div className="space-y-6">

        <RadioGroup defaultValue="free" className="flex gap-8 py-2">
          {['Free', 'Class', 'Course'].map((item) => (
            <div key={item} className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value={item.toLowerCase()} id={item} className="border-slate-300 text-teal focus:ring-teal" />
              <Label htmlFor={item} className="text-slate-700 cursor-pointer">For {item}</Label>
            </div>
          ))}
        </RadioGroup>

        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Type Heading</Label>
          <Input 
            type="text" 
            placeholder="Enter heading..." 
            className="border-slate-200 focus-visible:ring-teal rounded-lg h-11 transition-all focus-visible:ring-2" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 flex flex-col">
            <Label className="text-slate-600 font-medium">Select Class</Label>
            <Popover open={openClass} onOpenChange={setOpenClass}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full justify-between border-slate-200 h-11 hover:border-teal rounded-lg">
                  {classValue ? classes.find((c) => c.value === classValue)?.label : "Select or search class..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search class..." className="h-9" />
                  <CommandEmpty>No class found.</CommandEmpty>
                  <CommandGroup>
                    {classes.map((c) => (
                      <CommandItem key={c.value} value={c.value} onSelect={(val) => { setClassValue(val); setOpenClass(false); }}>
                        <Check className={cn("mr-2 h-4 w-4", classValue === c.value ? "opacity-100 text-teal" : "opacity-0")} />
                        {c.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2 flex flex-col">
            <Label className="text-slate-600 font-medium">Select Speaker or Type Name</Label>
            <Popover open={openSpeaker} onOpenChange={setOpenSpeaker}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full justify-between border-slate-200 h-11 hover:border-teal rounded-lg">
                  {speakerValue ? speakers.find((s) => s.value === speakerValue)?.label : "Search or add speaker..."}
                  <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Type speaker name..." className="h-9" />
                  <CommandEmpty>No speaker found.</CommandEmpty>
                  <CommandGroup>
                    {speakers.map((s) => (
                      <CommandItem key={s.value} value={s.value} onSelect={(val) => { setSpeakerValue(val); setOpenSpeaker(false); }}>
                        <Check className={cn("mr-2 h-4 w-4", speakerValue === s.value ? "opacity-100 text-teal" : "opacity-0")} />
                        {s.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* SECTION 2: Dynamic Class List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Class List:</h2>
        {
          addedClasses.length === 0 ? (
            <p className="text-slate-500">No classes added yet. Use the form below to add your first class!</p>
          ) : (
            <div className="bg-teal rounded-2xl p-6 space-y-6">
              <h4 className='text-center bg-[#270034] px-4 py-2 w-fit mx-auto rounded-md text-white'>Apon shekh</h4>
              {addedClasses.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-white">Class {item.number}</span>
                    <div className='flex gap-4 items-center'>
                      <span className='text-green-500 hover:text-green-800 font-semibold flex items-center gap-1 cursor-pointer transition-all duration-200'><Icon icon="material-symbols:edit-outline" width="20" height="20"/> Edit</span>
                      <span className='text-red-800 hover:text-red-950 font-semibold flex items-center gap-1 cursor-pointer transition-all duration-200'><Icon icon="material-symbols:delete" width="20" height="20"/> Delete</span>
                    </div>
                  </div>
                  {/* <CustomPlayer url={item.url} type={item.type} /> */}
                  {item.type === "audio" ? (
                     <div className='bg-black p-2'>
                      <ReactPlayer src={item.url} controls width="100%" height="50px"/>
                     </div>
                  ) : (
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                    <ReactPlayer 
                      src={item.url} 
                      controls 
                      width="100%" 
                      height="100%" 
                    />
                  </div>
                  )}
                </div>
              ))}
            </div>
          )
        }
      </div>

      {/* SECTION 3: Add Class Form (Your Red-Bordered Layout) */}
      <div className="space-y-6 pt-4">
        <h2 className="text-2xl font-bold tracking-tight">Add Class:</h2>
        
        <RadioGroup defaultValue="video" onValueChange={(v) => setMediaType(v as any)} className="flex gap-8">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="audio" id="audio_main" className="text-teal" />
            <Label htmlFor="audio_main" className="font-medium">Audio</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="video_main" className="text-teal" />
            <Label htmlFor="video_main" className="font-medium">Video</Label>
          </div>
        </RadioGroup>

        <Card className="border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-8 space-y-8 bg-white">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-slate-600 font-bold uppercase text-xs">Class number*</Label>
                <Input 
                  type="number" 
                  value={classNumber}
                  onChange={(e) => setClassNumber(e.target.value)}
                  className="border-slate-200 focus-visible:ring-teal rounded-lg h-11" 
                />
              </div>

              <div className="space-y-3">
                <Label className="text-slate-600 font-bold uppercase text-xs">Source Type</Label>
                <RadioGroup defaultValue="external" onValueChange={(v) => setSourceType(v as any)} className="flex gap-8 pt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="external" id="external" className="text-teal" />
                    <Label htmlFor="external">Link (YouTube/Web)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="internal" id="internal" className="text-teal" />
                    <Label htmlFor="internal">Local File</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              {sourceType === "external" ? (
                <div className="relative">
                  <Input 
                    placeholder="Paste YouTube or Video link here..." 
                    className="border-slate-200 focus-visible:ring-teal rounded-lg h-12 pl-10"
                    onChange={(e) => setExternalLink(e.target.value)}
                    value={externalLink}
                  />
                  <LinkIcon className="absolute left-3 top-3.5 text-slate-400" size={18} />
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative bg-slate-50/30">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                  <Upload className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm text-slate-500">Click or drag {mediaType} file to upload</p>
                  {localFileUrl && <p className="text-xs text-teal mt-2 font-bold">File ready!</p>}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleAddClass}
                className="bg-[#FFF9C4] hover:bg-[#FFF176] text-slate-900 border-2 border-slate-900 px-8 py-6 rounded-xl font-bold transition-all flex items-center gap-2"
              >
                Add <ChevronUp />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}