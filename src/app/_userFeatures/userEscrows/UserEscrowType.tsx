export default function UserEscrowType({ type }: { type: 'buy' | 'sell' }) {
  return (
    <div className='w-full border border-dashboard-border rounded-lg overflow-hidden'>
      <div
        className={`w-full py-2 px-4  text-gray-700 text-base capitalize flex justify-between ${
          type === 'buy'
            ? 'bg-green-100 text-green-800'
            : 'bg-blue-100 text-blue-800'
        }`}
      >
        <span>Type</span>
      </div>
      <div
        className={`flex bg-transparent border p-4 justify-between items-center ${
          type === 'buy'
            ? 'border-green-100 text-green-800'
            : 'border-blue-100 text-blue-800'
        }`}
      >
        <span>Trade Type</span>
        <span
          className={`text-sm border px-4 py-1 rounded-lg capitalize ${
            type === 'buy'
              ? 'bg-green-100  text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {type.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
