import Marquee from 'react-fast-marquee';
import SponsorImage from './SponsorImages';
import { sponsors } from '../constants/sponsors';

const Sponsor = () => {
  return (
    <section className='w-full bg-primary-section lg:py-8 py-4'>
      <div className='flex justify-center items-center w-[80%] mx-auto'>
        <Marquee gradient={false} speed={200}>
          {sponsors.map((sponsor, i) => (
            <SponsorImage image={sponsor.image} name={sponsor.name} key={i} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Sponsor;
