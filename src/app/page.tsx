import Features from './components/Features';
import HomepageBanner from './components/HomepageBanner';
import Workflow from './components/Workflow';

const Home = () => {
  return (
    <main>
      <HomepageBanner />
      <Workflow />
      <Features />
    </main>
  );
};

export default Home;
