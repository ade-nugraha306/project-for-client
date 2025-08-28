import React from "react";
import foot from "../assets/img/footer.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"; // Import ikon WhatsApp

function Footer() {
  return (
    <>
      <footer
      className="footer p-10 bg-base-200 text-base-content flex flex-col md:flex-row justify-between"
      id="contact"
    >
        <div>
          <div className="flex items-center gap-2">
            <img src={foot} className="w-14" alt="logo" />
            <span className="font-[Merriweather] font-bold text-xl">SAYOUR</span>
          </div>
          <p className="font-[Merriweather] ">
            Lorem ipsum dolor sit amet consectetur
            <br />
            Adipisicing elit. Dicta accusamus
          </p>
        </div>
        <div>
          <h6 className="font-[Merriweather] footer-title">Quick Links</h6>
          <a className="font-[Merriweather] link link-hover" href="#">Home</a>
          <a className="font-[Merriweather] link link-hover" href="#product">Product</a>
          <a className="font-[Merriweather] link link-hover" href="#blogs">Blogs</a>
        </div>
        <div>
          <h6 className="font-[Merriweather] footer-title">Contact</h6>
          <a
            href="https://wa.me/6281280235852?text=permisi%20kak%20saya%20mau%20order%20nih"
            className="btn btn-circle btn-outline"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
