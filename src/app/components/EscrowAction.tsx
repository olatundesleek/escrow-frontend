"use client";

import {useState} from "react";
import Button from "./Button";
import {Listbox} from "@headlessui/react";

const options = ["Selling", "Buying"];
const categories = [
  "Real Estate",
  "Vehicle",
  "Construction",
  "Home Renovation",
  "Freelancing Platform",
  "Loan Agreement",
  "Investment Transaction",
  "Luxury Goods",
  "Import/Export Transaction",
  "Crypto Transaction",
];

const EscrowAction = () => {
  const [selected, setSelected] = useState(options[0]);
  const [selectedCat, setSelectedCat] = useState(categories[0]);

  return (
    <form className="px-9 w-[30rem] h-[30rem] bg-amber-500/10 backdrop-blur-lg border border-yellow-300 rounded-xl shadow-lg">
      <div className="py-3">
        <h3 className="text-xl text-white font-bold py-3">Select Purpose</h3>

        <Listbox value={selected} onChange={setSelected}>
          <Listbox.Button className="border flex justify-between text-xl border-white text-white w-full h-13 p-2 rounded-md border-xl focus:outline-none focus:ring-2 focus:border-none focus:ring-amber-500">
            {selected} <span>&#9662;</span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 w-100 bg-white shadow-lg">
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={({active}) =>
                  `cursor-pointer select-none py-2 px-4 ${
                    active ? "bg-lime-400 text-white" : "text-gray-900"
                  }`
                }
              >
                {option}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>

      <div className="py-3">
        <h3 className="text-xl text-white font-bold py-2">Select Category</h3>

        <Listbox value={selectedCat} onChange={setSelectedCat}>
          <Listbox.Button className="border text-left text-xl flex justify-between  border-white text-white w-full h-13 p-2 rounded-md border-xl focus:outline-none focus:ring-2 focus:border-none focus:ring-amber-500">
            {selectedCat} <span>&#9662;</span>
          </Listbox.Button>
          <Listbox.Options className="absolute overflow-scroll overflow-x-hidden z-10 w-100 h-50 bg-white shadow-lg">
            {categories.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={({active}) =>
                  `cursor-pointer select-none py-2 px-4 ${
                    active ? "bg-lime-400 text-white" : "text-gray-900"
                  }`
                }
              >
                {option}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>

      <div className="py-3">
        <h3 className="text-xl text-white font-bold py-2">Escrow Amount</h3>
        <div className="flex rounded-md border border-white text-xl h-13 justify-between items-center text-white">
          <h3 className="bg-stone-200/10 transparent flex items-center px-2 h-full">Total of</h3>
          <input placeholder="Enter the amount" type="number" className="h-full px-2 outline-none border-none" />
          <h3 className="bg-stone-200/10 transparent flex items-center  px-2 h-full">NGN</h3>
        </div>
      </div>

      <Button color="bg-rose-300 text-white" textSize="text-xl w-full mt-4">Proceed To Next</Button>
    </form>
  );
};

export default EscrowAction;
