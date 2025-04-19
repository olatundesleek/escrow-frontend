import Image from "next/image";

interface HistoryCardProps {
  title: string;
  number: string;
  image: string;
}
const HistoryCard = ({ image, number, title }: HistoryCardProps) => {
  return (
    <div className="flex gap-8 bg-white w-[20rem] border-1 border-secondary rounded-md p-6 m-2">
      <Image
        src={image}
        alt={title}
        height={70}
        width={70}
        className="border-r-1 border-secondary"
      />
      <div>
        <h2>{number}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default HistoryCard;
