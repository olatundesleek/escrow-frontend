import PageBanner from "../components/PageBanner";
import Article from "../components/Article";
import PageBannerTitle from "../components/PageBannerTitle";
import Section from "../components/Section";
import AboutusCards from "../components/AboutusCards";
import Vision from "../components/Vision";
import Faqs from "../components/Faqs";
import { Testimonial } from "../components/Testimonial";
import AppLayout from '../layout/layout';

export default function Page() {
  return (
    <AppLayout>
      <PageBanner>
        <PageBannerTitle>About Us</PageBannerTitle>
      </PageBanner>

      <div className='lg:mx-25 mt-15 mx-4'>
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
    </AppLayout>
  );
}
