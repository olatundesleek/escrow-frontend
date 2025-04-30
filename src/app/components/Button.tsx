import { ReactNode } from "react";

//Documentation on how to use some styles like all as a default value buh perhaps you want to adjusts some you have room to do so and you can so pass function if required
// if u encounter an issue console.bol()

interface ButtonProps {
  children: ReactNode;
  color?: string;
  textSize?: string;
  padding?: string;
  style?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button = ({
  children,
  color = "bg-primary text-white",
  textSize = "font-2xl",
  padding = "px-5 py-3",
  style = "",
  onClick,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${padding} ${textSize} ${color} ${style} rounded-md hover:opacity-80 transition duration-300  cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;
