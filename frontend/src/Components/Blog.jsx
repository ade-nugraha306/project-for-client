import React from "react";
import blob from "../assets/img/1.jpg"

function Blog() {
  return (
    <>
      <section className="py-20 px-4 md:px-8 bg-base-200" id="blogs">
        <div className="swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className="lg:w-1/2">
                  <img src={blob} alt="Blog" />
                </figure>
                <div className="card-body lg:w-1/2">
                  <h3 className="font-[Merriweather] card-title">Bayam</h3>
                  <p className="font-[Merriweather]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Dolorum, quas nam! Voluptate quia magnam doloremque porro
                    distinctio cumque delectus reiciendis eum dolores numquam
                    commodi labore dignissimos fugiat amet, dolore aspernatur
                    cum eligendi, recusandae quae debitis culpa. Ipsum possimus
                    explicabo dolores similique modi! Ipsum nihil adipisci
                    asperiores ab labore?
                  </p>
                  <div className="card-actions justify-end">
                    <button className="font-[Merriweather] btn btn-primary">Learn More</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </section>
    </>
  );
}

export default Blog;
