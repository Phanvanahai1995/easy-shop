import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaBorderAll, FaHeart, FaList } from "react-icons/fa";
import { IoIosHome, IoMdLogOut } from "react-icons/io";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../store/reducers/authSlice";

function Dashboard() {
  const [filterShow, setFilerShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-slate-200 mt-5">
      <div className="w-[90%] mx-auto md-lg:block hidden">
        <div>
          <button
            onClick={() => setFilerShow((prev) => !prev)}
            className="text-center py-3 px-3 bg-green-500 text-white"
          >
            <FaList />
          </button>
        </div>
      </div>
      <div className="h-full mx-auto">
        <div className="py-5 flex md-lg:w-[90%] mx-auto relative">
          <div
            className={`rounded-md z-50 md-lg:absolute transition-all duration-300 ${
              filterShow ? "-left-4" : "-left-[360px]"
            } w-[270px] ml-4 bg-white shadow-lg`}
          >
            <ul className="py-2 text-slate-600 px-4">
              <li className="flex justify-start items-center gap-2 py-2">
                <IoIosHome className="text-xl" />
                <Link to="/dashboard" className="block">
                  Dashboard
                </Link>
              </li>
              <li className="flex justify-start items-center gap-2 py-2">
                <FaBorderAll className="text-xl" />
                <Link to="/dashboard/my-orders" className="block">
                  My Orders
                </Link>
              </li>
              <li className="flex justify-start items-center gap-2 py-2">
                <FaHeart className="text-xl" />
                <Link to="/dashboard/wishlist" className="block">
                  WishList
                </Link>
              </li>
              <li className="flex justify-start items-center gap-2 py-2">
                <IoChatboxEllipsesOutline className="text-xl" />
                <Link to="/dashboard/chat" className="block">
                  Chat
                </Link>
              </li>
              <li className="flex justify-start items-center gap-2 py-2">
                <RiLockPasswordLine className="text-xl" />
                <Link to="/dashboard/change-password" className="block">
                  Change Password
                </Link>
              </li>
              <li
                onClick={logoutHandler}
                className="flex justify-start items-center gap-2 py-2 cursor-pointer"
              >
                <IoMdLogOut className="text-xl" />
                <div className="block">Logout</div>
              </li>
            </ul>
          </div>
          <div className="w-[calc(100%-270px)] md-lg:w-full">
            <div className="mx-4 md-lg:mx-0">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
