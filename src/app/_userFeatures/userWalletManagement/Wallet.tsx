'use client';

import UserDashboardPageTitle from '../../_components/UserDashboardPageTitle';
import { WalletCard } from '../../_components/WalletCard';
import WithdrawalForm from './WithdrawalForm';
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
    walletDetails.bankInfo.bankCode !== null;

  return (
    <>
      <Modal
        isOpen={isDepositOpen}
        title={'Deposit'}
        onClose={closeDeposit}
        width='w-md lg:max-w-3xl max-w-lg'
      >
        <Deposit wallet={walletDetails} onClose={closeDeposit} />
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
      {bankSet ? (
        <WithdrawalForm bankInfo={walletDetails.bankInfo} />
      ) : (
        <AddWalletBankForm />
      )}
    </>
  );
}
