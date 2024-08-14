import SectionBG from "../components/Shops/SectionBG";
import Carousel from "react-multi-carousel";
import { FaGithub, FaHeart, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import "react-multi-carousel/lib/styles.css";

import { IoIosArrowForward } from "react-icons/io";
import Rating from "../components/Rating";
import { useEffect, useRef, useState } from "react";

import Reviews from "../components/ProductDetails/Reviews";
import Description from "../components/ProductDetails/Description";
import EasyShop from "../components/ProductDetails/EasyShop";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../store/reducers/homeSlice";
import toast from "react-hot-toast";
import {
  addToCart,
  addToWishlist,
  buyNow,
  getCartProducts,
  messageClear,
} from "../store/reducers/cartSlice";

function ProductDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, relatedProducts, modelProducts } = useSelector(
    (store) => store.home
  );

  const { userInfo } = useSelector((store) => store.auth);

  const { successMessage, errorMessage } = useSelector((store) => store.cart);

  const [image, setImage] = useState("");

  const [review, setReview] = useState(false);
  const [rating, setRating] = useState("");

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  const [quantity, setQuantity] = useState(1);

  const inc = () => {
    if (quantity >= product.stock) {
      toast.error("Out of stock");
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const dec = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addCart = (id) => {
    if (userInfo) {
      dispatch(addToCart({ userId: userInfo.id, quantity, productId: id }));
    } else {
      navigate("/login");
    }
  };

  const addToWishlistHandle = () => {
    dispatch(
      addToWishlist({
        userId: userInfo.id,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        discount: product.discount,
        rating: product.rating,
        slug: product.slug,
      })
    );
  };

  const buyNowHandler = () => {
    let price = 0;
    if (product?.discount) {
      price =
        (product.price - (product.price * product.discount) / 100) * quantity;
    } else {
      price = product.price * quantity;
    }

    dispatch(
      buyNow({
        products: [
          {
            products: [
              {
                productInfo: product,
                sellerId: product.sellerId,
                shopName: product.shopName,
              },
            ],
            sellerId: product.sellerId,
            price: product.price,
          },
        ],
        price,
        shipping_free: 20,
        buy_product_item: quantity,
      })
    );

    navigate("/shipping");
  };

  useEffect(() => {
    dispatch(getProductDetails(slug));
    setImage("");
  }, [slug]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(getCartProducts(userInfo.id));
      dispatch(messageClear());
    }

    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  if (product?.name)
    return (
      <div>
        <SectionBG page="Product Details Page" to="Details" />
        <div className="bg-[#f1f5f9] h-[50px] flex items-center">
          <div className="w-[85%] lg:w-[90%] mx-auto flex gap-1 ">
            <span className="flex items-center gap-1">
              Home <IoIosArrowForward />
            </span>
            <span className="flex items-center gap-1">
              {product?.category} <IoIosArrowForward />
            </span>
            <span>{product?.name}</span>
          </div>
        </div>
        <div className="w-[85%] lg:w-[90%] mx-auto bg-white py-4">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
            <div className="flex flex-col gap-2">
              <div className="p-5 border rounded-md">
                <img
                  className="h-[400px] block mx-auto object-contain"
                  src={image ? image : product?.images[0]}
                  alt=""
                />
              </div>
              <div>
                <Carousel
                  autoPlay={true}
                  infinite={true}
                  arrows={true}
                  responsive={responsive}
                  transitionDuration={500}
                >
                  {product?.images.map((c, i) => (
                    <div
                      onClick={() => setImage(c)}
                      className="h-[185px] block cursor-pointer"
                      to="#"
                      key={i}
                    >
                      <div className="w-full h-full relative p-3">
                        <img
                          className="w-full h-full object-contain"
                          src={c}
                          alt=""
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-slate-600">
                {product.name}
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Rating ratings={4.5} />
                </div>
                <span className="text-green-500">(23 reviews)</span>
              </div>
              <div className="flex gap-3">
                <span className="line-through font-bold text-red-500">
                  ${product.price}
                </span>
                <span className="font-bold text-red-500">
                  ${product.price - (product.price * product.discount) / 100}
                </span>
                {product.discount && (
                  <span className="font-bold text-red-500">
                    ({product.discount}%)
                  </span>
                )}
              </div>
              <p>{product.description}</p>
              {product.stock ? (
                <div className="flex gap-3">
                  <div className="bg-[#e2e8f0] flex items-center gap-6 px-5 py-2">
                    <span onClick={dec} className="cursor-pointer">
                      -
                    </span>
                    <span>{quantity}</span>
                    <span onClick={inc} className="cursor-pointer">
                      +
                    </span>
                  </div>
                  <button
                    onClick={() => addCart(product._id)}
                    className="font-bold px-4 shadow-md hover:shadow-green-500/50 bg-[#059473] text-white"
                  >
                    Add To Card
                  </button>
                  <div
                    onClick={addToWishlistHandle}
                    className="bg-[#06b6d4] shadow-md hover:shadow-blue-400/50 flex justify-center items-center text-white w-[40px] h-[40px] cursor-pointer"
                  >
                    <FaHeart />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="h-[1px] bg-slate-200 mt-6"></div>
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex gap-10 items-center">
                  <span className="font-bold text-lg">Availability</span>
                  <span
                    className={`${
                      product.stock ? "text-green-400" : "text-red-400"
                    } text-sm`}
                  >
                    {product.stock
                      ? `In Stock (${product.stock})`
                      : "Out Of Stock"}
                  </span>
                </div>
                <div className="flex gap-14 items-center">
                  <span className="font-bold text-lg">Share on</span>
                  <div className="flex gap-3">
                    <a
                      className="text-xl text-white bg-[#6366f1] flex w-[40px] h-[40px] rounded-full justify-center items-center"
                      href="#"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      className="text-xl text-white bg-[#06b6d4] flex w-[40px] h-[40px] rounded-full justify-center items-center"
                      href="#"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      className="text-xl text-white bg-[#a855f7] flex w-[40px] h-[40px] rounded-full justify-center items-center"
                      href="#"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      className="text-xl text-white bg-[#3b82f6] flex w-[40px] h-[40px] rounded-full justify-center items-center"
                      href="#"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={buyNowHandler}
                    className="bg-[#10b981] shadow-md hover:shadow-green-500/50 text-white px-4 py-2"
                  >
                    Buy Now
                  </button>
                  <Link
                    to={`/dashboard/chat/${product.sellerId}`}
                    className="bg-[#ef4444] shadow-md hover:shadow-red-500/50 text-white px-4 py-2"
                  >
                    Chat Seller
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[85%] lg:w-[90%] mx-auto bg-white py-4">
          <div className="flex flex-wrap md-lg:gap-4">
            <div className="w-9/12 md-lg:w-full pr-3 md-lg:pr-0">
              <div className="flex text-lg">
                <button
                  onClick={() => setReview(false)}
                  className={`${
                    !review ? "bg-[#059473] text-white" : "bg-[#e2e8f0]"
                  } w-full rounded-tl-sm rounded-bl-sm py-1.5`}
                >
                  Reviews
                </button>
                <button
                  onClick={() => setReview(true)}
                  className={`${
                    review ? "bg-[#059473] text-white" : "bg-[#e2e8f0]"
                  } w-full py-1.5 rounded-tr-sm rounded-br-sm`}
                >
                  Description
                </button>
              </div>
              {!review ? (
                <Reviews slug={slug} product={product} setRating={setRating} />
              ) : (
                <Description description={product?.description} />
              )}
            </div>
            <EasyShop product={product} modelProducts={modelProducts} />
          </div>
        </div>
        <section className="w-[85%] lg:w-[90%] mx-auto bg-white">
          <h2 className="text-xl py-8 font-semibold text-slate-600">
            Related Products
          </h2>
          <div>
            <Swiper
              slidesPerView="auto"
              breakpoints={{
                1280: {
                  slidesPerView: 3,
                },
                565: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={25}
              loop={true}
              pagination={{
                clickable: true,
                el: ".custom_bullet",
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {relatedProducts.map((p, i) => (
                <SwiperSlide key={i}>
                  <Link
                    onClick={() => {
                      window.scroll({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    to={`/product/details/${p?.slug}`}
                    className="block"
                  >
                    {p?.discount && (
                      <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 z-10">
                        {p?.discount}%
                      </div>
                    )}
                    <div className="relative h-[270px]">
                      <div className="w-full h-full">
                        <img
                          className="w-full h-full object-contain"
                          src={p?.images[0]}
                          alt=""
                        />
                        <div className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-300"></div>
                      </div>
                    </div>
                    <div className="py-3 text-slate-600 px-2">
                      <h3 className="font-bold">{p?.name}</h3>
                      <div className="flex justify-start items-center gap-3">
                        <span className="text-md font-semibold">
                          ${p?.price}
                        </span>
                        <Rating ratings={4.6} />
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="w-full flex justify-center items-center py-10">
              <div className="custom_bullet justify-center gap-3 !w-auto"></div>
            </div>
          </div>
        </section>
      </div>
    );
}

export default ProductDetail;
