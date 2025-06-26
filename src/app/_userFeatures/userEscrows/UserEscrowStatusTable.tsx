export default function UserEscrowStatusTable({
  status,
  paymentStatus,
  escrowfeepayment,
}: {
  status: string;
  paymentStatus: string;
  escrowfeepayment: string;
}) {
  return (
    <div className='w-full border border-dashboard-border rounded-lg overflow-hidden'>
      <table className='w-full border-collapse'>
        <thead className='bg-dashboard-border'>
          <tr className='border-b border-dashboard-border'>
            <th className='py-2 px-6 text-start text-gray-700 font-light'>
              Status
            </th>
            <th className='py-2 px-6 text-start'></th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b border-dashboard-border'>
            <td className='py-2 px-6'>Escrow Status</td>
            <td className='py-2 px-6 capitalize'>{status}</td>
          </tr>
          <tr className='border-b border-dashboard-border'>
            <td className='py-2 px-6'>Payment Status</td>
            <td className='py-2 px-6 capitalize'>{paymentStatus}</td>
          </tr>
          <tr className='border-b border-dashboard-border'>
            <td className='py-2 px-6'>Escrow Fee Payment</td>
            <td className='py-2 px-6 capitalize'>{escrowfeepayment}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
