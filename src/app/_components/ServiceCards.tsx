import { services } from '../constants/services';
import ServiceCard from './ServiceCard';
const ServiceCards = () => {
  return (
    <div className='flex flex-col gap-7 items-center justify-center mt-10'>
      <div className='lg:grid lg:grid-cols-3 gap-6 flex flex-col'>
        {services.map((service, i) => (
          <div key={i} className={i === 3 ? 'col-start-2 row-start-2' : ''}>
            <ServiceCard
              title={service.title}
              goods={service.goods}
              image={service.image}
              description={service.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;


//className={i === 3 ? 'col-start-2 row-start-2' : '' }
