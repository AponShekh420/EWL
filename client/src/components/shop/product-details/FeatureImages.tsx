import { ProductType } from "@/types/Product";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function FeatureImages({ product }: { product: ProductType }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <div className="mt-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        slidesPerView={1}
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={false}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        effect="fade"
        speed={1000}
        className="max-w-[330px] xs:max-w-[330px] sm:max-w-[450px] md:max-w-[550px]"
      >
        {product.images.map((item, id) => (
          <SwiperSlide key={id}>
            <Image
              className="h-[350px] md:h-[500px]  w-full object-cover border"
              src={getImageUrl(item, "products")}
              alt="banner"
              width={400}
              height={400}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full mx-auto relative">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={5}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="mt-4 max-w-100 md:max-w-120"
        >
          {product.images.map((item, id) => (
            <SwiperSlide key={id} className="cursor-pointer">
              <Image
                src={getImageUrl(item, "products")}
                width={150}
                height={150}
                alt={product.title}
                className="size-20 sm:size-[100px] object-cover rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <div className="flex gap-x-4 justify-between absolute left-0 top-1/2 -translate-y-1/2 w-full  z-10">
          <button className="custom-prev cursor-pointer border rounded-full hover:bg-green hoverEffect">
            <Icon icon="solar:arrow-left-linear" width="25" height="25" />
          </button>
          <button className="custom-next cursor-pointer border rounded-full hover:bg-green hoverEffect">
            <Icon icon="solar:arrow-right-linear" width="25" height="25" />
          </button>
        </div> */}
      </div>
    </div>
  );
}
