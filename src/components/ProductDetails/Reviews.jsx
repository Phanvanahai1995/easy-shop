import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import Rating from "../Rating";
import Pagination from "../../components/Pagination";
import Comments from "./Comment";
import {
  customerSendReview,
  getProductDetails,
  getReviews,
  messageClear,
} from "../../store/reducers/homeSlice";
import toast from "react-hot-toast";

function Reviews({ setRating, product, slug }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(5);

  const dispatch = useDispatch();

  const [rate, setRate] = useState("");
  const [re, setRe] = useState("");

  const { userInfo } = useSelector((store) => store.auth);
  const { successMessage, errorMessage, reviews, total_review, rating_review } =
    useSelector((store) => store.home);

  const sendReview = (e) => {
    e.preventDefault();
    const obj = {
      name: userInfo?.name,
      review: re,
      rating: rate,
      productId: product?._id,
    };

    dispatch(customerSendReview(obj));
  };

  useEffect(() => {
    dispatch(getReviews({ productId: product?._id, pageNumber: currentPage }));
  }, [currentPage, product?._id]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setRate("");
      setRe("");
      dispatch(messageClear());
      dispatch(getProductDetails(slug));
      dispatch(
        getReviews({ productId: product?._id, pageNumber: currentPage })
      );
    }

    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <>
      <div className="flex gap-5 mt-10 flex-wrap">
        <div className="flex flex-col mt-3">
          <div className="flex items-end">
            <span className="text-3xl font-bold">
              {product?.rating.toFixed(1)}
            </span>{" "}
            <span>/5</span>
          </div>
          <div className="flex gap-2">
            <Rating ratings={4.5} />
          </div>
          <span>{total_review} reviews</span>
        </div>
        {/* Rating */}
        <div className="flex flex-col gap-3">
          <div
            onClick={() => setRating(5)}
            className="text-[#edbb0e] flex justify-start items-start gap-2 text-xl cursor-pointer"
          >
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <div
            onClick={() => setRating(4)}
            className="text-[#edbb0e] flex justify-start items-start gap-2 text-xl cursor-pointer"
          >
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <CiStar />
          </div>
          <div
            onClick={() => setRating(3)}
            className="text-[#edbb0e] flex justify-start items-start gap-2 text-xl cursor-pointer"
          >
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <CiStar />
            <CiStar />
          </div>
          <div
            onClick={() => setRating(2)}
            className="text-[#edbb0e] flex justify-start items-start gap-2 text-xl cursor-pointer"
          >
            <AiFillStar />
            <AiFillStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
          <div
            onClick={() => setRating(1)}
            className="text-[#edbb0e] flex justify-start items-start gap-2 text-xl cursor-pointer"
          >
            <AiFillStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
          <div
            onClick={() => setRating(0)}
            className="text-[#edbb0e] flex justify-start items-start gap-2 text-xl cursor-pointer"
          >
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {rating_review.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-end relative border bg-[#e2e8f0] w-[200px] h-[20px]"
            >
              <div
                style={{
                  width: `${Math.floor((r.sum * 100) / total_review)}%`,
                }}
                className={`absolute h-full left-0 top-0 bg-[#edbb0e]`}
              ></div>
              <span className="translate-x-6 text-sm">{r.sum}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-slate-600 text-xl font-bold py-5">
          Product Reviews ({total_review})
        </h3>
        <div className="flex flex-col gap-8 pb-10 pt-4">
          {reviews.map((r, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div className="flex gap-1 text-xl">
                  <Rating ratings={r.rating} />
                </div>
                <span className="text-slate-600">{r?.date}</span>
              </div>
              <span className="text-slate-600 text-md">{r?.name}</span>
              <p>{r?.review}</p>
            </div>
          ))}
          <div className="flex justify-end">
            {total_review > 5 && (
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={total_review}
                parPage={parPage}
                showItem={Math.floor(total_review / 3)}
              />
            )}
          </div>
          <div>
            {userInfo ? (
              <Comments
                sendReview={sendReview}
                setRe={setRe}
                rate={rate}
                setRate={setRate}
                re={re}
              />
            ) : (
              <Link
                to="/login"
                className="py-1 px-5 bg-red-500 text-white rounded-sm"
              >
                Login First
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Reviews;
