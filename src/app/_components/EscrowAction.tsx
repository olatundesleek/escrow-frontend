"use client";

import { useState } from "react";
import Button from "./Button";
import { Listbox } from "@headlessui/react";

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
    <form className='w-full h-full max-w-[30rem] p-2 lg:px-9 sm:p-6 lg:w-[30rem] lg:h-[30rem] bg-amber-500/10 backdrop-blur-lg border border-yellow-300 rounded-xl shadow-lg'>
      <div className='py-3'>
        <h3 className='text-xl text-white font-bold py-3 relative'>
          Select Purpose
        </h3>

        <Listbox value={selected} onChange={setSelected}>
          <Listbox.Button className='border flex justify-between lg:text-xl border-white text-white w-full lg:h-13 p-2 rounded-md border-xl focus:outline-none focus:ring-2 focus:border-none focus:ring-amber-500'>
            {selected} <span>&#9662;</span>
          </Listbox.Button>
          <div className='relative w-full'>
            <Listbox.Options className='w-full absolute bg-white shadow-lg'>
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none py-2 px-4 ${
                      active ? 'bg-secondary text-white' : 'text-gray-900'
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

      <div className='py-3'>
        <h3 className='text-xl text-white font-bold py-2'>Select Category</h3>

        <Listbox value={selectedCat} onChange={setSelectedCat}>
          <Listbox.Button className='border flex justify-between lg:text-xl border-white text-white w-full lg:h-13 p-2 rounded-md border-xl focus:outline-none focus:ring-2 focus:border-none focus:ring-amber-500'>
            {selectedCat} <span>&#9662;</span>
          </Listbox.Button>
          <div className='relative w-full'>
            <Listbox.Options className='w-full absolute bg-white shadow-lg'>
              {categories.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none py-2 px-4 ${
                      active ? 'bg-secondary text-white' : 'text-gray-900'
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

      <div className='flex rounded-md border border-white text-base lg:h-13 text-md items-center text-white'>
        <span className='bg-stone-200/10 px-2 py-2 min-w-[6rem] text-center shrink-0 h-full flex items-center'>
          Amount of
        </span>

        <input
          type='number'
          placeholder='Enter the amount'
          className='h-full px-2 py-2 flex-1 bg-transparent text-white placeholder:text-gray-300 outline-none border-none w-full'
        />

        <span className='bg-stone-200/10 px-2 py-2 text-center shrink-0 h-full flex items-center'>
          NGN
        </span>
      </div>

      <Button color='bg-secondary text-white' textSize='lg:text-xl w-full mt-4'>
        Proceed To Next
      </Button>
    </form>
  );
};

export default EscrowAction;
