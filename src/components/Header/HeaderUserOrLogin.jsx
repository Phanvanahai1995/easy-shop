import { FaLock, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function HeaderUserOrLogin() {
  const { userInfo } = useSelector((store) => store.auth);

  return userInfo ? (
    <Link
      className="flex justify-center items-center gap-2 text-sm text-black"
      to="/dashboard"
    >
      <span>
        <FaUser />
      </span>
      <span>{userInfo?.name}</span>
    </Link>
  ) : (
    <Link
      className="flex justify-center items-center gap-2 text-sm text-black"
      to="/login"
    >
      <span>
        <FaLock />
      </span>
      <span>Login</span>
    </Link>
  );
}

export default HeaderUserOrLogin;
