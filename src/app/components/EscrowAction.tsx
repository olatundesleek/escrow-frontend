"use client";

import {useState} from "react";
import Button from "./Button";
import {Listbox} from "@headlessui/react";

const options = ["Selling", "Buying"];
const categories =["Real Estate", "Vehicle", "Construction","Home Renovation","Freelancing Platform", "Loan Agreement","Investment Transaction","Luxury Goods","Import/Export Transaction","Crypto Transaction"]

const EscrowAction = () => {
  const [selected, setSelected] = useState(options[0]);
  const [selectedCat, setSelectedCat] = useState(categories[0]);

  return (
    // <div className="bg-[#f59e0b]/10 backdrop-blur-lg border border-[#facc15] rounded-xl p-6 shadow-lg">

    <form className="p-5 w-110 h-110 bg-amber-500/10 backdrop-blur-lg border border-yellow-300 rounded-xl shadow-lg">
      <div className="py-3">
        <h3 className="text-xl text-white font-bold py-3">Select Purpose</h3>

        {/* <select className="border border-white text-white w-full h-13 p-2 rounded-md border-xl focus:outline-none focus:ring-2 focus:border-none focus:ring-amber-500">
          <option>Selling</option>
          <option>Buying</option>
        </select> */}

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
          <Listbox.Options className="absolute z-10 w-100 bg-white shadow-lg">
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

        {/* <select>
          <option disabled>Select One</option>
          <option>Real Estate</option>
          <option>Vehicle</option>
          <option>Construction</option>
          <option>Home Renovations</option>
          <option>Freelencing Platforms</option>
          <option>Investment Transactions</option>
          <option>Loan Agreement</option>
          <option>Luxury Goods</option>
          <option>Import/Export Transaction</option>
          <option>Crypto Transaction</option>
        </select> */}
      </div>

      <div className="py-5">
        <h3 className="text-xl text-white  py-2">Escrow Amount</h3>
        <div>
          <h3>Amount of</h3>
          <input placeholder="Enter the amount" />
          {/* <select>
            <option>USD</option>
            <option>NGN</option>
          </select> */}
        </div>
      </div>

      <Button>Proceed To Next</Button>
    </form>
  );
};

export default EscrowAction;
