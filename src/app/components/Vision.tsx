import Header from "./Header";
import Article from "./Article";

const Vision = () => {
  return (
    <section className="lg:flex lg:flex-row flex flex-col gap-6 lg:mx-25 mx-4">
      <div className="flex flex-col gap-5">
        <Header textSize="lg:text-4xl text-xl ">
          Our Commitment to Secure Transactions
        </Header>
        <h1 className="text-gray-300 flex ">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - -
          <span className="lg:flex hidden">
            - - - - - - - - - - - - - - - - - - - - -
          </span>
        </h1>
        <Article>
          At Escrow, our mission is clear to empower trust through secure
          transactions. We are dedicated to providing a reliable and transparent
          platform where buyers and sellers can transact with confidence. Our
          commitment to security and integrity ensures that every transaction is
          safeguarded, fostering trust and peace of mind for all our users.
        </Article>
      </div>

      <div className="flex flex-col gap-5 ">
        <Header textSize=" lg:text-4xl text-xl ">
          Our Vision for Transaction Excellence
        </Header>
        <h1 className="text-gray-300 flex">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - -
          <span className="lg:flex hidden">
            - - - - - - - - - - - - - - - - - - - - -
          </span>
        </h1>

        <Article>
          Our vision at Escrow is to lead the way in transaction excellence. We
          envision a future where secure transactions are the norm, empowering
          individuals and businesses alike to transact with ease and confidence.
          Through innovation and dedication, we strive to create a world where
          trust is paramount, setting the standard for secure transactions
          globally.
        </Article>
      </div>
    </section>
  );
};

export default Vision;
