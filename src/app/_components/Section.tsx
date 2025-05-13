import React from 'react';

export default function Section({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: string;
}) {
  return <section className={`my-10 lg:my-20 ${style}`}>{children}</section>;
}
