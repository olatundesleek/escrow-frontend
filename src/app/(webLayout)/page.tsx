import HomepageBanner from "../_components/HomepageBanner";
import Section from "../_components/Section";
import Workflow from "../_components/Workflow";
import Features from "../_components/Features";
import Faqs from "../_components/Faqs";
import Subscribe from "../_components/Subscribe";
import Services from "../_components/Services";
import { Testimonial } from "../_components/Testimonial";
import Sponsor from "../_components/Sponsor";
import BlogArticle from "../_components/BlogArticle";
import About from "../_components/About";

const Home = () => {
  return (
    <>
      <HomepageBanner />
      <Section>
        <About />
      </Section>
      <Section>
        <Workflow />
      </Section>
      <Section>
        <Features />
      </Section>
      <Section>
        <Services />
      </Section>
      <Section>
        <Faqs />
      </Section>
      <Section>
        <Testimonial />
      </Section>
      <Section>
        <BlogArticle />
      </Section>
      <Section>
        <Subscribe />
      </Section>
      <Section>
        <Sponsor />
      </Section>
    </>
  );
};

export default Home;
