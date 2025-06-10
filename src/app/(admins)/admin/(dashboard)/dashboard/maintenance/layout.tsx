type TLayout = {
  children: React.ReactNode;
};

const Layout = ({ children }: TLayout) => {
  return <div>{children}</div>;
};

export default Layout;
