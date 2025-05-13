interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  textSize?: string;
  padding?: string;
  style?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  isLoading?: boolean;
}

const Button = ({
  children,
  color = 'bg-secondary text-white',
  textSize = 'text-xl',
  padding = 'px-5 py-3',
  style = '',
  onClick,
  type = 'button',
  isLoading = false,
}: ButtonProps) => {
  const baseStyle = `${padding} ${textSize} rounded-md transition duration-300 ${style}`;
  const isDisabledStyle = `blur[3px] ${color} text-white cursor-not-allowed ${padding} ${textSize} rounded-md transition duration-300 ${style}`;
  const activeStyle = `${color} cursor-pointer hover:opacity-80`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseStyle} ${isLoading ? isDisabledStyle : activeStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
