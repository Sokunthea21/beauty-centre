import React from "react";

const Newsletter = () => {
  return (
    <div className=" p-10 bg-[#fef1f5] text-center px-4 ">
      <h2 className="text-2xl md:text-3xl text-[var(--text)]">
        Join Our Newsletter
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Sign up for deals, new products and promotions
      </p>

     <form className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
      <input
        type="email"
        placeholder="Your email address"
        className="bg-white w-full sm:w-72 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
      />
      <button
        type="submit"
        className="px-5 py-2 bg-black text-white hover:bg-gray-800 transition"
      >
        Subscribe
      </button>
    </form>
    </div>
  );
}

export default Newsletter;
