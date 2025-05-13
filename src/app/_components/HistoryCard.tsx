import Image from "next/image";

interface HistoryCardProps {
  title: string;
  number: string;
  image: string;
}
const HistoryCard = ({ image, number, title }: HistoryCardProps) => {
  return (
    <div className="flex gap-1 bg-white w-[20rem] border-1 border-secondary rounded-md p-6 m-2">
      <div className="flex items-center space-x-4">
        <Image
          src={image}
          alt={title}
          height={80}
          width={80}
          // className="border-r-1 px-4 border-secondary"
        />
        <div className="h-12 w-px bg-secondary "></div>
      </div>
      <div className="flex gap-3 ">
        <div className="h-12 w-px  bg-orange-400 "></div>
        <div>
          <h2 className="text-4xl text-gray-500 font-bold pb-2">{number}</h2>
          <p className="text-xl text-gray-600">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
