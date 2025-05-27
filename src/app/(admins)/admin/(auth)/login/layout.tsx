import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: 'normal',
  subsets: ['latin'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={`${openSans.className} bg-[url(/images/adminloginbg.png)] w-full h-screen bg-cover overflow-auto bg-no-repeat flex justify-center items-center lg:bg-left bg-top px-4`}
    >
      {children}
    </section>
  );
}
