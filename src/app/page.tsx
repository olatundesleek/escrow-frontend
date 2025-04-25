import HomepageBanner from "./components/HomepageBanner";
import Subscribe from "./components/Subscribe";
import ServiceCards from "./components/ServiceCards";
import Faqs from "./components/Faqs";
import BlogArticle from "./components/BlogArticle";

const Home = () => {
  return (
    <main>
      <HomepageBanner />
      <Subscribe />
      <ServiceCards />
      <Faqs />
      <BlogArticle/>
    </main>
  );
};

export default Home;
