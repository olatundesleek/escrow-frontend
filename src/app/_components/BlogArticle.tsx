import SectionalTitle from "./SectionalTitle";
import Button from "./Button";
import ArticleCard from "./ArticleCard";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

const BlogArticle = () => {
  return (
    <section
      className="w-full bg-primary-section py-12"
      aria-label="Latest Blog Articles"
    >
      <div className="xl:px-32 px-4">
        <header className="flex flex-col lg:flex-row lg:justify-between items-center mb-8 gap-4">
          <SectionalTitle
            title="ARTICLES"
            description="Explore Our Latest Blog Articles for Insights and Updates"
            conAlignment="lg:items-start items-center"
            destextAlign="lg:text-start text-center"
            desSize="lg:text-2xl"
            style="lg:text-start text-center"
          />
          <Link href="/blog" passHref legacyBehavior>
            <Button
              color="bg-secondary text-white"
              textSize="text-xl"
              style="flex items-center gap-3"
              aria-label="View all blog articles"
            >
              View All Blog <FiArrowUpRight />
            </Button>
          </Link>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row justify-center lg:justify-between items-center">
          <ArticleCard
            image="/pay.png"
            title="Top Benefits of Using Escrow for Business Dea..."
            description="In today's fast-paced world, freelancing has emerged as a popular choice for many professionals seeking flexibility, aut..."
          />
          <ArticleCard
            image="/password.png"
            title="How Escrow Services Build Trust in High-Value..."
            description="In today's fast-paced world, freelancing has emerged as a popular choice for many professionals seeking flexibility, aut..."
          />
          <ArticleCard
            image="/tips.png"
            title="5 Tips to Ensure Secure Online Transactions i..."
            description="In today's fast-paced world, freelancing has emerged as a popular choice for many professionals seeking flexibility, aut..."
          />
        </div>
      </div>
    </section>
  );
};

export default BlogArticle;
