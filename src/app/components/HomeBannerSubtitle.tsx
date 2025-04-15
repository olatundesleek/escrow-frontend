const HomeBannerSubtitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-stone-900'>
      <h1 className='font-lexend text-8xl font-bold outline-text'>
        {children}
      </h1>
    </div>
  );
};

export default HomeBannerSubtitle;
