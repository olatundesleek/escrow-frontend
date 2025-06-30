import Image from "next/image";
import Header from "./Header";
import Article from "./Article";
import { HiCalendarDateRange } from "react-icons/hi2";

interface ArticleCardProps {
  title: string;
  description: string;
  image: string;
}
const ArticleCard = ({ title, image, description }: ArticleCardProps) => {
  // Can be replaced with a more dynamic date fetching method when getting from backend
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <div className="flex flex-col gap-6 w-72 lg:w-80 h-[36rem]  border border-gray-300 hover:border-accent duration-500 bg-white rounded-lg p-7 m-3">
      <Image
        src={image}
        alt={title}
        width={500}
        height={500}
        className="rounded-lg w-full cursor-pointer object-cover"
      />

      <div className="flex  gap-4 items-center justify-start w-50 p-2 rounded-4xl bg-orange-500 text-white">
        <HiCalendarDateRange className="text-2xl" />
        <p>{formattedDate}</p>
      </div>

      <Header textSize="text-2xl hover:text-seconadary cursor-pointer">
        {title}
      </Header>
      <div className="w-full pt-5 border-t-2 border-t-gray-300">
        <Article>{description}</Article>
      </div>
    </div>
  );
};

export default ArticleCard;
