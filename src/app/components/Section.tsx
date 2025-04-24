import React from 'react';

export default function Section({ children }: { children: React.ReactNode }) {
  return <section className='my-10 lg:my-20'>{children}</section>;
}
