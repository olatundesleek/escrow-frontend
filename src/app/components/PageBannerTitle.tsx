import { ReactNode } from "react";

const PageBannerTitle = ({children}:{children:ReactNode}) => {
  return (
<div className="bg-stone-900">
    <h1 className="text-7xl font-bold outline-text-title">
      {children}
    </h1>
</div>
  );
};

export default PageBannerTitle;