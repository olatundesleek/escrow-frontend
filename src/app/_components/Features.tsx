import Image from "next/image";
import SectionalTitle from "./SectionalTitle";
import Article from "./Article";
import HistoryCard from "./HistoryCard";
import Offers from "./Offers";

const Features = () => {
  return (
    <section className='[&>div>header]:text-base md:[&>div>header]:text-lg lg:[&>div>header]:text-2xl'>
      <SectionalTitle
        title='FEATURES'
        description='Unlock the Full Potential of Your Transactions with Confidence and Security'
      />

      <div className='lg:flex gap-4 m-3 lg:mt-12 justify-center'>
        <div className='relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] mx-auto lg:mr-0 lg:ml-0'>
          <Image
            src='/confidence.png'
            alt='features section'
            fill
            className='object-contain'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>

        <div className='lg:w-[47%]'>
          <Article>
            Discover the full spectrum of capabilities with our feature-rich
            platform, designed to elevate every aspect of your transactions.
            From robust security measures to seamless user experience
            enhancements, our platform offers a comprehensive suite of features
            tailored to meet your needs. Explore a world of secure, efficient
            transactions with our intuitive interface and innovative tools,
            ensuring peace of mind at every step of the way.
          </Article>

          <div className='lg:grid grid-cols-2  pt-5'>
            <div className='flex flex-col gap-3'>
              <Offers title='Regulatory Compliance' />
              <Offers title='Integration Options' />
              <Offers title='Escrow Record Keeping' />
            </div>

            <div className='flex flex-col gap-3'>
              <Offers title='Instant Notifications' color='text-orange-400' />
              <Offers title='Escrow Tracking' color='text-orange-400' />
              <Offers title='Collaborative Workflows' color='text-orange-400' />
            </div>
          </div>

          <div className='lg:flex gap-4 pt-5'>
            <HistoryCard image='/client.png' title='Clients' number='500+' />
            <HistoryCard
              image='/transaction.png'
              title='Transaction'
              number='10k+'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
