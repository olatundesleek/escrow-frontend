import Marquee from "react-fast-marquee";
import SponsorImage from "./SponsorImages";

const Sponsor = () => {
  return (
    <section className="w-full bg-[#F9F9F9] py-8">
      <div className="flex justify-center items-center w-[80%] mx-auto">
        <Marquee gradient={false} speed={200}>
          <SponsorImage image="/digicom.png" name="sponsor 1" />
          <SponsorImage image="/companyname.png" name="sponsor 2" />
          <SponsorImage image="/designele.png" name="sponsor 3" />
          <SponsorImage image="/heronly.png" name="sponsor 4" />
          <SponsorImage image="/welling.png" name="sponsor 5" />
          <SponsorImage image="/capital.png" name="sponsor 6" />
        </Marquee>
      </div>
    </section>
  );
};

export default Sponsor;
