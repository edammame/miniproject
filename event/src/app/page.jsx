import { CarouselComponent } from "@/components/carousel";
import { NavbarComponent } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <CarouselComponent />
      <main className="flex justify-center m-auto">
        hello
        <article>hi</article>
      </main>
    </>
  );
}
