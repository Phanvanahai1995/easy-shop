import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaList, FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";

function HeaderSearch() {
  const [categoryShow, setCategoryShow] = useState(false);
  const { categories } = useSelector((store) => store.home);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  const search = () => {
    navigate(`/products/search?category=${category}&&value=${searchValue}`);
  };

  return (
    <div className="w-[85%] lg:w-[90%] mx-auto">
      <div className="flex w-full md-lg:gap-4 md-lg:flex-col">
        {/* Left */}
        <div className="w-3/12 md-lg:w-full">
          <div className="bg-white relative">
            <div className="h-[50px] bg-[#059473] text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer">
              <div
                onClick={() => setCategoryShow((prev) => !prev)}
                className="flex justify-center items-center gap-3"
              >
                <FaList />
                <span>All Category</span>
                <IoIosArrowDown />
              </div>
            </div>
            <div
              className={`${
                !categoryShow ? "h-0" : "h-[400px]"
              }  overflow-hidden transition-all md-lg:relative duration-300 absolute z-[9999] bg-[#6ccbb5] w-full `}
            >
              <ul className="py-2 font-medium">
                {categories?.map((c) => (
                  <li
                    key={c._id}
                    className="flex text-white justify-start items-center gap-2 px-[24px] py-[6px]"
                  >
                    <Link
                      to={`/products?category=${c.name}`}
                      className="text-sm flex gap-2 items-center"
                    >
                      <img
                        src={c.image}
                        alt=""
                        className="w-[40px] h-[40px] rounded-full object-cover"
                      />
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Middle */}
        <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
          <div className="flex flex-wrap w-full justify-between items-center md-lg:gap-6">
            <div className="w-full">
              <div className="flex border h-[50px] items-center relative gap-6">
                <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] sm:hidden">
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-[150px] text-slate-600 font-semibold text-[15px] bg-transparent px-2 h-full outline-none border-none"
                  >
                    <option value="">Select Category</option>
                    {categories?.map((c) => (
                      <option key={c._id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  className="w-full relative outline-none text-slate-500 bg-transparent px-3 h-full"
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="text"
                  placeholder="What do you need"
                />
                <button
                  onClick={search}
                  className="bg-[#059573] right-0 absolute px-8 h-full font-semibold text-white"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0">
          <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
            <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center cursor-pointer">
              <FaPhoneAlt />
            </div>
            <div className="flex justify-end flex-col gap-1">
              <span className="text-sm font-medium text-slate-700">
                +84 967051382
              </span>
              <span className="text-sm">Support 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderSearch;
