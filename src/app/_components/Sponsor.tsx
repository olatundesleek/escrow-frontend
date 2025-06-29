import Marquee from "react-fast-marquee";
import SponsorImage from "./SponsorImages";
import { sponsors } from "../_constants/sponsors";

const Sponsor = () => {
  return (
    <section
      className="w-full bg-primary-section py-6 lg:py-10"
      aria-label="Our Sponsors"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-lg lg:text-2xl font-semibold text-secondary mb-4 tracking-wide uppercase">
          Trusted by Leading Brands
        </h2>
        <div className="w-full">
          <Marquee gradient={false} speed={100} pauseOnHover={true}>
            {sponsors.map((sponsor, i) => (
              <div key={i} className="mx-8 flex items-center">
                <SponsorImage image={sponsor.image} name={sponsor.name} />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Sponsor;
