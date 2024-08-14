import { useState } from "react";
import { useLocation } from "react-router-dom";
import Stripe from "../components/Stripe/Stripe";

function Payment() {
  const {
    state: { price, items, orderId },
  } = useLocation();

  const [paymentMethod, setPaymentMethod] = useState("stripe");

  return (
    <section className="bg-[#eee]">
      <div className="w-[85%] lg:w-[90%] mx-auto py-16 mt-4">
        <div className="flex flex-wrap md:flex-col-reverse">
          <div className="w-7/12 md:w-full">
            <div className="pr-2 md:pr-0">
              <div className="flex flex-wrap">
                <div
                  onClick={() => setPaymentMethod("stripe")}
                  className={`w-[20%] md-lg:w-[40%] sm:w-[40%] flex flex-col items-center justify-center border-r cursor-pointer py-8 px-12 ${
                    paymentMethod === "stripe" ? "bg-white" : "bg-slate-100"
                  }`}
                >
                  <div className="flex w-full h-full flex-col gap-[3px] justify-center items-center">
                    <img
                      className="w-full h-full object-cover"
                      src="images/payment/stripe.png"
                      alt=""
                    />
                  </div>
                  <span className="text-slate-600">Stripe</span>
                </div>
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-[20%] md-lg:w-[40%] sm:w-[40%]  flex flex-col items-center justify-center border-r cursor-pointer py-8 px-12 ${
                    paymentMethod === "cod" ? "bg-white" : "bg-slate-100"
                  }`}
                >
                  <div className="flex w-full h-full flex-col gap-[3px] justify-center items-center">
                    <img
                      className="w-full h-full object-cover"
                      src="images/payment/cod.jpg"
                      alt=""
                    />
                  </div>
                  <span className="text-slate-600">COD</span>
                </div>
              </div>
              <div>
                <div>
                  {paymentMethod === "stripe" && (
                    <div>
                      <Stripe />
                    </div>
                  )}
                  {paymentMethod === "cod" && (
                    <div className="w-full px-4 py-8">
                      <button className="px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg bg-[#059473] text-white">
                        Pay Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-5/12 md:w-full">
            <div className="pl-2 md:pl-0 md:mb-0">
              <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3">
                <h2 className="font-bold text-lg">Order Summary</h2>
                <div className="flex justify-between items-center">
                  <span>{items} Item and Shipping Fee Included</span>
                  <span>${price.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Amount</span>
                  <span className="text-lg text-green-600">
                    ${price.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Payment;
