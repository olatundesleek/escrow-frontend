import { HiArrowRightOnRectangle } from 'react-icons/hi2';

import ButtonIcon from './ButtonIcon';
import SpinnerMini from './SpinnerMini';
import { useLogout } from '../_hooks/useLogout';

export default function Logout() {
  const { handleLogout, isLoading } = useLogout();
  return (
    <ButtonIcon
      toolTip='Logout'
      style='lg:text-2xl'
       tipPosition="bottom"
      isLoading={isLoading}
      onClick={handleLogout}
    >
      {isLoading ? (
        <SpinnerMini color='text-dashboard-secondary' />
      ) : (
        <HiArrowRightOnRectangle />
      )}
    </ButtonIcon>
  );
}
