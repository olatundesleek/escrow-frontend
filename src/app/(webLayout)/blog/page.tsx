import StickyObserverBanner from '../../components/StickyObserverBanner';
import PageBannerTitle from '../../components/PageBannerTitle';
import Blogs from '../../components/Blogs';
import Section from '../../components/Section';

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
