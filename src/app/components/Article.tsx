import React from "react";

const Article = ({ children }: { children: React.ReactNode }) => {
  return <article className="text-lg text-gray-700">{children}</article>;
};

export default Article;
