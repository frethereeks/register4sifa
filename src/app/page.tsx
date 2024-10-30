import { ASSETS_URL } from "@/assets/images";
import { RegisterForm } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screeen relative">
      <section className="relative py-20 lg:py-40 px-4">
        <Image src={ASSETS_URL["woman_on_roof"]} alt={"woman_on_roof"} className="object-cover object-center" fill />
        <div className="absolute bg-dark/70 left-0 top-0 w-full h-full z-2"></div>
        <div className="relative container mx-auto">
          <div className="flex flex-col gap-4 w-full max-w-screen-md mx-auto">
            <h2 style={{ lineHeight: 1.5 }} className="text-white text-3xl md:text-4xl lg:text-4xl text-center font-bold lg:font-extrabold font-exo leading-loose uppercase">C-STEMP INNOVATIVE LEARNING, EMPLOYABILITY AND PLACEMENT (I-LEAP) PROJECT</h2>
            <p className="bg-tertiary text-white text-base md:text-lg w-max py-2 px-4 rounded-md mx-auto">Empowering youths with skills and life-long learning</p>
          </div>
        </div>
      </section>
      <section className="py-10 lg:py-20 px-4 bg-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-4 lg:gap-10">
          <aside className="relative">
            <Image src={ASSETS_URL["man_and_woman_molding"]} alt={"man_and_woman_molding"} className="object-cover object-top -scale-x-100" fill />
          </aside>
          <aside className="flex flex-col justify-center py-4 lg:py-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-10 lg:gap-10">
              <div className="relative">
                <h4 className="text-primary text-xl lg:text-2xl font-exo font-semibold py-2">Requirements</h4>
                <div className="flex flex-col gap-1 lg:gap-2">
                  {
                    ["Ages 18 - 35", "Interest to learn and upskill", "Basic literacy", "Minimum of 3years experience in trade of interest"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 bg-tertiary rounded-sm flex-shrink-0"></div>
                        <p className="text-base lg:text-lg text-sitetext">{item}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="relative">
                <h4 className="text-primary text-xl lg:text-2xl font-exo font-semibold py-2">Available Trades</h4>
                <div className="flex flex-col gap-1 lg:gap-2">
                  {
                    ["Plumbing Installation", "Electrical Installation", "Tiling", "Painting", "Carpentry", "Masonry"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 bg-tertiary rounded-sm flex-shrink-0"></div>
                        <p className="text-base lg:text-lg text-sitetext">{item}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section className="py-10 lg:py-20 px-4">
        <div className="container mx-auto grid lg:grid-cols-2 gap-4 lg:gap-10">
          <aside className="flex-1 flex flex-col justify-center py-4 lg:py-10">
            <h4 className="text-dark text-xl lg:text-2xl font-semibold py-2 w-max border-b-4 border-tertiary/70">Register Here</h4>
            <RegisterForm />
          </aside>
          <aside className="relative flex-1">
            <Image src={ASSETS_URL["man_and_woman_molding"]} alt={"man_and_woman_molding"} className="object-cover object-top" fill />
          </aside>
        </div>
      </section>
      <section className="py-10 lg:py-20 px-4 bg-white">
        <h3 className="text-4xl text-center text-primary font-bold  font-exo">OUR PARTNERS</h3>
      </section>
    </main>
  );
}
