// interface FormFormatProps {
//   children: React.ReactNode;
//   title: string;
//   format: string;
// }

// const FormFormat = ({ children, title, format }: FormFormatProps) => {
//   return (
//     <div>
//       <div className="flex items-center gap-2 border-b-1 border-white ">
//         <button className="bg-brown-100 ">{children}</button>
//         <h2>{title}</h2>
//       </div>
//       <h1>{format}</h1>
//     </div>
//   );
// };

// export default FormFormat;

// FormFormat.tsx
interface FormFormatProps {
  children: React.ReactNode;
  title: string;
  format: string;
}

const FormFormat = ({ children, title, format }: FormFormatProps) => {
  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex items-center gap-2 pb-5 border-b border-white ">
        <div className="bg-amber-200 p-2 rounded text-black">{children}</div>
        <h2 className="text-2xl font-semibold">{title}:</h2>
      </div>
      <p className=" text-md">{format}</p>
    </div>
  );
};

export default FormFormat;
