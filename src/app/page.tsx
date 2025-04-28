<<<<<<< HEAD
import { Testimonial } from "./components/Testimonial";
import Features from "./components/Features";
import HomepageBanner from "./components/HomepageBanner";
import Section from "./components/Section";
import Workflow from "./components/Workflow";
=======
import HomepageBanner from './components/HomepageBanner';
import Section from './components/Section';
import Workflow from './components/Workflow';
import Features from './components/Features';
import Faqs from './components/Faqs';
import Subscribe from './components/Subscribe';
import Services from './components/Services';
>>>>>>> e668c979cb6836b99baa02d38596ecddfb60efe0

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
