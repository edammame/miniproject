"use client";

export function VideoComponent() {
  return (
    <div className="w-full h-[750px]">
      <video className="object-cover w-full h-full" muted autoPlay>
        <source src="/videos/LanaDel.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
