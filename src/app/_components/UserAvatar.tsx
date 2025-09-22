"use client";

import Image from "next/image";
import Link from "next/link";
import { LuUserRound } from "react-icons/lu";
import { TbSettingsCog } from "react-icons/tb";
import { useUserProfileForm } from "../_hooks/useUserProfileForm";
import { useState, useEffect } from "react";

interface UserAvatarProps {
  dropdown: boolean;
  setDropdown: (value: boolean) => void;
}

export default function UserAvatar({ dropdown, setDropdown }: UserAvatarProps) {
  const { user } = useUserProfileForm();
  console.log("user:", user);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDarkMode(saved === "dark");
    else setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    document.documentElement.classList.toggle("dark", nextMode);
    localStorage.setItem("theme", nextMode ? "dark" : "light");
  };

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setDropdown(!dropdown)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-db-primary focus:outline-none focus:ring-2 focus:ring-db-primary scale-105 transition"
        aria-label="User menu"
      >
        <Image
          src={user?.avatar || "/useravartar.png"}
          alt="User avatar"
          fill
          className="cover rounded-full w-full h-full center"
        />
      </button>

      {/* Dropdown */}
      {dropdown && (
        <ul className="absolute right-0 top-14 mt-2 p-2 bg-db-surface rounded-xl border border-db-border z-10 min-w-[150px] flex flex-col gap-1">
          <li>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-db-background text-db-text-primary transition"
            >
              <LuUserRound className="text-db-primary" /> Profile
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-db-background text-db-text-primary transition"
            >
              <TbSettingsCog className="text-db-primary" /> Settings
            </Link>
          </li>
          <li
            onClick={toggleDarkMode}
            className="flex items-center justify-between px-3 py-2 rounded hover:bg-db-background text-db-text-primary text-xs cursor-pointer transition"
            role="button"
            tabIndex={0}
            aria-label="Toggle dark/light mode"
          >
            <div
              className={`w-8 h-4 rounded-full p-0.5 flex items-center transition ${
                darkMode
                  ? "bg-gray-600 justify-end"
                  : "bg-gray-300 justify-start"
              }`}
            >
              <span className="w-3 h-3 bg-db-surface rounded-full shadow-sm"></span>
            </div>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </li>
        </ul>
      )}
    </div>
  );
}
