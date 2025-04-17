import React from "react";

interface HeaderProps {
  children: React.ReactNode;
  textSize?: string;
}

const Header = ({ children, textSize = "text-2xl" }: HeaderProps) => {
  return (
    <header className={`text-gray-600 ${textSize} font-semibold `}>
      {children}
    </header>
  );
};

export default Header;
