"use client";

import { useState } from "react";
import Button from "./Button";
import { Listbox } from "@headlessui/react";
import { FaChevronDown, FaMoneyBillWave, FaTags } from "react-icons/fa";

const options = [
  {
    label: "Selling",
    icon: <FaMoneyBillWave className="mr-2 text-green-600" />,
  },
  { label: "Buying", icon: <FaMoneyBillWave className="mr-2 text-blue-600" /> },
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
      className="w-full h-full max-w-lg p-6 bg-gradient-to-br from-primary-section via-blue-50 to-primary border border-blue-200 rounded-3xl shadow-2xl flex flex-col gap-6"
      aria-label="Escrow Action Form"
    >
      <div>
        <h3 className="text-2xl text-secondary font-bold mb-3 flex items-center gap-2">
          <FaTags className="text-blue-600" /> Select Purpose
        </h3>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <Listbox.Button className="border flex items-center justify-between text-lg border-blue-200 text-secondary w-full h-14 px-4 rounded-xl bg-primary-section focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
              <span className="flex items-center">
                {selected.icon}
                {selected.label}
              </span>
              <FaChevronDown />
            </Listbox.Button>
            <Listbox.Options className="w-full absolute z-10 mt-2 bg-primary-section border border-blue-200 rounded-xl shadow-lg">
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

      <div>
        <h3 className="text-2xl text-secondary font-bold mb-3 flex items-center gap-2">
          <FaTags className="text-blue-600" /> Select Category
        </h3>
        <Listbox value={selectedCat} onChange={setSelectedCat}>
          <div className="relative">
            <Listbox.Button className="border flex items-center justify-between text-lg border-blue-200 text-secondary w-full h-14 px-4 rounded-xl bg-primary-section focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
              <span>{selectedCat}</span>
              <FaChevronDown />
            </Listbox.Button>
            <Listbox.Options className="w-full absolute z-10 mt-2 bg-primary-section border border-blue-200 rounded-xl shadow-lg">
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

      <div>
        <label htmlFor="amount" className="sr-only">
          Amount
        </label>
        <div className="flex rounded-xl border border-blue-200 text-lg items-center text-secondary bg-primary-section h-14">
          <span className="bg-blue-50 px-4 py-2 min-w-[7rem] text-center shrink-0 h-full flex items-center rounded-l-xl">
            Amount of
          </span>
          <input
            id="amount"
            type="number"
            min={0}
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter the amount"
            className="h-full px-4 py-2 flex-1 bg-transparent text-secondary placeholder:text-primary outline-none border-none w-full"
          />
          <span className="bg-blue-50 px-4 py-2 text-center shrink-0 h-full flex items-center rounded-r-xl">
            NGN
          </span>
        </div>
      </div>

      <Button
        color="bg-gradient-to-r from-secondary to-accent text-primary-section"
        textSize="text-xl w-full"
        style="mt-4 py-4 rounded-xl font-semibold shadow hover:to-secondary hover:from-accent transition"
        isLoading={!amount || Number(amount) <= 0}
      >
        Proceed To Next
      </Button>
    </form>
  );
};

export default EscrowAction;
