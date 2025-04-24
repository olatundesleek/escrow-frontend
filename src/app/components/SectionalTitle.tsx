// import PageBannerTitle from "./PageBannerTitle";
import HomeBannerSubtitle from "./HomeBannerSubtitle";
import Header from "./Header";

interface SectionalTitleProps {
  title: string;
  description: string;
  desSize?: string;
  style?: string;
}
const SectionalTitle = ({
  title,
  description,
  desSize = "text-2xl",
  style
}: SectionalTitleProps) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center ">
      <HomeBannerSubtitle style={style}>{title}</HomeBannerSubtitle>
      <Header
        textSize={`mg:text-lg ${desSize} w-[22rem] text-center lg:w-[45rem]`}
      >
        {description}
      </Header>
    </div>
  );
};

export default SectionalTitle;
