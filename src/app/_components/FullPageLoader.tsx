import Spinner from './Spinner';

export default function FullPageLoader() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Spinner color='text-db-text-primary' />
    </div>
  );
}
