export default function PageBanner({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%,_#000000,_#000000_50%,_#061207_75%,_#001204_75%)] z-0" />

      <div className="relative z-10 w-full px-4 py-16 lg:py-32 flex justify-center items-center text-center">
        {children}
      </div>
    </div>
  );
}
