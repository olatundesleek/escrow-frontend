import PageBanner from '../../components/PageBanner';
import PageBannerTitle from '../../components/PageBannerTitle';
import Blogs from '../../components/Blogs';
import Section from '../../components/Section';

export default function Page() {
  return (
    <>
      <PageBanner>
        <PageBannerTitle>Latest Article</PageBannerTitle>
      </PageBanner>

      <Section>
        <Blogs />
      </Section>
    </>
  );
}
