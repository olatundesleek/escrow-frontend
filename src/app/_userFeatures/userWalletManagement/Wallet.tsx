'use client';

import UserDashboardPageTitle from '../../_components/UserDashboardPageTitle';
import { WalletCard } from '../../_components/WalletCard';
import { BankForm } from './BankForm';
import { AddWalletBankForm } from './AddWalletBankForm';
import { useWallet } from '../../_hooks/useCardData';
import FullPageLoader from '../../_components/FullPageLoader';
import toast from 'react-hot-toast';
import { Button } from '../../_components/DashboardBtn';
import Modal from '../../_components/Modal';
import Deposit from './Deposit';
import useConfirmModal from '../../_hooks/useConfirmModal';

export default function Wallet() {
  const {
    isOpen: isDepositOpen,
    close: closeDeposit,
    open: openDeposit,
  } = useConfirmModal();
  const { walletData, isWalletLoading, walletError } = useWallet();

  if (isWalletLoading) {
    return <FullPageLoader />;
  }

  if (!walletData || walletError) {
    toast.error(walletError?.message || 'Something went wrong!');
    return null;
  }

  const { walletDetails } = walletData || {
    totalBalance: 0,
    lockedBalance: 0,
    availableBalance: 0,
  };

  const bankSet =
    walletDetails.bankInfo.accountName !== null &&
    walletDetails.bankInfo.accountNumber !== null &&
    walletDetails.bankInfo.bankName !== null &&
    walletDetails.bankInfo.bankCode !== null &&
    walletDetails.bankInfo.recipientCode !== null;

  return (
    <>
      <Modal
        isOpen={isDepositOpen}
        title={'Deposit'}
        onClose={closeDeposit}
        width='w-md lg:max-w-3xl max-w-lg'
      >
        <Deposit wallet={walletDetails} />
      </Modal>
      <UserDashboardPageTitle title='Wallet'>
        <Button //button to trigger deposit
          onClick={openDeposit}
        >
          Deposit
        </Button>
      </UserDashboardPageTitle>

      {/* Top Cards */}
      <WalletCard walletData={walletDetails} />

      {/* Conditional UI for Withdrawal or Bank Form */}
      {bankSet ? <BankForm /> : <AddWalletBankForm />}
    </>
  );
}
