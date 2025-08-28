import React, { useState, useEffect, useRef } from "react";
import { productsAPI } from "../data/api";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);

  // Fetch dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productsAPI.getAll();
        setProducts(res.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((item) =>
    item.nama_produk.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (swiperRef.current) {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
      }

      swiperInstance.current = new Swiper(swiperRef.current, {
        modules: [Pagination, Autoplay],
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: true,
      });
    }
  }, [filteredProducts]);

  const stopSwiper = () => swiperInstance.current?.autoplay?.stop();
  const startSwiper = () => swiperInstance.current?.autoplay?.start();

  const disableScrollOnMobile = () => {
    if (window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    }
  };

  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-base-100" id="product">
      <h2 className="font-[Merriweather] text-4xl font-bold text-center mb-12">
        Product List
      </h2>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="font-[Merriweather] input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Swiper (Mobile) */}
      <div className="md:hidden">
        <div ref={swiperRef} className="swiper">
          <div className="swiper-wrapper">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div key={item.id} className="swiper-slide">
                  <div className="card w-full bg-base-100 shadow-xl">
                    <figure className="px-6 pt-6">
                      <img
                        src={
                          item.gambar.startsWith("http")
                            ? item.gambar
                            : `http://localhost:3000${item.gambar}`
                        }
                        alt={item.nama_produk}
                        className="rounded-xl w-full h-auto"
                      />
                    </figure>
                    <div className="card-body items-center text-center">
                      <h3 className="font-[Merriweather] card-title">
                        {item.nama_produk}
                      </h3>
                      <p className="font-[Merriweather]">Stok: {item.Stok}</p>
                      <div className="card-actions">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            document
                              .getElementById(`modal-mobile-${item.id}`)
                              .showModal();
                            stopSwiper();
                            disableScrollOnMobile();
                          }}
                        >
                          Order
                        </button>
                        <dialog
                          id={`modal-mobile-${item.id}`}
                          className="modal modal-bottom md:modal-middle"
                          onClose={enableScroll}
                        >
                          <div className="modal-box">
                            <form method="dialog">
                              <button
                                className="btn btn-primary btn-circle absolute top-2 right-4"
                                onClick={() => {
                                  enableScroll();
                                  startSwiper();
                                }}
                              >
                                ✕
                              </button>
                            </form>
                            <h3 className="text-lg font-bold">
                              {item.nama_produk}
                            </h3>
                            <p className="py-2">{item.deskripsi}</p>
                            <div className="modal-action m-0 p-0">
                              <a
                                href={`https://wa.me/6285172026787?text=Halo, saya ingin pesan ${item.nama_produk}`}
                                className="btn btn-secondary"
                              >
                                Order Now
                              </a>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-lg font-semibold">
                No products found.
              </p>
            )}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id} className="card w-full bg-base-100 shadow-xl">
              <figure className="px-6 pt-6">
                <img
                  src={
                    item.gambar.startsWith("http")
                      ? item.gambar
                      : `http://localhost:3000${item.gambar}`
                  }
                  alt={item.nama_produk}
                  className="rounded-xl w-full h-auto"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">{item.nama_produk}</h3>
                <p>Stok: {item.Stok}</p>
                <p>Harga: Rp.{item.harga}</p>
                <div className="card-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      document
                        .getElementById(`modal-desktop-${item.id}`)
                        .showModal()
                    }
                  >
                    Order
                  </button>
                  <dialog
                    id={`modal-desktop-${item.id}`}
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-primary btn-circle absolute top-2 right-4">
                          ✕
                        </button>
                      </form>
                      <h3 className="text-lg font-bold">{item.nama_produk}</h3>
                      <p className="py-2">{item.deskripsi}</p>
                      <div className="modal-action m-0 p-0">
                        <a
                          href={`https://wa.me/6285172026787?text=Halo, saya ingin pesan ${item.nama_produk}`}
                          className="btn btn-secondary"
                        >
                          Order Now
                        </a>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-lg font-semibold">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}

export default ProductList;
