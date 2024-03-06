import Link from "next/link";

function FooterComponent() {
  return (
    <main className="p-36 bg-black h-[400px] text-white">
      <section className="grid items-center gap-10">
        <Link href="">About Us</Link>
        <Link href="">Contact</Link>
        <Link href="">More</Link>
      </section>
    </main>
  );
}
export default FooterComponent;
