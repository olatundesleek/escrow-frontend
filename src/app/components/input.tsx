interface InputProps {
  name?: string;
  type: string;
  value: string;
  onchange: React.ChangeEventHandler<HTMLInputElement>;
  style?: string;
}

export const Input = ({ name, type, value, onchange, style }: InputProps) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onchange}
      className={`form_input w-full p-4 pr-12 border border-gray-300 rounded-sm bg-white ${style}`}
    />
  );
};
