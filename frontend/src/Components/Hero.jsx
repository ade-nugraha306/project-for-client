import React from "react";
import bg from "../assets/img/background.jpg";
import ProductList from "./ProductList";

function Hero() {
  return (
    <>
      <section
        className="items-center hero min-h-screen flex absoulte left-0 p-0 md:px-28"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="flex flex-col items-center">
              <div className="flex flex-row gap-2">
                <h1 className="font-[Merriweather] text-5xl md:text-7xl font-bold text-white">Fresh</h1>
                <h1 className="font-[Merriweather] text-5xl md:text-7xl font-bold text-white">Healthy</h1>
              </div>
              <h1 className="font-[Merriweather] text-5xl md:text-7xl font-bold text-white">Vegetables</h1>
            </div>
            <p className="font-[Merriweather] py-6 px-2 text-md md:px-0 text-white">
              Shop fresh, hygienic veggies and raw foods online!<br/>Easy, affordable, and convenient delivery straight to your door!
            </p>
            <button className="font-[Merriweather] btn btn-primary text-xl">See More</button>
          </div>
        </div>
      </section>

      <section className="py-10 px-2 md:px-8" id="product">
        <h2 className="text-4xl font-bold text-center">
          {/* Our Exclusive Products */}
          <ProductList />
        </h2>

        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div
                  id="data-container"
                  className="flex flex-wrap gap-4 justify-center p-5"
                ></div>
              </div>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </section>
    </>
  );
}

export default Hero;
