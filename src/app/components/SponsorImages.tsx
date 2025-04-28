import Image from "next/image";
interface SponsorImagesProps {
  image: string;
  name: string;
}

const SponsorImages = ({ image, name }: SponsorImagesProps) => {
  return (
    <div className="relative w-full h-32 md:h-48 lg:h-64 xl:h-80 2xl:h-96">
      <Image src={image} alt={name} fill />
    </div>
  );
};

export default SponsorImages;
