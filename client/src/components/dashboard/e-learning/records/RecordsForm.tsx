"use client";

import React, { useState } from 'react';
import { Check, ChevronsUpDown, Play, Plus, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

// Mock Data
const classes = [
  { value: "halacha-101", label: "Halacha 101" },
  { value: "parsha-insights", label: "Parsha Insights" },
  { value: "shalom-bayis-series", label: "Shalom Bayis Series" },
];

const speakers = [
  { value: "avrohom-reich", label: "Avrohom Hillel Reich" },
  { value: "aliza-greenbaum", label: "Aliza Greenbaum" },
];

export default function AddClassPage() {
  const [openClass, setOpenClass] = useState(false);
  const [classValue, setClassValue] = useState("");
  
  const [openSpeaker, setOpenSpeaker] = useState(false);
  const [speakerValue, setSpeakerValue] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12 bg-white min-h-screen font-sans text-slate-900">
      
      {/* SECTION 1: Header Inputs */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-slate-600 font-medium">Type Heading</Label>
          <Input 
            type="text" 
            placeholder="Enter heading..." 
            className="border-slate-200 focus-visible:ring-teal rounded-lg h-11 transition-all focus-visible:ring-2" 
          />
        </div>

        <RadioGroup defaultValue="free" className="flex gap-8 py-2">
          {['Free', 'Class', 'Course'].map((item) => (
            <div key={item} className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem 
                value={item.toLowerCase()} 
                id={item} 
                className="border-slate-300 text-teal focus:ring-teal" 
              />
              <Label htmlFor={item} className="text-slate-700 cursor-pointer">For {item}</Label>
            </div>
          ))}
        </RadioGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SEARCHABLE SELECT CLASS */}
          <div className="space-y-2 flex flex-col">
            <Label className="text-slate-600 font-medium">Select Class</Label>
            <Popover open={openClass} onOpenChange={setOpenClass}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openClass}
                  className="w-full justify-between border-slate-200 h-11 font-normal hover:bg-white hover:border-teal rounded-lg transition-all"
                >
                  {classValue
                    ? classes.find((c) => c.value === classValue)?.label
                    : "Select or search class..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search class..." className="h-9" />
                  <CommandEmpty>No class found.</CommandEmpty>
                  <CommandGroup>
                    {classes.map((c) => (
                      <CommandItem
                        key={c.value}
                        value={c.value}
                        onSelect={(currentValue: React.SetStateAction<string>) => {
                          setClassValue(currentValue === classValue ? "" : currentValue);
                          setOpenClass(false);
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", classValue === c.value ? "opacity-100 text-teal" : "opacity-0")} />
                        {c.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* SEARCHABLE SELECT SPEAKER */}
          <div className="space-y-2 flex flex-col">
            <Label className="text-slate-600 font-medium">Select Speaker or Type Name</Label>
            <Popover open={openSpeaker} onOpenChange={setOpenSpeaker}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openSpeaker}
                  className="w-full justify-between border-slate-200 h-11 font-normal hover:bg-white hover:border-teal rounded-lg transition-all"
                >
                  {speakerValue
                    ? speakers.find((s) => s.value === speakerValue)?.label
                    : "Search or add speaker..."}
                  <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Type speaker name..." className="h-9" />
                  <CommandEmpty>No speaker found.</CommandEmpty>
                  <CommandGroup>
                    {speakers.map((s) => (
                      <CommandItem
                        key={s.value}
                        value={s.value}
                        onSelect={(currentValue: React.SetStateAction<string>) => {
                          setSpeakerValue(currentValue === speakerValue ? "" : currentValue);
                          setOpenSpeaker(false);
                        }}
                      >
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

      {/* SECTION 2: Class List (Media Grid) */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Class List:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 5].map((num) => (
            <div key={num} className="p-4 border border-slate-200 hover:border-teal rounded-xl space-y-3 transition-colors bg-slate-50/50">
              <Label className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">Class {num}</Label>
              <Slider 
                defaultValue={[33]} 
                max={100} 
                className="[&_[role=slider]]:bg-teal [&_[role=slider]]:border-teal" 
              />
            </div>
          ))}
          
          {/* Main Player Card */}
          <div className="md:row-span-2 p-6 border border-slate-200 hover:border-teal rounded-2xl flex flex-col items-center justify-center bg-white shadow-sm transition-all group relative min-h-[180px]">
             <Label className="absolute top-4 left-4 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Class 4</Label>
             <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-all cursor-pointer border border-slate-200">
                <Play className="ml-1 fill-current" size={24} />
             </div>
             <Slider 
                defaultValue={[45]} 
                max={100} 
                className="w-full mt-8 [&_[role=slider]]:bg-teal [&_[role=slider]]:border-teal" 
             />
          </div>
        </div>
      </div>

      {/* SECTION 3: Add Class Form */}
      <div className="space-y-6 pt-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Add Class:</h2>
        
        <RadioGroup defaultValue="audio" className="flex gap-8">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="audio" id="audio" className="text-teal border-slate-300" />
            <Label htmlFor="audio" className="font-medium">Audio</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="video" className="text-teal border-slate-300" />
            <Label htmlFor="video" className="font-medium">Video</Label>
          </div>
        </RadioGroup>

        <Card className="border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-8 space-y-6 bg-white">
            <div className="space-y-2">
              <Label className="text-slate-600 font-medium">Class number*</Label>
              <Input className="border-slate-200 focus-visible:ring-teal rounded-lg h-11" />
            </div>

            <div className="py-2">
              <Slider 
                defaultValue={[0]} 
                max={100} 
                className="[&_[role=slider]]:bg-teal [&_[role=slider]]:border-teal" 
              />
            </div>

            <RadioGroup defaultValue="external" className="flex gap-8">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="external" id="external" className="text-teal" />
                <Label htmlFor="external">External</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="internal" id="internal" className="text-teal" />
                <Label htmlFor="internal">Internal</Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label className="text-slate-600 font-medium">Link</Label>
              <Input 
                placeholder="https://..." 
                className="border-slate-200 focus-visible:ring-teal rounded-lg h-11" 
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button className="bg-white hover:bg-teal hover:text-white text-slate-900 border border-slate-900 px-10 py-6 rounded-lg font-bold text-lg transition-all flex items-center gap-2 group">
                Add 
                <ChevronUp className="group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}