import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Contact = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const endpoint = BACKEND_URL + "/message";
  const [msg, setMsg] = useState({
    name: "",
    email: "",
    body: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMsg({
      ...msg,
      [name]: value,
    });
  };

  const handleSubmitButtonClick = async () => {
    const httpRes = await axios.post(endpoint);

    if (httpRes.status && httpRes.data) {
      const json = httpRes.data.message;

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Thanks!👍 I will reply back to you soon!",
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title:
          "Error! Sorry 😔! We are unable to receive your message for now.",
      });
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center px-2">
          <h2 className="text-3xl font-bold sm:text-4xl">Contact me</h2>
          <p className="mt-4 text-black">
            Feel free to reach out to me htmlFor any query related to this
            platform.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-5">
          <div className="lg:col-span-1 lg:py-0">
            {/* <p className="max-w-xl text-lg">
              Feel to reach out to me through this contact form.
            </p> */}

            {/* <div className="mt-8">
              <a href="" className="text-2xl font-bold text-pink-600"></a>

              <address className="mt-2 not-italic">Ahmedabad, India</address>
            </div> */}
          </div>

          <div className="rounded-md p-0 lg:col-span-3 lg:p-12">
            <form className="space-y-2 my-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Full Name
                  </label>
                  <input
                    onChange={(e) => handleInputChange(e)}
                    value={msg.name}
                    className="w-full rounded-md border border-gray-200 p-3 text-sm"
                    placeholder="Full Name"
                    type="text"
                    name="name"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">
                    Email
                  </label>
                  <input
                    onChange={(e) => handleInputChange(e)}
                    value={msg.email}
                    className="w-full rounded-md border border-gray-200 p-3 text-sm"
                    placeholder="Email address"
                    type="emal"
                    name="email"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3"></div>

              <div>
                <label className="sr-only" htmlFor="message">
                  Message
                </label>

                <textarea
                  onChange={(e) => handleInputChange(e)}
                  value={msg.body}
                  type="text"
                  name="body"
                  className="w-full border border-gray-200  rounded-md p-3 text-sm"
                  placeholder="Message"
                  rows="8"
                ></textarea>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleSubmitButtonClick()}
                  type="button"
                  className="inline-block w-full uppercase rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
