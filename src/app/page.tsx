import { Testimonial } from "./components/Testimonial";
import Features from "./components/Features";
import HomepageBanner from "./components/HomepageBanner";
import Section from "./components/Section";
import Workflow from "./components/Workflow";

const Home = () => {
  return (
    <main>
      <HomepageBanner />
      <Section>
        <Workflow />
        <Testimonial />
      </Section>
      <Section>
        <Features />
      </Section>
    </main>
  );
};

export default Home;
