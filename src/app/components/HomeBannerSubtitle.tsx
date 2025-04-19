const HomeBannerSubtitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-transparent'>
      <h1 className='font-lexend text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold outline-text'>
        {children}
      </h1>
    </div>
  );
};

export default HomeBannerSubtitle;
