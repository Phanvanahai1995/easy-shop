import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function SectionBG({ page, to }) {
  return (
    <section className="bg-[url('/images/banner/shop.png')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
      <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
            <h1 className="text-3xl font-bold sm:text-xl">{page}</h1>
            <div className="flex justify-center items-center gap-2 text-2xl w-full">
              <Link to="/">Home</Link>
              <IoIosArrowForward className="pt-1" />
              <span>{to}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionBG;
