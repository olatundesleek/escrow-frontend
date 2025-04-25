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
  return (
    <div>
      <Image src={image} alt={title} width={250} height={250} />
      <div>
        <HiCalendarDateRange />
        <p>{Date.now()}</p>
        <Header>{title}</Header>
        <Article>{description}</Article>
      </div>
    </div>
  );
};

export default ArticleCard;
