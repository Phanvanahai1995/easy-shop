import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#f3f6fa]">
      <div className="w-[85%] flex flex-wrap mx-auto border-b border-slate-300 py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <img
              className="w-[190px] object-cover"
              src="/images/logo.png"
              alt="easy-shop"
            />
            <ul className="flex-col gap-2 text-slate-600">
              <li>Address: 16b Nguyen Thai Hoc, Ha Dong, Ha Noi</li>
              <li>Phone: +84 967-51382</li>
              <li>Email: support@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="w-5/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
            <div>
              <h3 className="font-bold text-lg mb-2">Usefull Links</h3>
              <div className="flex justify-between gap-[80px] lg:gap-[40px] font-semibold">
                <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                  <li>
                    <Link>About us</Link>
                  </li>
                  <li>
                    <Link>About Our Shop</Link>
                  </li>
                  <li>
                    <Link>Delivery Information</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Blogs</Link>
                  </li>
                </ul>
                <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                  <li>
                    <Link>Our Service</Link>
                  </li>
                  <li>
                    <Link>Company Profile</Link>
                  </li>
                  <li>
                    <Link>Delivery Information</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Blogs</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-5">
            <h2 className="font-bold text-lg mb-2">Join Our Shop</h2>
            <span>
              Get Email update about tour latest and shop specials offers
            </span>
            <div className="flex h-[50px] w-full bg-white border relative">
              <input
                type="text"
                className="h-full bg-transparent outline-none px-3"
                placeholder="Enter Your Email"
              />
              <button className="h-full absolute right-0 bg-[#059473] text-white px-4 font-bold text-sm">
                Subscribe
              </button>
            </div>
            <ul className="flex justify-start items-center gap-4">
              <li>
                <a
                  className="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-white hover:text-white transition-all duration-300 hover:bg-[#059473]"
                  href="#"
                >
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-white hover:text-white transition-all duration-300 hover:bg-[#059473]"
                  href="#"
                >
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-white hover:text-white transition-all duration-300 hover:bg-[#059473]"
                  href="#"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-white hover:text-white transition-all duration-300 hover:bg-[#059473]"
                  href="#"
                >
                  <FaGithub />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full text-center py-8">
        Copyright ©2024 All right reserved
      </div>
    </footer>
  );
}

export default Footer;
