import { IconType } from 'react-icons';
import { FaMoneyBillWave } from 'react-icons/fa';

interface Role {
  role: string;
  icon?: IconType;
}

export const escrowCategories: string[] = [
  'Real Estate',
  'Vehicle',
  'Construction',
  'Home Renovation',
  'Freelancing Platform',
  'Loan Agreement',
  'Investment Transaction',
  'Luxury Goods',
  'Import/Export Transaction',
  'Crypto Transaction',
  'Digital Products',
  'Rental',
  'Design Services',
  'Gadget',
  'Electronic',
  'Others',
];

// Discuss this later

export const escrowCreatorRole: Role[] = [
  {
    role: 'Seller',
    icon: FaMoneyBillWave,
  },
  {
    role: 'Buyer',
    icon: FaMoneyBillWave,
  },
];
