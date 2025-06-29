export const FooterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="container flex flex-col gap-2">
    <h2 className="text-2xl font-bold w-full flex flex-col gap-2 mb-2 text-secondary">
      {title} <span className="w-10 bg-secondary h-1"></span>
    </h2>
    {children}
  </div>
);
