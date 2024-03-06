"use client";

export function VideoComponent() {
  return (
    <>
      <div className="w-full h-[750px]" id="video">
        <video className="object-cover w-full h-full" muted autoPlay>
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
}
