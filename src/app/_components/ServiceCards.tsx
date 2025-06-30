import { services } from "../_constants/services";
import ServiceCard from "./ServiceCard";

const ServiceCards = () => {
  return (
    <section
      className="w-full bg-primary-section py-12"
      aria-label="Our Services"
    >
      <div className="flex flex-col gap-10 items-center justify-center px-4">
        <ul className="w-full flex flex-wrap justify-center gap-8">
          {services.map(({ title, goods, Icon, description }, i) => (
            <li key={i} className="flex-shrink-0">
              <ServiceCard
                title={title}
                goods={goods}
                Icon={Icon}
                description={description}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServiceCards;
