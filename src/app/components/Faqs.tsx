import SectionalTitle from "./SectionalTitle";
import Accordian from "./Accordian";

const Faqs = () => {
  return (
    <section className='bg-section py-8 lg:py-20'>
      <SectionalTitle
        title='FAQ'
        description='Unveiling Valuable Insights and Delivering Clear, Actionable Understanding'
        desSize='lg:text-3xl'
      />

      <Accordian />
    </section>
  );
};

export default Faqs;
