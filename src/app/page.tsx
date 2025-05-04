import HomepageBanner from './components/HomepageBanner';
import Section from './components/Section';
import Workflow from './components/Workflow';
import Features from './components/Features';
import Faqs from './components/Faqs';
import Subscribe from './components/Subscribe';
import Services from './components/Services';
import { Testimonial } from './components/Testimonial';
import Sponsor from './components/Sponsor';
import BlogArticle from './components/BlogArticle';
import About from './components/About';

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
      <Section style='mb-0 lg:mb-0 lg:mt-40'>
        <Sponsor />
      </Section>
    </>
  );
};

export default Home;
