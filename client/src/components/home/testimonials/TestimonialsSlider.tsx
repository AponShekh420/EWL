"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import '@/styles/swiper.css';

import { Autoplay } from "swiper/modules";
import Card from "./Card";

export default function TestimonialsSlider() {
  return (
    <Swiper
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      freeMode={true}
      spaceBetween={20}
      modules={[Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      className="mySwiper py-10"
    >
      <SwiperSlide className="cursor-pointer">
        <Card text="Thanks for this amazing hotline, i enjoy listening to the shiurim it&apos;s really informative and helpful. I especially loved Sara Rivka Lax-Welcoming space workshop last year. It truly was a gamechanger" userName="Rayzle" star={1}/>
      </SwiperSlide>
      <SwiperSlide className="cursor-pointer">
        <Card text="Thanks for this amazing hotline, i enjoy listening to the shiurim it&apos;s really informative and helpful. I especially loved Sara Rivka Lax-Welcoming space workshop last year. It truly was a gamechanger" userName="Rayzle" star={2}/>
      </SwiperSlide>
      <SwiperSlide className="cursor-pointer">
        <Card text="Thanks for this amazing hotline, i enjoy listening to the shiurim it&apos;s really informative and helpful. I especially loved Sara Rivka Lax-Welcoming space workshop last year. It truly was a gamechanger" userName="Rayzle" star={3}/>
      </SwiperSlide>
      <SwiperSlide className="cursor-pointer">
        <Card text="Thanks for this amazing hotline, i enjoy listening to the shiurim it&apos;s really informative and helpful. I especially loved Sara Rivka Lax-Welcoming space workshop last year. It truly was a gamechanger" userName="Rayzle" star={4}/>
      </SwiperSlide>
    </Swiper>
  );
}
