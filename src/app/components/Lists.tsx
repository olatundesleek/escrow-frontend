import { FaPlus } from 'react-icons/fa';
import Article from './Article';

interface ListsProps {
  faq: {
    question: string;
    answer: string;
  };
  index: number;
  curOpen: number | null;
  setCurOpen: React.Dispatch<React.SetStateAction<number | null>>;
}

const Lists = ({ faq, index, curOpen, setCurOpen }: ListsProps) => {
  const isOpen = index === curOpen;

  const handleToggle = () => {
    setCurOpen(isOpen ? null : index);
  };

  return (
    <div key={index} className='lg:w-[35rem]'>
    <div key={index} className='lg:w-[35rem]'>
      <div
        className={`flex gap-4 items-center w-full   justify-between duration-300 cursor-pointer `}
        onClick={handleToggle}
      >
        <h1
          className={`text-base lg:text-xl max-w-4/5 lg:max-w-full  ${
            isOpen ? 'text-secondary' : 'text-gray-700'
          }`}
        >
          {faq.question}
        </h1>

        <button
          className={`rounded-full font-light w-10 h-10 flex items-center justify-center  ${
            isOpen ? 'bg-secondary text-white' : 'bg-green-100 text-secondary'
          } `}
          aria-label={isOpen ? 'Collapse' : 'Expand'}
          title={isOpen ? 'Collapse' : 'Expand'}
        >
          <FaPlus />
        </button>
      </div>
      <h1
        className={`text-xl  ${
          isOpen ? 'text-orange-500' : 'text-gray-300'
          isOpen ? 'text-orange-500' : 'text-gray-300'
        }  overflow-hidden  flex`}
      >
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        <span className='lg:flex hidden'>
          - - - - - - - - - - - - - - - - - - -
        </span>
      </h1>
      <div
        className={`grid transition-all duration-700 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        } overflow-hidden`}
      >
        <div className='overflow-hidden'>
        <div className='overflow-hidden'>
          <Article>{faq.answer}</Article>
        </div>
      </div>
    </div>
  );
};

export default Lists;
