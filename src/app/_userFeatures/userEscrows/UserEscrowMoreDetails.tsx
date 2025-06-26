export default function UserEscrowMoreDetails({
  category,
  description,
  amount,
  updatedAt,
}: {
  category: string;
  description: string;
  amount: string;
  updatedAt: string;
}) {
  return (
    <div className='border border-dashboard-border rounded-lg overflow-hidden'>
      <div className='flex w-full bg-dashboard-border p-3 justify-center'>
        <h1>More Details</h1>
      </div>
      <table className='w-full mt-2'>
        <tbody>
          <tr className='border-b border-dashboard-border'>
            <th className='text-start px-4 py-2'>
              Category
              <span className='text-sm text-gray-500'>(of item)</span>
            </th>
            <td className='capitalize'>{category}</td>
          </tr>
          <tr className='border-b border-dashboard-border'>
            <th className='text-start px-4 py-2'>
              Description
              <span className='text-sm text-gray-500'>(of item)</span>
            </th>
            <td className='capitalize'>{description}</td>
          </tr>
          <tr className='border-b border-dashboard-border'>
            <th className='text-start px-4 py-2'>Amount</th>
            <td className='capitalize'>{amount}</td>
          </tr>
          <tr className='border-b border-dashboard-border'>
            <th className='text-start px-4 py-2'>Updated At</th>
            <td className='capitalize'>{updatedAt}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
