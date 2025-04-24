'use client';

// import Button from "./Button";
import Lists from './Lists';
import { useState } from 'react';
import Image from 'next/image';
import Article from './Article';
import { FiArrowUpRight } from 'react-icons/fi';
import Button from './Button';

const FAQs = [
  {
    question: 'What is an escrow platform?',
    answer: `An escrow payment is a financial arrangement where a third party holds and regulates payment of the funds required for two parties involved in a transaction. It ensures that both parties fulfill their contractual obligations before the funds are released.`,
  },
  {
    question: 'How does an escrow platform work?',
    answer: `In an escrow payment arrangement, the buyer deposits the funds into an escrow account, which is held by a neutral third party. The seller then delivers the goods or services to the buyer. Once the buyer confirms receipt or satisfaction, the escrow agent releases the funds to the seller.`,
  },
  {
    question: 'What types of services are offered on an escrow platform?',
    answer: `Escrow payments are commonly used in various transactions, including real estate purchases, vehicle sales, online transactions, freelance services, and large business transactions. Any transaction where there's a need for security and assurance for both parties can benefit from escrow payments.`,
  },
  {
    question: 'Why should I use escrow payment?',
    answer: `Escrow payments provide security and peace of mind for both buyers and sellers. Buyers can be confident that the funds are held safely until they receive the goods or services as described. Sellers can trust that payment will be received once they fulfill their obligations.`,
  },
  {
    question: 'Is escrow payment secure?',
    answer: `Yes, escrow payments are designed to be secure. The escrow agent, typically a trusted third party, ensures that funds are only released when both parties fulfill their obligations according to the terms of the transaction.`,
  },
  {
    question: 'How do I choose an escrow payment service?',
    answer: `When choosing an escrow payment service, consider factors such as the reputation and reliability of the escrow agent, the fees involved, the ease of use of the platform, and the level of customer support provided.`,
  },
  {
    question: 'Are there any fees associated with using an escrow platform?',
    answer: `Yes, there are typically fees associated with using an escrow platform. These fees cover the costs of facilitating secure transactions and may include transaction fees based on a percentage of the transaction amount, service fees for additional features like dispute resolution, withdrawal fees, and currency conversion fees if applicable.`,
  },
];

const Accordian = () => {
  const [curOpen, setCurOpen] = useState<number | null>(null);

  return (
    <div className='flex flex-col gap-10 lg:gap-15  lg:py-20'>
      <div className='flex flex-col-reverse lg:flex-row lg:gap-15 lg:justify-center lg:items-center m-3'>
        <div>
          {FAQs.map((faq, i) => (
            <Lists
              faq={faq}
              index={i}
              key={i}
              curOpen={curOpen}
              setCurOpen={setCurOpen}
            />
          ))}
        </div>
        <Image src='/qa.png' alt='qa' width={500} height={200} />
      </div>
      <div className='flex flex-col gap-10 m-3 lg:pl-30 '>
        <Article>
          Have more questions? Click the button bellow to learn more.
        </Article>

        <Button
          color='bg-secondary hover:opacity-90 text-white'
          textSize='text-xl'
          style='flex gap-3 items-center justify-center w-[10rem]'
        >
          Ask More <FiArrowUpRight />
        </Button>
      </div>
    </div>
  );
};

export default Accordian;
