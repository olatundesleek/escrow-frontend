import Image from 'next/image';
import Header from './Header';
import Article from './Article';
import { HiCalendarDateRange } from 'react-icons/hi2';

interface ArticleCardProps {
  title: string;
  description: string;
  image: string;
}
const ArticleCard = ({ title, image, description }: ArticleCardProps) => {
  // Can be replaced with a more dynamic date fetching method when getting from backend
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div className='flex flex-col gap-6  h-auto w-80  border border-gray-300 hover:border-[#9af039] duration-500 bg-[#FAFAFF] rounded-lg p-7 m-3'>
      <Image
        src={image}
        alt={title}
        width={500}
        height={500}
        className='rounded-lg w-full  object-cover'
      />

      <div className='flex  gap-4 items-center justify-start w-50 p-2 rounded-4xl bg-orange-400 text-white'>
        <HiCalendarDateRange className='text-2xl' />
        <p>{formattedDate}</p>
      </div>

      <Header>{title}</Header>
      <div className='w-full h-[1px] bg-gray-300'></div>
      <Article>{description}</Article>
    </div>
  );
};

export default ArticleCard;
