import PageBannerTitle from "./PageBannerTitle";
import Header from "./Header";

interface SectionalTitleProps {
  title: string;
  description: string;
}
const SectionalTitle = ({ title, description }: SectionalTitleProps) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center m-3 pb-5">
      <PageBannerTitle>{title}</PageBannerTitle>
      <Header textSize="mg:text-lg text-2xl text-center lg:w-[40rem]">
        {description}
      </Header>
    </div>
  );
};

export default SectionalTitle;
