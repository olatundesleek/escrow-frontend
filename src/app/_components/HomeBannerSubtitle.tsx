const HomeBannerSubtitle = ({
  children,
  style = "lg:text-7xl",
}: {
  children: React.ReactNode;
  style?: string;
}) => {
  return (
    <h2
      className={`bg-transparent font-lexend ${style} text-4xl sm:text-5xl md:text-6xl font-bold outline-text`}
    >
      {children}
    </h2>
  );
};

export default HomeBannerSubtitle;
