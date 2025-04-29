import Image from 'next/image';
import Header from './Header';
import Article from './Article';

interface WorkflowCardProps {
  style?: string;
  border?: string;
  image: string;
  number: string;
  title: string;
  description: string;
  align?: 'end' | 'start';
}

interface WorkflowCardProps {
  style?: string;
  border?: string;
  image: string;
  number: string;
  title: string;
  description: string;
  align?: 'end' | 'start';
}

const WorkflowCard = ({
  style,
  border = 'border-r-1',
  image,
  number,
  title,
  description,
  align = 'start',
}: WorkflowCardProps) => {
  return (
    <section
      className={`h-full sticky transparent ${
        align === 'end' ? 'place-self-end' : 'place-self-start'
      }`}
      style={{ top: 'var(--navbar-height)' }}
    >
      <div
        className={`w-full lg:flex lg:m-3 gap-10 lg:w-[60rem] ${style} lg:p-10 p-5 items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-4xl w-full`}
      >
        <div className='relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px]'>
          <Image
            src={image}
            alt='Workflow Image'
            fill
            className={`object-contain ${border} p-7 border-gray-200`}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <div className='w-full flex flex-col gap-5  lg:w-[55%]'>
          <h1 className='bg-secondary w-10 h-10 rounded-sm font-bold shadow-[5px_5px_0px_0px_hsl(35,85%,60%)] flex justify-center items-center text-2xl text-white'>
            {number}
          </h1>
          <Header textSize='lg:text-3xl text-base md:text-lg'>{title}</Header>
          <Article>{description}</Article>
        </div>
      </div>
    </section>
  );
};

export default WorkflowCard;
