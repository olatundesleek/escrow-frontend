import { HiOutlineMenu } from 'react-icons/hi';
import ButtonIcon from './ButtonIcon';
import DashBboardSearchBar from './DashboardSearchBar';
import DashboardHeaderMenuList from './DashboardHeaderMenuList';
import { userHeaderMenuList } from '@/app/_constants/headerMenuList';


export default function UserDashboardHeader({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<boolean>;
}) {
  return (
    <header className='w-full border-b border-dashboard-border flex justify-between items-center px-5 py-1 lg:min-h-[4.3rem] lg:max-h-[4.3rem]'>
      <div className='flex gap-x-4 w-full'>
        <ButtonIcon
          style='lg:text-2xl'
          onClick={setIsSidebarOpen}
          isActive={isSidebarOpen}
          toolTip='Menu'
          tipPosition='-right-8'
        >
          <HiOutlineMenu />
        </ButtonIcon>
        <DashBboardSearchBar display='hidden lg:flex md:flex' />
      </div>
      {/* header menulist here e.g for admins grid icon, notification, globe and avartar then user are different set of icons */}
      <DashboardHeaderMenuList headerMenu={userHeaderMenuList} />
    </header>
  );
}
