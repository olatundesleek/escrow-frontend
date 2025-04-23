const HomeBannerSubtitle = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: string;
}) => {
  return (
    <div className='bg-transparent'>
      <h1
        className={`font-lexend ${style} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold outline-text`}
      >
        {children}
      </h1>
    </div>
  );
};

export default HomeBannerSubtitle;
