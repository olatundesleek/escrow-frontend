interface Service {
  title: string;
  goods: string;
  image: string;
  description: string;
}

export const services: Service[] = [
  {
    title: 'Harmony',
    goods: 'Home',
    image: '/house.png',
    description:
      'Facilitate secure real estate transactions with ease and confidence using our platform.',
  },
  {
    title: 'Vehicle',
    goods: 'Ease',
    image: '/car.png',
    description:
      'Ensure smooth and secure vehicle transactions, whether buying or selling.',
  },
  {
    title: 'Precious',
    goods: 'Items',
    image: '/item.png',
    description:
      'Safeguard valuable assets such as jewelry, artwork, or collectibles with our secure platform.',
  },
  {
    title: 'Business',
    goods: 'Transfer',
    image: '/transfer.png',
    description:
      'Streamline the transfer of business assets or intellectual property securely and efficiently.',
  },
];
