import SectionalTitle from "./SectionalTitle";
import Accordian from "./Accordian";
import { FAQs } from '../_constants/faqs';

const Faqs = () => {
  return (
    <section className='bg-primary-section py-8 lg:py-20'>
      <SectionalTitle
        title='FAQ'
        description='Unveiling Valuable Insights and Delivering Clear, Actionable Understanding'
        desSize='lg:text-3xl'
      />

      <Accordian faqs={FAQs} />
    </section>
  );
};

export default Faqs;
