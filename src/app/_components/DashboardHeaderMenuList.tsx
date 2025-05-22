import { IconList } from '../constants/dashboardHeaderMenuList';
import ButtonIcon from './ButtonIcon';
import UserAvatar from './UserAvatar';

export default function DashboardHeaderMenuList({
  iconList,
}: {
  iconList: IconList[];
}) {
  return (
    <ul className='flex items-center gap-2'>
      {iconList.map((icon: IconList) => {
        const Icon = icon.icon;
        return (
          <li key={icon.label} className='relative'>
            <ButtonIcon style='lg:text-2xl' toolTip={icon.label}>
              <Icon />
            </ButtonIcon>
          </li>
        );
      })}
      <li>
        <UserAvatar />
      </li>
    </ul>
  );
}
