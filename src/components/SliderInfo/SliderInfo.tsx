import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { gsap } from "gsap";
import { useDataContext } from "../../context/DataContext";
import "swiper/css";
import "swiper/css/pagination";
import "./SliderInfo.scss";

export default function SliderInfo() {
  const { data, currentEvents } = useDataContext();
  const [displayedSelected, setDisplayedSelected] = useState(currentEvents);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setDisplayedSelected(currentEvents);
          gsap.fromTo(
            sliderRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
          );
        },
      });
    }
  }, [currentEvents]);

  const parametr = {
    slidesPerView: 3,
    loop: false,
    spaceBetween: 80,
    modules: [Pagination, Navigation],
    speed: 1000,
    navigation: {
      prevEl: ".slider__button-prev",
      nextEl: ".slider__button-next",
    },
  };

  return (
    <div ref={sliderRef} className="slider">
      <Swiper {...parametr} className="swiper">
        {data &&
          data[displayedSelected].events
            .sort((a, b) => (a.year > b.year ? 1 : -1))
            .map((event) => (
              <SwiperSlide key={event.id} className="swiper__slide">
                <p className="swiper__year">{event.year}</p>
                <p className="swiper__fact">{event.fact}</p>
              </SwiperSlide>
            ))}
      </Swiper>
      <button className="slider__button-prev">
        <svg width="24" height="24" viewBox="0 0 16 16">
          <path d="M9.6 4l-4 4 4 4 .8-.8L7.2 8l3.2-3.2z" fill="#3877EE"></path>
        </svg>
      </button>
      <button className="slider__button-next">
        <svg width="24" height="24" viewBox="0 0 16 16">
          <path d="M6.4 12l4-4-4-4-.8.8L8.8 8l-3.2 3.2z" fill="#3877EE"></path>
        </svg>
      </button>
    </div>
  );
}
