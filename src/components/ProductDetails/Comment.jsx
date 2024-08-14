import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import RatingReact from "react-rating";

function Comments({ setRate, re, setRe, rate, sendReview }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 text-2xl">
        <RatingReact
          onChange={(e) => setRate(e)}
          initialRating={rate}
          emptySymbol={
            <span className="text-slate-600 text-4xl">
              <CiStar />
            </span>
          }
          fullSymbol={
            <span className="text-[#edbb0e] text-4xl">
              <FaStar />
            </span>
          }
        />
      </div>
      <form onSubmit={sendReview} className="w-full">
        <textarea
          onChange={(e) => setRe(e.target.value)}
          value={re}
          required
          className="w-full p-4 block resize-none outline-none border border-slate-300 rounded-md"
          name="description"
          rows="6"
          cols="10"
        ></textarea>
        <button className="text-white rounded-sm shadow-md hover:shadow-blue-500/50 mt-6 px-6 py-2 bg-[#6366f1]">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comments;
