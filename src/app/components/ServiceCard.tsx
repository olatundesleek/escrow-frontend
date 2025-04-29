import Image from "next/image";
import Article from "./Article";

interface ServiceCardProps {
  goods: string;
  title: string;
  image: string;
  description: string;
}

const ServiceCard = ({
  goods,
  title,
  image,
  description,
}: ServiceCardProps) => {
  return (
    <div className="flex flex-col gap-5 w-80 h-auto p-4 lg:p-8 justify-content text-center items-center bg-white border-1 border-gray-200 duration-100 hover:border-[#9af039] rounded-md">
      <h2 className="text-2xl lg:text-4xl text-stone-600">{goods}</h2>
      <h1 className="text-3xl lg:text-5xl font-semibold text-stone-600">
        {title}
      </h1>
      <Image src={image} alt={title} width={130} height={130} />
      <h1 className="text-secondary ">
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      </h1>
      <Article>{description}</Article>
    </div>
  );
};

export default ServiceCard;
