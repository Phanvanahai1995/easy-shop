import { MdEmail } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import HeaderAction from "./HeaderAction";
import HeaderUserOrLogin from "./HeaderUserOrLogin";
import HeaderSocial from "./HeaderSocial";
import HeaderSearch from "./HeaderSearch";

function Header() {
  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#caddff] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            <ul className="flex justify-start items-center gap-8 font-semibold text-black">
              <li className="cursor-pointer flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <div>
                  <MdEmail />
                </div>
                <span>support@gmail.com</span>
              </li>
              <li className="flex relative justify-center items-center gap-2 text-sm">
                <div>
                  <IoMdPhonePortrait />
                </div>
                <span>+(123) 4567 890</span>
              </li>
            </ul>
            <div>
              <div className="flex justify-center items-center gap-10">
                <HeaderSocial css="flex justify-center items-center gap-4 text-black" />
                <div className="flex justify-center gap-1 relative group cursor-pointer text-slate-800 text-sm after:w-[1px] after:h-[18px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]">
                  <img src="/images/language.png" alt="" />
                  <IoMdArrowDropdown />
                  <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                    <li>English</li>
                    <li>Viet Nam</li>
                  </ul>
                </div>
                <HeaderUserOrLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
      <HeaderAction />
      <HeaderSearch />
    </div>
  );
}

export default Header;
