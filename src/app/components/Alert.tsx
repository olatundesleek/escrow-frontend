interface AlertProps {
  message: string;
  style: string;
}

export const Alert = ({ message, style }: AlertProps) => {
  return (
    <div
      className={`w-[300px] h-auto p-2 top-5 right-5 z-10 flex justify-center items-center text-white font-bold rounded-xl border absolute ${style}`}
    >
      {message}
    </div>
  );
};
