import Image from 'next/image';
import React from 'react';

export default function UserAvatar() {
  return (
    <div className='relative w-[60px] h-[60px] sm:w-[60px] sm:h-[60px] md:w-[60px] md:h-[60px] lg:w-[60px] lg:h-[60px] mx-auto lg:ml-0 lg:mr-0 rounded-full'>
      <Image
        src='/useravartar.png'
        alt='user avartar/profile image'
        fill
        className='object-contain'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
    </div>
  );
}
