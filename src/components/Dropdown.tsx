import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  AiOutlineCaretDown,
  AiOutlineCaretUp,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { listenForOutsideClicks } from "../assets/outSideClickHandler";
import useCurrencies from "../hooks/useCurrencies";

function Dropdown() {
  const { data: supportedCurrencies, error, isLoading } = useCurrencies();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [listening, setListening] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(
    listenForOutsideClicks(listening, setListening, dropDownRef, setIsOpen)
  );
  console.log(isOpen);
  return (
    <div
      className="relative flex flex-col items-center w-[340px] h-[340px] rounded-lg"
      ref={dropDownRef}
    >
      <button
        className="bg-blue-400 p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {selectedCurrency || "please select a currency..."}

        {isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
      </button>
      {isOpen && (
        <div className="bg-blue-400 absolute top-20 w-full h-[300px] overflow-auto">
          {error ? (
            <p className="text-center font-bold w-full">{error.message}</p>
          ) : isLoading ? (
            <div className="flex justify-center items-center w-full h-full">
              <AiOutlineLoading3Quarters fontSize={50} />
            </div>
          ) : (
            supportedCurrencies?.map((item) => (
              <h3
                className="px-4 py-2"
                onClick={() => {
                  setSelectedCurrency(item);
                }}
              >
                {item}
              </h3>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
