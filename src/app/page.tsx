import HomepageBanner from "./components/HomepageBanner";
import Section from "./components/Section";
import Workflow from "./components/Workflow";
import Features from "./components/Features";
import Faqs from "./components/Faqs";
import Subscribe from "./components/Subscribe";
import Services from "./components/Services";
import { Testimonial } from "./components/Testimonial";

const Home = () => {
  return (
    <>
      <HomepageBanner />
      <Section>
        <Workflow />
        <Testimonial />
      </Section>
      <Section>
        <Features />
      </Section>
      <Section>
        <Subscribe />
      </Section>
      <Section>
        <Services />
      </Section>
      <Section>
        <Faqs />
      </Section>
    </>
  );
};

export default Home;
