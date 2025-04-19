import Image from "next/image";
import SectionalTitle from "./SectionalTitle";
import Article from "./Article";
import HistoryCard from "./HistoryCard";
import Offers from "./Offers";

const Features = () => {
  return (
    <section>
      <div className="flex flex-col lg:w-[40rem] m-3">
        <SectionalTitle
          title="Features"
          description="Unlock the Full Potential of Your Transactions with Confidence and Security"
        />
      </div>

      <div>
        <Image
          src="/confidence.png"
          alt="features section"
          width={400}
          height={400}
        />

        <div>
          <Article>
            Discover the full spectrum of capabilities with our feature-rich
            platform, designed to elevate every aspect of your transactions.
            From robust security measures to seamless user experience
            enhancements, our platform offers a comprehensive suite of features
            tailored to meet your needs. Explore a world of secure, efficient
            transactions with our intuitive interface and innovative tools,
            ensuring peace of mind at every step of the way.
          </Article>

          <div className="grid grid-cols-2">
            <div>
              <Offers title="Regulatory Compliance" />
              <Offers title="Integration Options" />
              <Offers title="Escrow Record Keeping" />
            </div>

            <div>
              <Offers title="Instant Notifications" color="text-orange-400" />
              <Offers title="Escrow Tracking" color="text-orange-400" />
              <Offers title="Collaborative Workflows" color="text-orange-400" />
            </div>
          </div>

          <HistoryCard image="/client.png" title="Clients" number="10k+"/>
        </div>
      </div>
    </section>
  );
};

export default Features;
