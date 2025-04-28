import SectionalTitle from './SectionalTitle';
import ServiceCards from './ServiceCards';

export default function Services() {
  return (
    <div>
      <SectionalTitle
        title='Services'
        description='Safeguarding Your Transactions with Trust, Security, and Transparency'
        desSize='text-base lg:text-2xl'
      />
      <ServiceCards />
    </div>
  );
}
