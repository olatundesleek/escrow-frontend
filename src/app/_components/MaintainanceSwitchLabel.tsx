"use client";

import { Dispatch, SetStateAction, useEffect } from "react";

type TSwitch = {
  label: string;
  setChecked: Dispatch<SetStateAction<boolean>>;
  checked: boolean;
  focusRef: HTMLInputElement | null;
};

const SwitchWithLabel = ({ label, setChecked, checked, focusRef }: TSwitch) => {
  useEffect(() => {
    if (focusRef && checked === true) {
      focusRef.focus();
    }
  }, [focusRef, checked]);
  const toggleSwitch = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        onClick={toggleSwitch}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default SwitchWithLabel;
