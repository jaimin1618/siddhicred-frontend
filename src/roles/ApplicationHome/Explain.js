import React from "react";
import Team from "../../assets/team.svg";
import Certificate from "../../assets/certificate.svg";
import { Link } from "react-scroll";

const Explain = () => {
  return (
    <div>
      <div className="mx-auto max-w-lg text-center px-2">
        <h2 className="text-3xl font-bold sm:text-4xl">Built for</h2>

        <p className="mt-4 text-black">
          Platform is built for two audiences, Earners -{" "}
          <i className="font-medium">certificate holders</i> and Issuers -{" "}
          <i className="font-medium">certificate issuing organizations</i>.
        </p>
      </div>
      <section className="bg-red-500 lg:m-10 md:m-10 m-5 rounded-sm">
        <div className="mx-auto max-w-screen-xl px-4 py-5 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <img
                alt="Party"
                // src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                src={Certificate}
                className="absolute inset-0 h-full w-full"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">Earners</h2>

              <p className="mt-4 text-black font-medium">
                Earners represent certificate holders 🏆, and they have the
                ability to obtain ownership of the certificate in the form of an
                NFT token. These certificates are officially issued by reputable
                organizations and their corresponding issuer accounts. Users
                will have the capability to monitor and oversee the certificates
                they possess.
              </p>

              <Link
                smooth
                spy
                to="banner"
                className="mt-8 inline-block rounded bg-red-900 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Earner? Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-500 lg:m-10 md:m-10 m-5 rounded-sm">
        <div className="mx-auto max-w-screen-xl px-4 p-5 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
              <img
                alt="Party"
                // src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                src={Team}
                className="absolute inset-0 h-full w-full"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">Organizations</h2>

              <p className="mt-4 text-black font-medium">
                The issuer can represent an organization 🏫, institute, or
                company interested in issuing certificates of various types,
                including ownership certificates, certificates of appreciation,
                and certificates of validity. The issuer has the ability to
                monitor the issued certificate tokens, control the certificate
                supply, and oversee the certificates that have been issued
                within their issuer account.
              </p>

              <Link
                smooth
                spy
                to="banner"
                className="mt-8 inline-block rounded bg-blue-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Organization? Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explain;
