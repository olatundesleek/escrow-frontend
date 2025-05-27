interface InputProps {
  InputTitle?: string;
  name?: string;
  type?: string;
  value?: string;
  onchange?: React.ChangeEventHandler<HTMLInputElement>;
  style?: string;
  children?: React.ReactNode;
  autoComplete?: string;
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
}: InputProps) => {
  return (
    <>
      <label
        htmlFor={name}
        className='block pt-4 font-medium 2xl:text-xl text-[16px]'
      >
        {InputTitle}
        <span className='text-red-500'>*</span>
      </label>
      {children ? (
        children
      ) : (
        <input
          autoComplete={autoComplete || 'on'}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onchange}
          className={`outline-0 focus-within:border-0 focus-within:ring-1 focus:ring-secondary w-full p-4 pr-12 border border-gray-300 rounded-sm bg-white ${style}`}
        />
      )}
    </>
  );
};
