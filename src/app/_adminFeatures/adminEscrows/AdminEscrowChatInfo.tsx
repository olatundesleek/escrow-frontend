import { HiOutlineChat } from "react-icons/hi";
import AdminEscrowDetailsAvartar from './AdminEscrowDetailsAvartar';

export default function EscrowChatInfo({
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
        <table className='w-full mt-2'>
          <tbody>
            <tr className='border-b border-dashboard-border'>
              <th className='flex gap-6 items-center'>
                <AdminEscrowDetailsAvartar />
                <span className='text-start flex flex-col'>
                  <span>Creator Role</span>
                  <span className='text-sm font-extralight text-dashboard-secondary'>
                    ({creatorEmail})
                  </span>
                </span>
              </th>
              <td className='capitalize'>{creatorRole}</td>
            </tr>
            <tr className='border-b border-dashboard-border'>
              <th className='flex gap-6'>
                <AdminEscrowDetailsAvartar />
                <span className='text-start flex justify-center items-center'>
                  Counter Party Email
                </span>
              </th>
              <td>{counterpartyEmail}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
