"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type SliderProps = {
  id:number,
  src: string,
  alt: string
}

export default function Slider({
  props,
  className,
  imgClass
}: {
  props: SliderProps[],
  className: string
  imgClass?: string
}) {

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % props.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative overflow-hidden">
      <div className={className}>
        {props.map((slide, index) => (
        <div
          key={slide.id}
          className={`
            absolute inset-0 transition-all duration-700 ease-in-out
            ${index === current ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
          `}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className={`w-auto h-full object-contain self-center ${imgClass}`}
          />
        </div>
        ))}
      </div>
    </div>
  );
}