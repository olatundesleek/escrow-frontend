import { HiOutlineChat } from 'react-icons/hi';
import UserAvatar from '@/app/_components/UserAvatar';

export default function UserEscrowChatInfo({
  chatActive,
  creatorRole,
  counterpartyEmail,
  creatorEmail,
}: {
  chatActive: boolean;
  creatorRole: string;
  counterpartyEmail: string;
  creatorEmail: string;
}) {
  return (
    <div className='rounded-lg overflow-hidden flex flex-col gap-4'>
      <div className='flex w-full bg-dashboard-border justify-between p-3'>
        <span className='flex items-center text-center gap-2 font-bold'>
          <HiOutlineChat className='text-dashboard-secondary' />{' '}
          <span>Chat</span>
        </span>
        <span>{chatActive ? 'Active' : 'Inactive'}</span>
      </div>
      <div className='flex gap-3 border border-dashboard-border'>
        <UserAvatar />
        <table className='w-full mt-2'>
          <tbody>
            <tr>
              <th className='text-start flex flex-col'>
                <span>Creator Role</span>
              </th>
              <td className='capitalize'>{creatorRole}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
