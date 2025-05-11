interface InputProps {
  InputTitle?: string;
  name?: string;
  type: string;
  value: string;
  onchange: React.ChangeEventHandler<HTMLInputElement>;
  style?: string;
}

export const AuthInput = ({
  InputTitle,
  name,
  type,
  value,
  onchange,
  style,
}: InputProps) => {
  return (
    <>
      <label className="block pt-4 font-medium 2xl:text-xl text-[16px]">
        {InputTitle}
        <span className="text-red-500">*</span>
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onchange}
        className={`form_input w-full p-4 pr-12 border border-gray-300 rounded-sm bg-white ${style}`}
        required
      />
    </>
  );
};
