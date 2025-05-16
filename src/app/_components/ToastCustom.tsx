import toast from 'react-hot-toast';
import { MdErrorOutline } from 'react-icons/md';

export default function ToastCustom({
  children,
}: {
  children: React.ReactNode;
}) {
  return toast.custom(
    () => (
      <div className='h-full'>
        <div className='bg-red-50 border-l-4 border-red-500 text-red-800 rounded-lg p-4 flex gap-3 items-start shadow-lg flex-row'>
          <MdErrorOutline className='min-w-[1.25rem] text-red-500' size={20} />
          <div className='text-base flex-col lg-flex-row'>{children}</div>
        </div>
      </div>
    ),
    {
      duration: 10000,
    },
  );
}
