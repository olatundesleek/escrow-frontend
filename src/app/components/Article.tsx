import React from "react";

const Article = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className='text-base lg:text-lg text-gray-600'>{children}</article>
  );
};

export default Article;
