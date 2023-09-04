import React from "react";

const ProgressBar = ({ progressedPercent = 20 }) => {
  return (
    <div className="my-10">
      <span id="ProgressLabel" className="sr-only">
        Loading
      </span>

      <span
        role="progressbar"
        aria-labelledby="ProgressLabel"
        aria-valuenow={progressedPercent}
        className="relative block rounded-full bg-gray-200"
      >
        <span className="absolute inset-0 flex items-center justify-center text-[10px]/4">
          <span className="font-bold text-white"> {progressedPercent}% </span>
        </span>

        <span
          className="block h-4 rounded-full bg-indigo-600 text-center"
          style={{ width: progressedPercent + "%" }}
        ></span>
      </span>
    </div>
  );
};

export default ProgressBar;
