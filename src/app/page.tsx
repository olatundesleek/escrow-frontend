import HomepageBanner from "./components/HomepageBanner";
import Subscribe from "./components/Subscribe";
import ServiceCards from "./components/ServiceCards";

const Home = () => {
  return (
    <main>
      <HomepageBanner />
      <Subscribe />
      <ServiceCards
        title="Harmony"
        goods="Home"
        image="/house.png"
        description="Facilitate secure real estate transactions with ease and confidence using our platform."
      />
    </main>
  );
};

export default Home;
