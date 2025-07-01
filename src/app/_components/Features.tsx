import Image from "next/image";
import SectionalTitle from "./SectionalTitle";
import Article from "./Article";
import HistoryCard from "./HistoryCard";
import Offers from "./Offers";

const Features = () => {
  return (
    <section className="w-full py-12" aria-label="Platform Features">
      <div className="xl:p-32 px-4 [&>div>header]:text-base md:[&>div>header]:text-lg lg:[&>div>header]:text-2xl">
        <SectionalTitle
          title="FEATURES"
          description="Unlock the Full Potential of Your Transactions with Confidence and Security"
        />

        <div className="lg:flex gap-8 mt-8 justify-center items-center">
          <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] mx-auto lg:mr-0">
            <Image
              src="/financial-security.png"
              alt="Platform features illustration"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="lg:w-[47%] mt-8 lg:mt-0">
            <Article>
              Discover the full spectrum of capabilities with our feature-rich
              platform, designed to elevate every aspect of your transactions.
              From robust security measures to seamless user experience
              enhancements, our platform offers a comprehensive suite of
              features tailored to meet your needs. Explore a world of secure,
              efficient transactions with our intuitive interface and innovative
              tools, ensuring peace of mind at every step of the way.
            </Article>

            <div className="lg:grid grid-cols-2 pt-5 gap-6">
              <div className="flex flex-col gap-3">
                <Offers title="Regulatory Compliance" />
                <Offers title="Integration Options" />
                <Offers title="Escrow Record Keeping" />
              </div>
              <div className="flex flex-col gap-3">
                <Offers title="Instant Notifications" color="text-orange-400" />
                <Offers title="Escrow Tracking" color="text-orange-400" />
                <Offers
                  title="Collaborative Workflows"
                  color="text-orange-400"
                />
              </div>
            </div>

            <div className="flex sm:flex-row gap-4 pt-5 w-full flex-col justify-center items-center">
              <HistoryCard image="/client.png" title="Clients" number="500+" />
              <HistoryCard
                image="/transaction.png"
                title="Transaction"
                number="10000+"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
