import PageBanner from "../components/PageBanner";
import PageBannerTitle from "../components/PageBannerTitle";
import Login from "../components/Login";

export default function Page() {
  return (
    <>
      <PageBanner>
        <PageBannerTitle>About Us</PageBannerTitle>
      </PageBanner>
      <Login />
    </>
  );
}
