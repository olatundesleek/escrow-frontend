interface Workflow {
  image: string;
  style: string;
  border: string;
  number: string;
  title: string;
  description: string;
}

export const workflow: Workflow[] = [
  {
    image: '/greet.png',
    style: 'lg:flex-row',
    border: 'lg:border-r-1',
    number: '1',
    title: 'Agreement Between Buyer and Seller',
    description:
      'The Agreement Between Buyer and Seller for an escrow system ensures a secure and fair transaction by involving an escrow service provider as a neutral third party.',
  },
  {
    image: '/payment.png',
    style: 'lg:flex-row-reverse',
    border: 'lg:border-l-2',
    number: '2',
    title: 'Transfer Payment to Escrow Account',
    description:
      'In an escrow system, the transfer of payment to an escrow account involves the buyer depositing the agreed-upon funds into a secure account managed by a neutral third party, the escrow service provider.',
  },
  {
    image: '/goods.png',
    style: 'lg:flex-row',
    border: 'lg:border-r-1',
    number: '3',
    title: 'Provide Goods or Services to Buyer',
    description:
      'In an escrow system, after the buyer has transferred the payment to the escrow account, the seller is responsible for delivering the agreed-upon goods or services to the buyer.',
  },
  {
    image: '/funds.png',
    style: 'lg:flex-row-reverse',
    border: 'lg:border-l-2',
    number: '4',
    title: 'Release Funds to Seller Upon Completion',
    description:
      'In an escrow system, releasing funds to the seller occurs after the buyer has received and approved the goods or services as per the agreed terms.',
  },
];
