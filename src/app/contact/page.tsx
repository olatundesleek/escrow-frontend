import PageBanner from "../components/PageBanner";
import PageBannerTitle from "../components/PageBannerTitle";
import ContentForm from "../components/ContentForm";
import Section from "../components/Section";

export default function Page() {
  return (
    <>
      <PageBanner>
        <PageBannerTitle>Contact Us</PageBannerTitle>
      </PageBanner>
      <Section>
        <ContentForm />
      </Section>

   
    </>
  );
}
