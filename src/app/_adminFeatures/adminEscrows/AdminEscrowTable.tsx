import Table from '@/app/_components/Table';
import { EscrowItem } from '@/app/_types/dashboardServicesTypes';
import { useRouter } from 'next/navigation';

export default function AdminEscrowTable({
  escrowData,
}: {
  escrowData: EscrowItem[];
}) {
  const { push } = useRouter();

  return (
    <Table columns='grid-cols-[minmax(200px,_1fr)_1fr_0.6fr_0.6fr_0.7fr_1fr_0.5fr]'>
      <Table.Header>
        <Table.Head>Category</Table.Head>
        <Table.Head>Description</Table.Head>
        <Table.Head>Amount</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Payment Status</Table.Head>
        <Table.Head>Date</Table.Head>
        <Table.Head>{null}</Table.Head>
      </Table.Header>

      <Table.Body
        data={escrowData}
        render={(item) => (
          <Table.Row key={item._id}>
            <td className='capitalize flex justify-start items-center text-lg'>
              {item.category}
            </td>
            <td className='capitalize flex justify-start items-center text-lg'>
              {item.description}
            </td>
            <td className='capitalize flex justify-start items-center text-lg'>
              {item.amount}
            </td>
            <td className='capitalize flex justify-start items-center text-lg'>
              {item.status}
            </td>
            <td className='capitalize flex justify-start items-center text-lg'>
              {item.paymentStatus}
            </td>
            <td className='capitalize flex justify-start items-center text-lg'>
              {item.createdAt}
            </td>
            <td className='capitalize flex justify-center items-center'>
              <button
                type='button'
                onClick={() => push(`escrows/${item._id}`)}
                className='bg-dashboard-secondary py-2 px-3 rounded text-dashboard-primary cursor-pointer'
              >
                View Details
              </button>
            </td>
          </Table.Row>
        )}
      ></Table.Body>

      <Table.Footer>
        <h1 className='font-bold'>10 of 20</h1>
      </Table.Footer>
    </Table>
  );
}


