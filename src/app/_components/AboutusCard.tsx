import Header from "./Header";
import Article from "./Article";
import { IconType } from "react-icons";

interface AboutusCardProps {
  Icon: IconType;
  title: string;
  description: string;
}
const AboutusCard = ({ Icon, title, description }: AboutusCardProps) => {
  return (
    <div className="lg:w-auto h-auto flex flex-col gap-3 border-1 border-gray-300 bg-white rounded-md p-4">
      <Icon size={48} className="text-accent mb-2" aria-hidden="true" />
      <Header textSize="text-xl font-semibold">{title}</Header>
      <Article>{description}</Article>
    </div>
  );
};

export default AboutusCard;
