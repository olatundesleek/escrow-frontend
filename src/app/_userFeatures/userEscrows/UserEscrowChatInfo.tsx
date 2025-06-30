import { HiOutlineChat } from 'react-icons/hi';

export default function UserEscrowChatInfo({
  chatActive,
}: {
  chatActive: boolean;
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
    </div>
  );
}
