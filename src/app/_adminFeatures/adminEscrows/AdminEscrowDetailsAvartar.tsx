import Image from 'next/image';

export default function AdminEscrowDetailsAvartar() {
  return (
    <div className='relative'>
      <div className='cursor-pointer w-[60px] h-[60px] mx-auto rounded-full'>
        <Image
          src='/useravartar.png'
          alt='user avatar/profile image'
          fill
          className='object-contain rounded-full'
          sizes='60px'
        />
      </div>
    </div>
  );
}
