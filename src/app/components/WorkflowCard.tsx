import Image from "next/image";
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

const WorkflowCard = ({
  style,
  border = 'border-r-1',
  image,
  number,
  title,
  description,
  align = 'start',
}: WorkflowCardProps) => {
  // console.log(style);
  return (
    <section
      className={`h-full sticky transparent ${
        align === 'end' ? 'place-self-end' : 'place-self-start'
      } `}
      style={{ top: 'var(--navbar-height)' }}
    >
      <div
        className={`lg:flex m-3 gap-10 lg:w-[60rem] ${style} lg:p-10 p-5 items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-4xl w-full`}
      >
        <Image
          src={image}
          width='300'
          height='300'
          alt='Workflow Image'
          className={`lg:${border} p-7 border-gray-200`}
        />
        <div className='flex flex-col gap-5  lg:w-[55%]'>
          <h1 className='bg-secondary w-10 h-10 rounded-sm font-bold shadow-[5px_5px_0px_0px_hsl(35,85%,60%)] flex justify-center items-center text-2xl text-white'>
            {number}
          </h1>
          <Header textSize='text-3xl'>{title}</Header>
          <Article>{description}</Article>
        </div>
      </div>
    </section>
  );
};

export default WorkflowCard;
