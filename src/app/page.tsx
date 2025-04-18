// import Header from "./components/Header";
// import Article from "./components/Article";
import AboutusCard from "./components/AboutusCard";
import WorkflowCard from "./components/WorkflowCard";

const Home = () => {
  return (
    <main>
      <AboutusCard
        image="/secure.png"
        title="Secure Transactions"
        description="Stay secure with advanced encryption and protection."
      />

      <WorkflowCard
        image="/greet.png"
        title="Agreement Between Buyer and Seller"
        number="1"
        description="The Agreement Between Buyer and Seller for an escrow system ensures a secure and fair transaction by involving an escrow service provider as a neutral third party"
      />
      <WorkflowCard
        style="row-reverse"
        image="/payment.png"
        title="Transfer Payment to Escrow Account"
        number="2"
        description="In an escrow system, the transfer of payment to an escrow account involves the buyer depositing the agreed-upon funds into a secure account managed by a neutral third party, the escrow service provider."
      />
      <WorkflowCard
        image="/goods.png"
        title="Provide Goods or Services to Buyer"
        number="3"
        description="In an escrow system, after the buyer has transferred the payment to the escrow account, the seller is responsible for delivering the agreed-upon goods or services to the buyer."
      />
      <WorkflowCard
        style="row-reverse"
        image="/funds.png"
        title="Agreement Between Buyer and Seller"
        number="4"
        description="In an escrow system, releasing funds to the seller occurs after the buyer has received and approved the goods or services as per the agreed terms."
      />
    </main>
  );
};

export default Home;
