import { HiOutlineSearch } from 'react-icons/hi';

export default function DashBboardSearchBar({
  value,
  //   onChange,
  placeholder = 'Search...',
  display = 'flex',
}: {
  value?: string;
  //   onChange?: (value: string) => void;
  placeholder?: string;
  display?: string;
}) {
  return (
    <form
      className={`border border-db-border bg-db-background rounded items-center gap-x-4 w-full max-w-96 px-5 focus-within:ring-1 focus-within:border-0 focus-within:ring-db-primary transition-colors duration-300 ${display}`}
    >
      <HiOutlineSearch fontSize='1.25rem' className='text-db-text-primary hover:cursor-pointer' />
      <input
        type='search'
        value={value}
        // onChange={(e) => onChange?(e.target.value)}
        className='w-full bg-transparent border-0 outline-0 text-db-text-primary'
        placeholder={placeholder}
      />
    </form>
  );
}
