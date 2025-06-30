import { IconType } from "react-icons";
import Article from "./Article";

interface ServiceCardProps {
  goods: string;
  title: string;
  Icon: IconType;
  description: string;
}

const ServiceCard = ({ goods, title, Icon, description }: ServiceCardProps) => {
  return (
    <div className="flex flex-col gap-5 lg:w-80 w-70 h-full p-4 lg:p-8 justify-content text-center items-center bg-white border-1 border-gray-200 duration-100 hover:border-accent rounded-md">
      <h2 className="text-2xl lg:text-4xl text-stone-600">{goods}</h2>
      <h1 className="text-3xl lg:text-5xl font-semibold text-stone-600">
        {title}
      </h1>
      <Icon size={100} className="text-accent mb-2" aria-hidden="true" />
      <h1 className="text-gray-900">
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      </h1>
      <Article>{description}</Article>
    </div>
  );
};

export default ServiceCard;
