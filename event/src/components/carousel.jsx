"use client";
import { Carousel } from "@material-tailwind/react";

export function CarouselComponent() {
  return (
    <Carousel>
      <video autoPlay loop>
        <source
          src="https://docs.material-tailwind.com/demo.mp4"
          type="video/mp4"
        />
      </video>
      <video autoPlay loop>
        <source
          src="https://docs.material-tailwind.com/demo.mp4"
          type="video/mp4"
        />
      </video>
      <video autoPlay loop>
        <source
          src="https://docs.material-tailwind.com/demo.mp4"
          type="video/mp4"
        />
      </video>
    </Carousel>
  );
}
