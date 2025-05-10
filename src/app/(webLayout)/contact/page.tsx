import StickyObserverBanner from '../../components/StickyObserverBanner';
import PageBannerTitle from '../../components/PageBannerTitle';
import ContentForm from '../../components/ContentForm';
import Section from '../../components/Section';

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
