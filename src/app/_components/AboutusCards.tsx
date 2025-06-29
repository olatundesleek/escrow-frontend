import AboutusCard from "./AboutusCard";
import Image from "next/image";

const AboutusCards = () => {
  return (
    <section className="flex flex-col lg:flex-row lg:justify-between items-center gap-10 lg:gap-0 xl:p-32 px-4">
      <div className="flex flex-col gap-5">
        <AboutusCard
          image="/secure.png"
          title="Secure Transactions"
          description="Stay secure with advanced encryption and protection."
        />
        <AboutusCard
          image="/userfri.png"
          title="User Friendly Interface"
          description="Enjoy escrow protection that secures funds until all requirements are met."
        />
      </div>

      <div className="relative lg:w-[500px] lg:h-[500px] w-[300px] h-[300px] my-8 lg:my-0">
        <Image
          src="/agree.png"
          alt="Agreement illustration"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 300px, (max-width: 1200px) 500px, 300px"
        />
      </div>

      <div className="flex flex-col gap-5">
        <AboutusCard
          image="/protection.png"
          title="Escrow Protection"
          description="Enjoy escrow protection that secures funds until all requirements are met."
        />
        <AboutusCard
          image="/dispute.png"
          title="Dispute Resolution"
          description="Resolve disputes swiftly and fairly with our efficient resolution services."
        />
      </div>
    </section>
  );
};

export default AboutusCards;
