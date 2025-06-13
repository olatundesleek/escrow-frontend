import { format, isToday } from 'date-fns';
import { formatDistanceFromNow } from '@/app/_utils/helpers';

export default function EscrowTermsList({
  terms,
  createdAt,
}: {
  terms: string[];
  createdAt: string;
}) {
  return (
    <div className='w-full border border-dashboard-border rounded-lg overflow-hidden'>
      <div className='w-full py-2 px-4 bg-dashboard-border text-gray-700 text-base capitalize flex justify-between'>
        <span>Terms</span>
        <span>
          {format(new Date(createdAt), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(createdAt))
            ? 'Today'
            : formatDistanceFromNow(createdAt)}
          )
        </span>
      </div>
      <ul className='w-full list-disc'>
        {terms.map((item, i) => (
          <li
            key={i}
            className='border-b border-dashboard-border px-4 py-3 capitalize'
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
