import SectionalTitle from "./SectionalTitle";
import Button from "./Button";
import ArticleCard from "./ArticleCard";
import { FiArrowUpRight } from "react-icons/fi";

const BlogArticle = () => {
  return (
    <section>
      <div className="lg:flex lg:justify-evenly items-center m-3  text-start">
        <SectionalTitle
          title="ARTICLES"
          description="Explore Our Latest Blog Articles for Insights and Updates"
          conAlignment="item-start"
          destextAlign="lg:text-start text-center"
          desSize="lg:text-2xl"
          style="lg:text-start text-center"
        />
        <Button
          color="bg-secondary text-white"
          textSize="text-xl"
          style="flex items-center gap-3"
        >
          View All Blog <FiArrowUpRight />
        </Button>
      </div>

      <div>
        <ArticleCard image="/" title="Top Benefits of Using Escrow for Business Dea..." description=""/>
      </div>
    </section>
  );
};

export default BlogArticle;
