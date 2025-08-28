import React, { useEffect, useRef, useState } from "react";
import client from "../assets/img/client1.jpg";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";

function Review() {
  const swiperRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewRes, productRes] = await Promise.all([
          axios.get("http://localhost:3000/reviews"),
          axios.get("http://localhost:3000/products"),
        ]);

        const reviewData = Array.isArray(reviewRes.data)
          ? reviewRes.data
          : reviewRes.data.data;

        const productData = Array.isArray(productRes.data)
          ? productRes.data
          : productRes.data.data;

        setReviews(reviewData || []);
        setProducts(productData || []);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (swiperRef.current && !swiperRef.current.swiper) {
      new Swiper(swiperRef.current, {
        modules: [Pagination, Autoplay],
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: { el: ".swiper-pagination", clickable: true },
        autoplay: { delay: 3000, disableOnInteraction: false },
        loop: true,
      });
    }
  }, [reviews]);

  const handleSubmitReview = async () => {
    try {

      await axios.post(
        "http://localhost:3000/reviews",
        {
          review: newReview,
          productId: parseInt(selectedProductId),
        },
        {
          withCredentials: true,
        }
      );

      setNewReview("");
      setSelectedProductId("");
      setModalOpen(false);

      // refresh review
      const updatedReviews = await axios.get("http://localhost:3000/reviews");
      setReviews(
        Array.isArray(updatedReviews.data)
          ? updatedReviews.data
          : updatedReviews.data.data
      );
    } catch (err) {
      console.error("Gagal submit review:", err);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-base-100" id="review">
      <h2 className="font-[Merriweather] text-4xl font-bold text-center mb-8">
        Client Reviews
      </h2>

      <div className="flex justify-center mb-8">
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Tambahkan Review
        </button>
      </div>

      <div className="swiper mySwiper" ref={swiperRef}>
        <div className="swiper-wrapper">
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div className="swiper-slide" key={index}>
                <div className="card bg-base-200 shadow-xl p-6">
                  <div className="card-body items-center text-center">
                    <p className="font-[Merriweather] text-lg mb-4">
                      {review.review}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-16 rounded-full">
                          <img src={client} alt="Client" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-[Merriweather] text-xl font-bold">
                          {`Guest-${
                            review.user_token?.slice(-3).toUpperCase() || "XXX"
                          }`}
                        </h3>
                        <p className="font-[Merriweather] text-sm text-base-content/70">
                          Review untuk:{" "}
                          {review.product?.nama_produk || "Tidak diketahui"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">Belum ada review</p>
          )}
        </div>
        <div className="swiper-pagination"></div>
      </div>

      {/* Modal Tambah Review */}
      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Tulis Review Baru</h3>
            <textarea
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Tulis pendapatmu..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <select
              className="select select-bordered w-full mb-4"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option disabled value="">
                Pilih Produk
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.nama_produk}
                </option>
              ))}
            </select>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleSubmitReview}>
                Submit
              </button>
              <button className="btn" onClick={() => setModalOpen(false)}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Review;
