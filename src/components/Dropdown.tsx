import { useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp, AiOutlineLoading3Quarters } from "react-icons/ai";
import { listenForOutsideClicks } from "../assets/outSideClickHandler";
import useCurrencies from "../hooks/useCurrencies";
import { IDropDownProps } from "../interfaces/IDropDownProps";

function Dropdown({ selectedCurrency, onChangeCurrency }: IDropDownProps) {
  const { data: supportedCurrencies, error, isLoading } = useCurrencies();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [listening, setListening] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  useEffect(listenForOutsideClicks(listening, setListening, dropDownRef, setIsOpen));

  return (
    <div className="relative flex flex-col items-center w-full rounded-lg border" ref={dropDownRef}>
      <button
        className="text-sm p-4 w-[240px] flex items-center justify-between font-bold text-lg rounded-lg  border-4 border-transparent active:border-white duration-300 active:text-white"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {selectedCurrency}

        {isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
      </button>
      {isOpen && (
        <div className="bg-white absolute top-[64px] w-full h-[300px] overflow-auto border">
          {error ? (
            <p className="text-center font-bold w-full">{error.message}</p>
          ) : isLoading ? (
            <div className="flex justify-center items-center w-full h-full">
              <AiOutlineLoading3Quarters fontSize={50} />
            </div>
          ) : (
            supportedCurrencies?.map((item: string, index: number) => (
              <h3
                key={index}
                className="px-4 py-2"
                onClick={() => {
                  onChangeCurrency(item);
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
