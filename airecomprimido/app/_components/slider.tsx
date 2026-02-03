"use client";

import Image from "next/image";
import { useState } from "react";

type SliderProps = {
  src: string,
  alt: string
}

export default function Slider({
  props
}: {
  props: SliderProps[]
}) {

  const [current, setCurrent] = useState(0)

  return (
    <div className="slider-container">
      <div className="slider">
        <div className="slider-section">
          <Image
            src={props[current].src}
            alt={props[current].alt}
            width={150}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}