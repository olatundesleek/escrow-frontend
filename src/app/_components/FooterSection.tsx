export const FooterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="flex flex-col gap-3 min-w-[180px]">
    <h2 className="text-xl font-semibold flex items-center gap-3 text-secondary mb-1">
      <span>{title}</span>
      <span className="flex-1 h-0.5 bg-accent rounded-full max-w-[40px]" />
    </h2>
    <div>{children}</div>
  </section>
);
