import toast from 'react-hot-toast';

export default function ToastCustom({
  children,
}: {
  children: React.ReactNode;
}) {
  return toast.custom(
    (t) => (
      <div className='h-full' onClick={() => toast.dismiss(t.id)}>
        <div className='bg-white shadow-lg rounded-lg p-4 flex'>{children}</div>
      </div>
    ),
    {
      duration: Infinity,
    },
  );
}
