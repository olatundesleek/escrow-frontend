import Image from "next/image";
interface SponsorImagesProps {
  image: string;
  name: string;
}

const SponsorImages = ({ image, name }: SponsorImagesProps) => {
  return (
    <div className='relative w-[100px] h-[100px] sm:w-[40px] sm:h-[40px] md:w-[70px] md:h-[70px] lg:w-[150px] lg:h-[150px] mx-10'>
      <Image src={image} alt={name} fill className='object-contain' />
    </div>
  );
};

export default SponsorImages;
