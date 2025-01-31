import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Product({ title, products }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-slate-600">{title}</div>
        <div className="flex justify-center items-center gap-2 text-slate-600">
          <button
            onClick={() => previous()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => next()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col-reverse gap-8">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {products.map((p, i) => {
          return (
            <div key={i} className="flex flex-col justify-start gap-2">
              {p.map((pl, j) => {
                return (
                  <Link
                    className="flex justify-start items-start"
                    key={pl._id}
                    to={`/product/details/${pl._id}`}
                  >
                    <div className="w-full max-w-[110px] h-full">
                      <img
                        className="w-[110px] h-[110px] object-contain"
                        src={pl.images[0]}
                        alt=""
                      />
                    </div>
                    <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-600">
                      <h3>{pl.name} </h3>
                      <span className="text-lg font-bold">${pl.price}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Product;
