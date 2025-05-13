import ArticleCard from "./ArticleCard";
const Blogs = () => {
  return (
    <section className="flex flex-col gap-4  justify-center items-center">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 justify-center items-center">
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
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 justify-center items-center">
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
    </section>
  );
};

export default Blogs;
