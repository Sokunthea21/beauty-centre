import React from "react";
import { assets } from "@/app/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#2E2E2E] text-white mt-auto">
      <div className="px-6 md:px-16 lg:px-32 pt-[60px] pb-[40px] border-b border-gray-500/30">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-[20px]">
          {/* Left Block */}
          <div className="space-y-5 col-span-1 lg:col-span-1">
            <Image
              src={assets.Beauty_Center}
              alt="Logo"
              className="h-12 w-auto"
            />
            {/* <h2 className="text-xl font-bold text-pink-300">
              Beauty <span className="text-white">Centre</span>
            </h2> */}
            <p className="text-lg text-gray-300">
              Discover nature's beauty with our natural care products.
            </p>
            <ul className="text-lg text-gray-300 space-y-1">
              <li className="flex items-center gap-2 mb-4">
                <span>
                  <Image src={assets.Call} alt="Call" className="h-6 w-auto" />
                </span>
                +38 050 123 45 67
              </li>
              <li className="flex items-center gap-2 mb-4">
                <span>
                  <Image
                    src={assets.Message}
                    alt="Message"
                    className="h-6 w-auto"
                  />
                </span>
                Beautycentre@gmail.com
              </li>
              <li className="flex items-center gap-2 mb-4">
                <span>
                  <Image
                    src={assets.Location}
                    alt="Location"
                    className="h-6 w-auto"
                  />
                </span>
                7 Makara St, Krong Siem Reap
              </li>
            </ul>
          </div>

          {/* Menu Columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] col-span-1 lg:col-span-4">
            <div>
              <h3 className="text-lg font-normal text-white mb-4">HELP</h3>
              <ul className="space-y-2 text-lg text-gray-300">
                <li>Contact us</li>
                <li>FAQ</li>
                <li>Shipping & Returns</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-normal text-white mb-4">
                MY ACCOUNT
              </h3>
              <ul className="space-y-2 text-lg text-gray-300">
                <li>Addresses</li>
                <li>Order Status</li>
                <li>Wishlist</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-normal text-white mb-4">
                CUSTOMER CARE
              </h3>
              <ul className="space-y-2 text-lg text-gray-300">
                <li>About us</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-normal text-white mb-4">
                SIGN UP FOR EMAILS
              </h3>
              <p className="text-lg text-gray-300 mb-2">
                Stay informed, subscribe to our newsletter now!
              </p>
              <form className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 rounded text-black focus:outline-none bg-white"
                />
                <button className="text-base font-medium flex items-center gap-1 text-white hover:text-pink-300 transition">
                  Subscribe →
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#222] py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-base text-gray-400">
          <p className="mb-2 md:mb-0">
            {" "}
            © {new Date().getFullYear()}. Beauty Centre.
          </p>
          <div className="flex gap-4 mb-2 md:mb-0">
            <span className="hover:text-white cursor-pointer">
              <Image
                src={assets.facebook}
                alt="Facebook"
                className="h-8 w-auto"
              />
            </span>
            <span className="hover:text-white cursor-pointer">
              <Image
                src={assets.instagram}
                alt="Instagram"
                className="h-8 w-auto"
              />
            </span>
            <span className="hover:text-white cursor-pointer">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_157_22481)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15ZM15.5377 11.0737C14.0787 11.6805 11.1628 12.9365 6.79002 14.8417C6.07994 15.124 5.70797 15.4003 5.67411 15.6704C5.61688 16.1269 6.18854 16.3066 6.96699 16.5514C7.07288 16.5847 7.18259 16.6192 7.29507 16.6558C8.06095 16.9047 9.09119 17.196 9.62676 17.2075C10.1126 17.218 10.6548 17.0177 11.2535 16.6067C15.3391 13.8488 17.4481 12.4548 17.5805 12.4247C17.674 12.4035 17.8034 12.3769 17.8911 12.4548C17.9788 12.5328 17.9702 12.6804 17.9609 12.72C17.9043 12.9614 15.6603 15.0476 14.4991 16.1272C14.137 16.4638 13.8802 16.7025 13.8278 16.757C13.7102 16.8792 13.5903 16.9947 13.4751 17.1058C12.7636 17.7917 12.23 18.306 13.5047 19.146C14.1172 19.5496 14.6074 19.8834 15.0963 20.2164C15.6304 20.5801 16.163 20.9428 16.8522 21.3946C17.0278 21.5097 17.1954 21.6292 17.3588 21.7457C17.9802 22.1887 18.5386 22.5868 19.2284 22.5233C19.6292 22.4864 20.0432 22.1095 20.2535 20.9854C20.7504 18.3289 21.7272 12.5731 21.9529 10.2012C21.9727 9.99341 21.9478 9.72746 21.9278 9.61072C21.9079 9.49397 21.8661 9.32763 21.7144 9.2045C21.5346 9.05867 21.2572 9.02792 21.1331 9.0301C20.5689 9.04004 19.7033 9.34102 15.5377 11.0737Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_157_22481">
                    <rect width="30" height="30" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className="hover:text-white cursor-pointer">
              <Image src={assets.Tiktok} alt="Tiktok" className="h-8 w-auto" />
            </span>
            <span className="hover:text-white cursor-pointer">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_157_22481)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15ZM15.5377 11.0737C14.0787 11.6805 11.1628 12.9365 6.79002 14.8417C6.07994 15.124 5.70797 15.4003 5.67411 15.6704C5.61688 16.1269 6.18854 16.3066 6.96699 16.5514C7.07288 16.5847 7.18259 16.6192 7.29507 16.6558C8.06095 16.9047 9.09119 17.196 9.62676 17.2075C10.1126 17.218 10.6548 17.0177 11.2535 16.6067C15.3391 13.8488 17.4481 12.4548 17.5805 12.4247C17.674 12.4035 17.8034 12.3769 17.8911 12.4548C17.9788 12.5328 17.9702 12.6804 17.9609 12.72C17.9043 12.9614 15.6603 15.0476 14.4991 16.1272C14.137 16.4638 13.8802 16.7025 13.8278 16.757C13.7102 16.8792 13.5903 16.9947 13.4751 17.1058C12.7636 17.7917 12.23 18.306 13.5047 19.146C14.1172 19.5496 14.6074 19.8834 15.0963 20.2164C15.6304 20.5801 16.163 20.9428 16.8522 21.3946C17.0278 21.5097 17.1954 21.6292 17.3588 21.7457C17.9802 22.1887 18.5386 22.5868 19.2284 22.5233C19.6292 22.4864 20.0432 22.1095 20.2535 20.9854C20.7504 18.3289 21.7272 12.5731 21.9529 10.2012C21.9727 9.99341 21.9478 9.72746 21.9278 9.61072C21.9079 9.49397 21.8661 9.32763 21.7144 9.2045C21.5346 9.05867 21.2572 9.02792 21.1331 9.0301C20.5689 9.04004 19.7033 9.34102 15.5377 11.0737Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_157_22481">
                    <rect width="30" height="30" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
