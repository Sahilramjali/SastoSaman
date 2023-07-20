import { MessageCircle, Phone } from "lucide-react";

import appStore from "../../assets/images/appstore.svg";

import playStore from "../../assets/images/googleplay.svg";
import Listing from "./listing";
import { categories, services } from "../../constants/constant";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-500 flex flex-col text-white gap-1">
      <section className="w-full px-10 py-11  flex flex-col justify-between sm:flex-row  flex-wrap">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">SastoSaman</h2>
          <p className="text-[16px]">Contact Us</p>
          <div className="flex flex-row text-[14px] gap-2">
            <MessageCircle />
            <div className="flex flex-col">
              <p>What apps</p>
              <p>+977 89798797</p>
            </div>
          </div>

          <div className="flex flex-row text-[14px] gap-2">
            <Phone />
            <div className="flex flex-col">
              <p>call us</p>
              <p>+977 520489</p>
            </div>
          </div>
          <span className="text-[14px]">Download App</span>
          <div className="flex">
            <div className="w-32 md:w-40 h-16 mr-2 relative">
              <img
                src={appStore}
                alt="icon"
                className="object-contain object-center"
              />
            </div>
            <div className="w-32 md:w-40 h-16  relative">
              <img
                src={playStore}
                alt="icon"
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>

        <Listing title="Most Popular Categories" array={categories} />
        <Listing title="Customer Services" array={services} />
      </section>
      <hr/>
      <section className="flex justify-center items-center h-12">
        <p>© 2023 All rights reserved. SastoSaman</p>
      </section>
    </footer>
  );
};

export default Footer;
