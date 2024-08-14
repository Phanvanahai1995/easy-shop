import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Shipping/Input";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { createCustomer, messageClear } from "../store/reducers/authSlice";
import { toast } from "react-hot-toast";
import { FadeLoader } from "react-spinners";

function Register() {
  const { loader, successMessage, errorMessage, userInfo } = useSelector(
    (store) => store.auth
  );

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCustomer(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        email: "",
        password: "",
      });
    }

    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="bg-slate-200 mt-4">
      <div className="w-full justify-between items-center p-10 sm:px-0">
        <div className="grid grid-cols-2 md-lg:grid-cols-1 w-[60%] sm:w-full mx-auto bg-white rounded-md">
          <div className="px-8 py-8 sm:px-4">
            <h2 className="text-center w-full text-xl text-slate-600 font-bold">
              Register
            </h2>
            <form
              onSubmit={handleSubmit}
              className="text-slate-600 flex flex-col gap-3"
            >
              <Input
                value={state.name}
                type="text"
                name="name"
                label="Name"
                title="Name"
                onChange={handleChange}
              />
              <Input
                value={state.email}
                type="email"
                name="email"
                label="Email"
                title="Email"
                onChange={handleChange}
              />
              <Input
                value={state.password}
                type="password"
                name="password"
                label="Password"
                title="Password"
                onChange={handleChange}
              />
              <button
                disabled={loader}
                className="flex mt-2 justify-center items-center py-2 shadow-md hover:shadow-green-500/40 bg-[#059473] text-white rounded-md"
              >
                {loader ? <FadeLoader size={2} color="#fff" /> : "Register"}
              </button>
              <div className="flex items-center justify-between gap-2">
                <span className="h-[1px] w-full block bg-slate-200"></span>
                <span>or</span>
                <span className="h-[1px] w-full block bg-slate-200"></span>
              </div>
              <button className="flex transition-all duration-300 gap-2 mt-2 justify-center items-center py-2 shadow-md hover:shadow-indigo-500/40 bg-[#6366f1] text-white rounded-md">
                <FaFacebookF /> Login with Facebook
              </button>
              <button className="flex transition-all duration-300 gap-2 mt-2 justify-center items-center py-2 shadow-md hover:shadow-orange-500/40 bg-[#f97316] text-white rounded-md">
                <FaGoogle /> Login with Google
              </button>
            </form>
            <p className="flex justify-center items-center gap-2 mt-6">
              You have no account ?
              <Link className="text-indigo-500" to="/login">
                login
              </Link>
            </p>
          </div>
          <div className="px-8 py-8 md-lg:hidden">
            <img
              className="w-full h-full object-cover "
              src="/images/login.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
