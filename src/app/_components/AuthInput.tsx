interface InputProps {
  InputTitle?: string;
  name?: string;
  type?: string;
  value?: string;
  onchange?: React.ChangeEventHandler<HTMLInputElement>;
  style?: string;
  children?: React.ReactNode;
  autoComplete?: string;
  placeholder?: string;
}

export const AuthInput = ({
  InputTitle,
  name,
  type,
  value,
  onchange,
  style,
  children,
  autoComplete,
  placeholder,
}: InputProps) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block pt-4 font-medium 2xl:text-xl text-md"
      >
        {InputTitle}
        <span className="text-red-500">*</span>
      </label>
      {children ? (
        children
      ) : (
        <input
          autoComplete={autoComplete || "on"}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onchange}
          placeholder={placeholder}
          className={`outline-0 focus-within:border-0 focus-within:ring-1 focus:ring-secondary w-full sm:p-4 p-2 pr-12 border border-gray-300 rounded-sm bg-white ${style}`}
        />
      )}
    </>
  );
};
