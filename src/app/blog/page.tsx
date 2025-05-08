import PageBanner from "../components/PageBanner";
import PageBannerTitle from "../components/PageBannerTitle";
import Blogs from "../components/Blogs";
import Section from "../components/Section";
import AppLayout from '../layout/layout';

export default function Page() {
  return (
    <AppLayout>
      <PageBanner>
        <PageBannerTitle>Latest Article</PageBannerTitle>
      </PageBanner>

      <Section>
        <Blogs />
      </Section>
    </AppLayout>
  );
}
