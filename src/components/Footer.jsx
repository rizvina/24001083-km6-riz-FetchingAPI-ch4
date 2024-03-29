import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    // Footer component
    <footer className="bg-dark text-light py-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            {/* Logo IMovie */}
            <a
              href="/"
              className="text-danger text-lg font-bold"
              style={{
                fontSize: "28px",
                color: "#FFD700",
                borderBottom: "2px solid #FFD700",
              }}
            >
              IMovie
            </a>
            {/* Copyright */}
            <small
              className="block text-muted"
              style={{ fontSize: "18px", color: "white" }}
            >
              © {new Date().getFullYear()} IMovie, All rights reserved.
            </small>
          </div>
          <div className="flex">
            {/* Icon Facebook */}
            <FaFacebook
              href="#"
              className="text-light me-3"
              style={{ fontSize: "28px", color: "#FFD700" }}
            />
            {/* Icon Twitter */}
            <AiFillTwitterCircle
              href="#"
              className="text-light me-3"
              style={{ fontSize: "28px", color: "#FFD700" }}
            />
            {/* Icon Instagram */}
            <FaSquareInstagram
              href="#"
              className="text-light"
              style={{ fontSize: "28px", color: "#FFD700" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
