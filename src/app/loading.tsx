import Spinner from './_components/Spinner';

export default function Loading() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Spinner />;
    </div>
  );
}
