import SectionalTitle from "./SectionalTitle";
import Accordian from "./Accordian";

const Faqs = () => {
  return (
    <section className="     bg-[#FAFAFF]">
      <SectionalTitle
        title="FAQ"
        description="Unveiling Valuable Insights and Delivering Clear, Actionable Understanding"
        // style="text-9xl"
        desSize="lg:text-3xl"
      />

      <Accordian />
    </section>
  );
};

export default Faqs;
