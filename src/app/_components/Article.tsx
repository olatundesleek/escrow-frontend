import React from "react";

const Article = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="text-base lg:text-lg text-secondary">
      {children}
    </article>
  );
};

export default Article;
