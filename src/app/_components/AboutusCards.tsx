import AboutusCard from "./AboutusCard";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaUserShield, FaIdCard, FaBalanceScale } from "react-icons/fa";
import { HandShakeShieldIcon } from "./HandShakeSheildIcon";

const AboutusCards = () => {
  return (
    <section className="flex flex-col lg:flex-row lg:justify-between items-center gap-10 lg:gap-0 xl:p-32 px-4">
      <div className="flex flex-col gap-5">
        <AboutusCard
          Icon={RiSecurePaymentFill}
          title="Secure Transactions"
          description="Stay secure with advanced encryption and protection."
        />
        <AboutusCard
          Icon={FaIdCard}
          title="User Friendly Interface"
          description="Enjoy escrow protection that secures funds until all requirements are met."
        />
      </div>

      <HandShakeShieldIcon />

      <div className="flex flex-col gap-5">
        <AboutusCard
          Icon={FaUserShield}
          title="Escrow Protection"
          description="Enjoy escrow protection that secures funds until all requirements are met."
        />
        <AboutusCard
          Icon={FaBalanceScale}
          title="Dispute Resolution"
          description="Resolve disputes swiftly and fairly with our efficient resolution services."
        />
      </div>
    </section>
  );
};

export default AboutusCards;
