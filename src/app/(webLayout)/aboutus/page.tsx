import StickyObserverBanner from "../../_components/StickyObserverBanner";
import Article from "../../_components/Article";
import PageBannerTitle from "../../_components/PageBannerTitle";
import Section from "../../_components/Section";
import AboutusCards from "../../_components/AboutusCards";
import Vision from "../../_components/Vision";
import Faqs from "../../_components/Faqs";
import { Testimonial } from "../../_components/Testimonial";

export default function Page() {
  return (
    <>
      <StickyObserverBanner>
        <PageBannerTitle>About Us</PageBannerTitle>
      </StickyObserverBanner>

      

      <div className="lg:mx-25 mt-15 mx-4">
        <Article>
          Celebrate peace of mind in every transaction with our trusted escrow
          platform. We understand the importance of trust and security in
          financial transactions. Backed by years of experience, our reliable
          escrow service safeguards your funds and ensures smooth, secure
          transactions. With a seamless user experience, our platform enables
          buyers and sellers to transact confidently. Whether you&apos;re
          dealing with real estate, vehicles, high-value items, or business
          transactions, our escrow services provide a secure and transparent way
          to exchange funds.
        </Article>
      </div>

      <Section>
        <AboutusCards />
      </Section>

      <Section>
        <Vision />
      </Section>

      <Section>
        <Testimonial />
      </Section>

      <Section>
        <Faqs />
      </Section>
    </>
  );
}
