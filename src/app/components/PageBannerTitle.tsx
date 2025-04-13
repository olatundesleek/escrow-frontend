import { ReactNode } from "react";

const PageBannerTitle = ({children}:{children:ReactNode}) => {
  return (
    <h1 className="">
      {children}
    </h1>
  );
};

export default PageBannerTitle;