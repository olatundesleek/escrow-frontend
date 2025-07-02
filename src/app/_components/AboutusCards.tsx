import AboutusCard from "./AboutusCard";
const video1 = "/vid/payment.mp4";
const video2 = "/vid/follow.mp4";
const video3 = "/vid/data-safety.mp4";
const video4 = "/vid/conversation.mp4";
import { HandShakeShieldIcon } from "./HandShakeSheildIcon";

const AboutusCards = () => {
  return (
    <section className="flex flex-col lg:flex-row lg:justify-between items-center gap-10 lg:gap-0 xl:p-32 px-4">
      <div className="flex flex-col gap-5">
        <AboutusCard
          video={video1}
          title="Secure Transactions"
          description="Stay secure with advanced encryption and protection."
        />
        <AboutusCard
          video={video2}
          title="User Friendly Interface"
          description="Enjoy escrow protection that secures funds until all requirements are met."
        />
      </div>

      <HandShakeShieldIcon />

      <div className="flex flex-col gap-5">
        <AboutusCard
          video={video3}
          title="Escrow Protection"
          description="Enjoy escrow protection that secures funds until all requirements are met."
        />
        <AboutusCard
          video={video4}
          title="Dispute Resolution"
          description="Resolve disputes swiftly and fairly with our efficient resolution services."
        />
      </div>
    </section>
  );
};

export default AboutusCards;
