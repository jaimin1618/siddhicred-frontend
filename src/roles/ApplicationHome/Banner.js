import React from "react";

const Banner = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            SiddhiCred - A Platform for NFT certificates issuance
            <strong className="font-extrabold text-orange-700 sm:block">
              Transform certificate issuing with power of blockchain
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            A platform empowering for certificate earners and certificate issuing organizations.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-orange-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-orange-800 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/get-started"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-orange-600 shadow hover:text-orange-700 focus:outline-none focus:ring active:text-orange-500 sm:w-auto"
              href="/about"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
