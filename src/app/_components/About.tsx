import Link from "next/link";
import Button from "./Button";
import SectionalTitle from "./SectionalTitle";
import { FiArrowUpRight } from "react-icons/fi";
import AboutusCards from "./AboutusCards";

export default function About() {
  return (
    <section className="w-full bg-primary-section py-12" aria-label="About Us">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-6 xl:px-32 px-4 mb-10">
        <SectionalTitle
          title="ABOUT US"
          description="Our Commitment to Transparency and Security in Payments"
          conAlignment="lg:items-start items-center"
          destextAlign="lg:text-start text-center"
          desSize="lg:text-2xl"
          style="lg:text-start text-center"
        />
        <Link href="/blog" passHref legacyBehavior>
          <Button
            color="bg-secondary text-white"
            textSize="text-xl"
            style="flex items-center gap-3"
            aria-label="Learn more about us"
          >
            Learn More <FiArrowUpRight />
          </Button>
        </Link>
      </div>
      <AboutusCards />
    </section>
  );
}
