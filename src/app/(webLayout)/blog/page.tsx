import StickyObserverBanner from "../../_components/StickyObserverBanner";
import PageBannerTitle from "../../_components/PageBannerTitle";
import Blogs from "../../_components/Blogs";
import Section from "../../_components/Section";

export default function Page() {
  return (
    <>
      <StickyObserverBanner>
        <PageBannerTitle>Latest Article</PageBannerTitle>
      </StickyObserverBanner>

      <Section>
        <Blogs />
      </Section>
    </>
  );
}
