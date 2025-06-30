"use client";

import { useState } from "react";
import Button from "./Button";
import { Listbox } from "@headlessui/react";
import { FaChevronDown, FaMoneyBillWave } from "react-icons/fa";

const options = [
  {
    label: "Selling",
    icon: <FaMoneyBillWave className="mr-2 text-green-600" />,
  },
  {
    label: "Buying",
    icon: <FaMoneyBillWave className="mr-2 text-blue-600" />,
  },
];

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
  const [amount, setAmount] = useState("");

  return (
    <form
      className="w-full max-w-lg p-5 bg-white border border-secondary/10 rounded-2xl shadow-2xl flex flex-col gap-6 overflow-visible"
      aria-label="Escrow Action Form"
    >
      {/* Purpose Selection */}
      <div>
        <h3 className="text-xl font-semibold text-secondary mb-2">
          Select Purpose
        </h3>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <Listbox.Button className="w-full h-14 px-4 flex justify-between items-center text-lg text-secondary bg-primary-section border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
              <span className="flex items-center">
                {selected.icon}
                {selected.label}
              </span>
              <FaChevronDown />
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-primary-section border border-blue-200 rounded-xl shadow-lg">
              {options.map((option) => (
                <Listbox.Option
                  key={option.label}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none py-3 px-5 flex items-center gap-2 ${
                      active ? "bg-blue-100 text-secondary" : "text-gray-900"
                    }`
                  }
                >
                  {option.icon}
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* Category Selection */}
      <div>
        <h3 className="text-xl font-semibold text-secondary mb-2">
          Select Category
        </h3>
        <Listbox value={selectedCat} onChange={setSelectedCat}>
          <div className="relative">
            <Listbox.Button className="w-full h-14 px-4 flex justify-between items-center text-lg text-secondary bg-primary-section border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
              <span>{selectedCat}</span>
              <FaChevronDown />
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-primary-section border border-blue-200 rounded-xl shadow-lg">
              {categories.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none py-3 px-5 ${
                      active ? "bg-blue-100 text-secondary" : "text-gray-900"
                    }`
                  }
                >
                  {option}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* Amount Input */}
      <div>
        <label htmlFor="amount" className="sr-only">
          Transaction Amount
        </label>
        <div className="flex items-center h-14 text-lg text-secondary border border-blue-200 rounded-xl bg-primary-section overflow-hidden">
          <span className="bg-blue-50 px-4 py-2 min-w-[7rem] text-center flex items-center">
            Amount of
          </span>
          <input
            id="amount"
            type="number"
            min={0}
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="flex-1 h-full px-4 py-2 bg-white text-secondary placeholder:text-gray-300 outline-none border-none"
          />
          <span className="bg-blue-50 px-4 py-2 text-center flex items-center">
            NGN
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        color="bg-secondary text-primary-section"
        textSize="text-xl w-full"
        style="mt-4 py-4 rounded-xl font-semibold shadow transition"
        isLoading={!amount || Number(amount) <= 0}
      >
        Proceed To Next
      </Button>
    </form>
  );
};

export default EscrowAction;
