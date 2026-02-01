"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const Banner = () => {
  return (
    <section className="h-dvh w-full">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={1200}
        loop={true}
        className="h-full w-full"
      >
        <SwiperSlide>
          <div
            className="h-dvh w-full bg-center bg-cover flex items-center justify-center"
            style={{
              backgroundImage: "url('/banner1.webp')",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 text-center">
              <h1 className="text-white text-4xl sm:text-6xl font-bold">
                Welcome to Our Store
              </h1>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="h-dvh w-full bg-center bg-cover"
            style={{
              backgroundImage: "url('/banner2.webp')",
            }}
          >
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
