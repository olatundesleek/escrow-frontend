import Image from "next/image";
import Header from "./Header";
import Article from "./Article";

interface AboutusCardProps {
  image: string;
  title: string;
  description: string;
}
const AboutusCard = ({ image, title, description }: AboutusCardProps) => {
  return (
    <div className="lg:w-auto m-3 h-auto flex flex-col gap-3 border-1 border-gray-300 bg-white rounded-md p-4">
      <Image src={image} alt={title} width={60} height={60} />
      <Header>{title}</Header>
      <Article>{description}</Article>
    </div>
  );
};

export default AboutusCard;
