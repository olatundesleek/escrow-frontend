import React from "react";

const Article = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="text-base lg:text-lg text-gray-700 leading-relaxed">
      {children}
    </article>
  );
};

export default Article;
