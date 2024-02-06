import React from "react";
import { FaTimes, FaCircle } from "react-icons/fa";

function Square({ value, onClick }) {
  return (
    <div
      className="h-24 border-2 mt-1 justify-center mt-20px w-[100%] bg-[#EBF4FA] border-black items-center flex rounded-lg"
      onClick={onClick}
    >
      {value === "X" ? (
        <FaTimes className="text-red-500 text-3xl" />
      ) : value === "O" ? (
        <FaCircle className="text-blue-500 text-3xl" />
      ) : null}
    </div>
  );
}

export default Square;
