import Link from 'next/link';

export default function Logo({ logo = 'Escrow' }: { logo?: string }) {
  return (
    <Link href='/' className='flex items-center'>
      <h1 className='text-3xl font-bold text-secondary'>{logo}</h1>
    </Link>
  );
}
