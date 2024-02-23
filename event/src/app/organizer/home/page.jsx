import SidebarComponent from "@/components/sidebar";

function HomePage() {
  return (
    <>
      <div className="w-full bg-[#F1F1F1]">
        <div className="flex flex-col justify-center  max-w-[1000px] w-full items-center m-auto  ">
          <div className="w-full text-black font-semibold p-4 text-lg">
            Organizer Event Management Dashboard
          </div>
          <SidebarComponent />
          tampilin data organizer disini?
        </div>
      </div>
    </>
  );
}
export default HomePage;
