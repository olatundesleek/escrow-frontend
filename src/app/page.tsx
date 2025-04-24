import HomepageBanner from "./components/HomepageBanner";
import Subscribe from "./components/Subscribe";
import ServiceCards from "./components/ServiceCards";
import Faqs from "./components/Faqs";

const Home = () => {
  return (
    <main>
      <HomepageBanner />
      <Subscribe />
      <ServiceCards />
      <Faqs/>
    </main>
  );
};

export default Home;
