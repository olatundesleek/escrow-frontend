<<<<<<< HEAD
import HomepageBanner from "./components/HomepageBanner";
import { Testimonial } from "./components/Testimonial";
=======
import Features from './components/Features';
import HomepageBanner from './components/HomepageBanner';
import Section from './components/Section';
import Workflow from './components/Workflow';
>>>>>>> 2367ccc4e9d931421a4f1e00db8ce50dac491cfe

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
