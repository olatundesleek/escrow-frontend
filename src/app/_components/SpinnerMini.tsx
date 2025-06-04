import { BiLoaderAlt } from 'react-icons/bi';

const SpinnerMini = ({ color = 'text-white' }: { color?: string }) => {
  return <BiLoaderAlt className={`w-6 h-6 animate-spin ${color}`} />;
};

export default SpinnerMini;
