interface FAQ {
  question: string;
  answer: string;
}

export const FAQs: FAQ[] = [
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
