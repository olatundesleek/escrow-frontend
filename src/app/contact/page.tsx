import PageBanner from "../components/PageBanner";
import PageBannerTitle from "../components/PageBannerTitle";
import ContentForm from "../components/ContentForm";
import Section from "../components/Section";
import AppLayout from '../layout/layout';

export default function Page() {
  return (
    <AppLayout>
      <PageBanner>
        <PageBannerTitle>Contact Us</PageBannerTitle>
      </PageBanner>
      <Section>
        <ContentForm />
      </Section>
    </AppLayout>
  );
}
