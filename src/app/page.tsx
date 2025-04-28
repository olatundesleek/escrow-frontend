import HomepageBanner from './components/HomepageBanner';
import Section from './components/Section';
import Workflow from './components/Workflow';
import Features from './components/Features';
import Faqs from './components/Faqs';

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
        <Faqs />
      </Section>
    </main>
  );
};

export default Home;
