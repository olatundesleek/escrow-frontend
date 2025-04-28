import HomepageBanner from './components/HomepageBanner';
import Section from './components/Section';
import Workflow from './components/Workflow';
import Features from './components/Features';
import Faqs from './components/Faqs';
import Subscribe from './components/Subscribe';
import ServiceCards from './components/ServiceCards';
import Services from './components/Services';

const Home = () => {
  return (
    <main>
      <HomepageBanner />
      <Section>
        <Workflow />
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
    </main>
  );
};

export default Home;
