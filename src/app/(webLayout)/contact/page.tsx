import PageBanner from "../../components/PageBanner";
import PageBannerTitle from "../../components/PageBannerTitle";
import ContentForm from "../../components/ContentForm";
import Section from "../../components/Section";
import TransactionChart from "../../components/TransactionChart";
import TransactionTable from "../../components/TransactionTable";

export default function Page() {
  return (
    <>
      <PageBanner>
        <PageBannerTitle>Contact Us</PageBannerTitle>
      </PageBanner>
      <Section>
        <ContentForm />
      </Section>
      {/* <div className="flex lg:flex-row flex-col gap-6 p-6 border-2 justify-between">
        <TransactionChart />
        <TransactionTable />
      </div> */}

      <div className="flex flex-col lg:flex-row gap-6 p-6 border-2 border-gray-300">
        <div className="w-full lg:w-1/2">
          <TransactionChart />
        </div>
        <div className="w-full lg:w-1/2">
          <TransactionTable />
        </div>
      </div>
    </>
  );
}
