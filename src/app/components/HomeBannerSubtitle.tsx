const HomeBannerSubtitle = ({
  children,
  style = "lg:text-7xl",
}: {
  children: React.ReactNode;
  style?: string;
}) => {
  return (
    <div className="bg-transparent">
      <h1
        className={`font-lexend ${style} text-4xl sm:text-5xl md:text-6xl  font-bold outline-text`}
      >
        {children}
      </h1>
    </div>
  );
};

export default HomeBannerSubtitle;
