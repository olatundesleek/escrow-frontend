"use client";

import HomeBannerSubtitle from "./HomeBannerSubtitle";
import Header from "./Header";

interface SectionalTitleProps {
  title: string;
  description: string;
  desSize?: string;
  style?: string;
  conAlignment?: string;
  destextAlign?: string;
  textColor?: string;
}

const SectionalTitle = ({
  title,
  description,
  desSize = "text-2xl",
  destextAlign = "text-center",
  style,
  conAlignment = "items-center",
  textColor,
}: SectionalTitleProps) => {
  return (
    <header className={`flex flex-col gap-6 justify-center ${conAlignment}`}>
      <HomeBannerSubtitle style={style}>{title}</HomeBannerSubtitle>
      <Header
        textSize={`${desSize} ${destextAlign} w-[22rem] lg:w-[45rem] ${textColor}`}
      >
        {description}
      </Header>
    </header>
  );
};

export default SectionalTitle;
