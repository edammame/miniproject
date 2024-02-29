import { VideoComponent } from "@/components/landingpage/video/video";
import { NavbarComponent } from "@/components/landingpage/navbar";
import FooterComponent from "@/components/footer";
import CarouselComponent from "@/components/landingpage/carousel/carousel";
import ButtonComponent from "@/components/button";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <VideoComponent />
      <ButtonComponent />
      <FooterComponent />
    </>
  );
}
