import Link from 'next/link';
import Button from './Button';
import SectionalTitle from './SectionalTitle';
import { FiArrowUpRight } from 'react-icons/fi';

export default function About() {
  return (
    <section>
      <div className='lg:flex lg:justify-evenly items-center m-3  text-start'>
        <SectionalTitle
          title='ABOUT US'
          description='Our Commitment to Transparency and Security in Payments'
          conAlignment='item-start'
          destextAlign='lg:text-start text-center'
          desSize='lg:text-2xl'
          style='lg:text-start text-center'
        />
        <Button
          color='bg-secondary text-white'
          textSize='text-xl'
          style='flex items-center gap-3'
        >
          <Link href={'/blog'} className='flex items-center gap-3'>
            Learn More <FiArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
