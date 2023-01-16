import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#FFFAF2] py-20">
      <div className="footer p-10  text-base-content container px-16 mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-primary">
            Electric-manufacturer
          </h2>
          <p>
            If you can, take a moment and imagine <br /> a world without
            electronics.
            <br /> Not only would I have
            <br /> lacked the ability to write
            <br /> this article, but you would
            <br /> not have had the luxury
            <br /> of reading it at this moment.
          </p>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
