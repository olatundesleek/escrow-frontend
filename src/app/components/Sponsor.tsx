import Marquee from "react-fast-marquee";
import SponsorImages from "./SponsorImages";

const Sponsor = () => {
  return (
    <section className="w-full bg-[#F9F9F9] py-8">
      <div className="flex justify-center items-center w-[80%] mx-auto">
        <Marquee gradient={false} speed={200}>
          <SponsorImages image="/digicom.png" name="sponsor 1" />
          <SponsorImages image="/companyname.png" name="sponsor 2" />
          <SponsorImages image="/designele.png" name="sponsor 3" />
          <SponsorImages image="/heronly.png" name="sponsor 4" />
          <SponsorImages image="/welling.png" name="sponsor 5" />
          <SponsorImages image="/capital.png" name="sponsor 6" />
        </Marquee>
      </div>
    </section>
  );
};

export default Sponsor;
