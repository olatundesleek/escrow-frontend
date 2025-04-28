import ServiceCard from "./ServiceCard";
const ServiceCards = () => {
  return (
    <div className="flex flex-col gap-7 items-center justify-center mt-10">
      <div className="lg:grid lg:grid-cols-3 gap-6 flex flex-col">
        <ServiceCard
          title="Harmony"
          goods="Home"
          image="/house.png"
          description="Facilitate secure real estate transactions with ease and confidence using our platform."
        />
        <ServiceCard
          title="Vehicle"
          goods="Ease"
          image="/car.png"
          description="Ensure smooth and secure vehicle transactions, whether buying or selling."
        />
        <ServiceCard
          title="Precious"
          goods="Items"
          image="/item.png"
          description="Safeguard valuable assets such as jewelry, artwork, or collectibles with our secure platform."
        />
      </div>
      <ServiceCard
        title="Business"
        goods="Transfer"
        image="/transfer.png"
        description="Streamline the transfer of business assets or intellectual property securely and efficiently."
      />
    </div>
  );
};

export default ServiceCards;
