import StickyObserverBanner from "../../_components/StickyObserverBanner";
import PageBannerTitle from "../../_components/PageBannerTitle";
import ContentForm from "../../_components/ContentForm";
import Section from "../../_components/Section";

export default function Page() {
  return (
    <>
      <StickyObserverBanner>
        <PageBannerTitle>Contact Us</PageBannerTitle>
      </StickyObserverBanner>
      <Section>
        <ContentForm />
      </Section>
    </>
  );
}
