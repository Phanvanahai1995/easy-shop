import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import MenuList from "./MenuList";
import HeaderUserOrLogin from "./HeaderUserOrLogin";
import HeaderSocial from "./HeaderSocial";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";

function HeaderAction() {
  const [showSidebar, setShowSideBar] = useState(false);
  const navigate = useNavigate();
  const { cart_product_count, wishlist_count } = useSelector(
    (store) => store.cart
  );

  const { userInfo } = useSelector((store) => store.auth);

  const redirect_page = (path) => {
    if (userInfo) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="w-white">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex justify-between items-center">
                <Link to="/">
                  <img src="/images/logo.png" alt="" />
                </Link>
                <div
                  onClick={() => setShowSideBar(true)}
                  className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden"
                >
                  <FaList />
                </div>
              </div>
            </div>
            <div className="md:lg:w-full w-9/12">
              <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
                <MenuList css="flex justify-start items-start gap-8 tex-sm font-bold uppercase md-lg:hidden" />
                <div className="flex md-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center gap-5">
                    <div
                      onClick={() => redirect_page("/dashboard/wishlist")}
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <div className="text-xl text-green-500">
                        <FaHeart />

                        {wishlist_count > 0 && (
                          <span className="w-[20px] h-[20px] text-sm absolute rounded-full text-white bg-red-500 flex justify-center items-center -top-[3px] -right-[5px]">
                            {wishlist_count}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      onClick={() => redirect_page("/card")}
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <div className="text-xl text-green-500">
                        <IoBag />

                        {cart_product_count !== 0 && (
                          <span className="w-[20px] h-[20px] text-sm absolute rounded-full text-white bg-red-500 flex justify-center items-center -top-[3px] -right-[5px]">
                            {cart_product_count}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md-lg:block">
        <div
          onClick={() => setShowSideBar(false)}
          className={`fixed duration-200 transition-all ${
            showSidebar ? "visible" : "invisible"
          } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
        ></div>
        <div
          className={`w-[300px] z-[9999] transition-all duration-200 fixed ${
            !showSidebar ? "-left-[300px]" : "left-0"
          } overflow-y-auto bg-white h-screen py-6 px-8 top-0`}
        >
          <div className="flex justify-start flex-col gap-6">
            <Link to="/">
              <img src="/images/logo.png" alt="" />
            </Link>
            <div className="flex justify-start items-center gap-10">
              <div className="flex justify-center gap-1 relative group cursor-pointer text-slate-800 text-sm after:w-[1px] after:h-[18px] after:bg-[#afafaf] after:-right-[16px] after:absolute">
                <img src="/images/language.png" alt="" />
                <IoMdArrowDropdown />
                <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                  <li>English</li>
                  <li>Viet Nam</li>
                </ul>
              </div>
              <HeaderUserOrLogin />
            </div>
            <MenuList css="flex justify-start items-start gap-8 tex-sm font-bold uppercase md-lg:flex-col md-lg:gap-2" />
            <HeaderSocial css="flex justify-start items-center gap-4 text-black" />
            <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
              <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center cursor-pointer">
                <FaPhoneAlt />
              </div>
              <div className="flex justify-end flex-col gap-1">
                <span className="text-sm font-medium text-slate-700">
                  +84 967051382
                </span>
                <span className="text-xs">Support 24/7</span>
              </div>
            </div>
            <ul className="flex flex-col justify-start items-start gap-3 text-[#1c1c1c]">
              <li className="flex justify-start items-center gap-2 text-sm">
                <div>
                  <MdEmail />
                </div>
                <span>support@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderAction;
