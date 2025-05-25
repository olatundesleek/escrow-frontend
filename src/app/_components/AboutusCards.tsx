import AboutusCard from "./AboutusCard";
import Image from "next/image";

const AboutusCards = () => {
  return (
    <section className='lg:flex lg:justify-between lg:place-items-center lg:mx-25 mx-4 '>
      <div className='flex flex-col gap-5'>
        <AboutusCard
          image='/secure.png'
          title='Secure Transactions'
          description='Stay secure with advanced encryption and protection.'
        />
        <AboutusCard
          image='/userfri.png'
          title='User friendly interface'
          description='Enjoy escrow protection that secures funds until all requirements are met.'
        />
      </div>

      <div className='relative lg:w-[600px] lg:h-[600px] w-[300px] h-[300px] '>
        <Image
          src='/agree.png'
          alt='agree'
          fill
          className='object-contain'
          sizes='(max-width: 768px) 300px, (max-width: 1200px) 600px, 300px'
        />
      </div>

      <div className='flex flex-col gap-5'>
        <AboutusCard
          image='/protection.png'
          title='Escrow Protection'
          description='Enjoy escrow protection that secures funds until all requirements are met.'
        />
        <AboutusCard
          image='/dispute.png'
          title='Dispute Resolution'
          description='Resolve disputes swiftly and fairly with our efficient resolution services.'
        />
      </div>
    </section>
  );
};

export default AboutusCards;
