import Image from "next/image";
import SectionalTitle from "./SectionalTitle";
import Article from "./Article";
import HistoryCard from "./HistoryCard";
import Offers from "./Offers";

const Features = () => {
  return (
    <section>
      <SectionalTitle
        title="FEATURES"
        description="Unlock the Full Potential of Your Transactions with Confidence and Security"
      />

      <div className="lg:flex gap-4 m-3 justify-center">
        <Image
          src="/confidence.png"
          alt="features section"
          width={450}
          height={450}
        />

        <div className="lg:w-[47%]">
          <Article>
            Discover the full spectrum of capabilities with our feature-rich
            platform, designed to elevate every aspect of your transactions.
            From robust security measures to seamless user experience
            enhancements, our platform offers a comprehensive suite of features
            tailored to meet your needs. Explore a world of secure, efficient
            transactions with our intuitive interface and innovative tools,
            ensuring peace of mind at every step of the way.
          </Article>

          <div className="lg:grid grid-cols-2  pt-5">
            <div className="flex flex-col gap-3">
              <Offers title="Regulatory Compliance" />
              <Offers title="Integration Options" />
              <Offers title="Escrow Record Keeping" />
            </div>

            <div className="flex flex-col gap-3">
              <Offers title="Instant Notifications" color="text-orange-400" />
              <Offers title="Escrow Tracking" color="text-orange-400" />
              <Offers title="Collaborative Workflows" color="text-orange-400" />
            </div>
          </div>

          <div className="lg:flex gap-4 pt-5">
            <HistoryCard image="/client.png" title="Clients" number="500+" />
            <HistoryCard
              image="/transaction.png"
              title="Transaction"
              number="10k+"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
