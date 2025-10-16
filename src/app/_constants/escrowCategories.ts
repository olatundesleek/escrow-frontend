import { IconType } from 'react-icons';
import { FaMoneyBillWave } from 'react-icons/fa';

export const ESCROW_FILTER_LIST = [
  'status',
  'sort',
  'creatorRole',
  'category',
  'amount',
  'limit',
  'paymentStatus',
];

export const ESCROW_PREFILL_KEYS = [
  'prefillCreatorRole',
  'prefillCategory',
  'prefillAmount',
];

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
