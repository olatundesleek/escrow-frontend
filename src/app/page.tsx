import Features from './components/Features';
import HomepageBanner from './components/HomepageBanner';
import Section from './components/Section';
import Workflow from './components/Workflow';

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
    </main>
  );
};

export default Home;
