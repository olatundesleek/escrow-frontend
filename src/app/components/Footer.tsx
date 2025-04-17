import Link from 'next/link';
import { LuFacebook } from 'react-icons/lu';
import { FaLocationDot, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import { TbBrandLinkedin, TbMailFilled } from 'react-icons/tb';
import React from 'react';
import { IconType } from 'react-icons';
import * as motion from 'motion/react-client';
import Logo from './Logo';

const FooterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className='container flex flex-col gap-2'>
    <h2 className='text-2xl font-bold w-full flex flex-col gap-2 mb-2'>
      {title} <span className='w-10 bg-secondary h-1'></span>
    </h2>
    {children}
  </div>
);

const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <motion.li
    whileHover={{ scale: 1.05 }}
    whileTap={{
      scale: 0.9,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 10,
      },
    }}
    transition={{
      type: 'spring',
      stiffness: 400,
      damping: 15,
    }}
    className='text-secondary hover:bg-cyan-700 p-2 rounded-xl border border-secondary'
  >
    <Link href={href}>{icon}</Link>
  </motion.li>
);

const FooterLinks = ({
  links,
}: {
  links: { href: string; label: string }[];
}) => (
  <ul>
    {links.map(({ href, label }, index) => (
      <li key={index}>
        <Link href={href}>{label}</Link>
      </li>
    ))}
  </ul>
);

const ContactInfo = ({
  Icon,
  text,
  href,
  link_text,
}: {
  Icon: IconType;
  text?: string;
  href?: string;
  link_text?: string;
}) => (
  <ul>
    <li className='flex items-center gap-2'>
      <Icon size={20} className='text-secondary' />
      {(text && text) || (href && <Link href={href}>{link_text}</Link>)}
    </li>
  </ul>
);

const Footer = () => {
  const usefulLinks = [
    { href: '/aboutus', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const companyPolicies = [
    { href: '#', label: 'Cookie policy' },
    { href: '#', label: 'Privacy policy' },
    { href: '#', label: 'Terms of Service' },
  ];

  return (
    <footer className='text-amber-100 bg-primary mt-10 w-full h-auto flex flex-col gap-10 p-10 justify-center items-center'>
      {/* Logo and Description, Useful Links, Company Policies, Contact Information */}
      <section className='container flex justify-between gap-10 md:flex-nowrap flex-wrap'>
        {/* Logo and Description */}
        <div className='container flex flex-col gap-2'>
          <Logo />
          <p>
            Securing your transactions with trust and transparency. Join
            thousands of satisfied users and experience peace of mind with our
            reliable escrow services.
          </p>
          <ul className='flex gap-2 mt-2'>
            <SocialLink href='#' icon={<LuFacebook size={20} />} />
            <SocialLink href='#' icon={<FaXTwitter size={20} />} />
            <SocialLink href='#' icon={<TbBrandLinkedin size={20} />} />
            <SocialLink href='#' icon={<FaInstagram size={20} />} />
          </ul>
        </div>

        {/* Useful Links */}
        <FooterSection title='Useful Links'>
          <FooterLinks links={usefulLinks} />
        </FooterSection>

        {/* Company Policies */}
        <FooterSection title='Company Policies'>
          <FooterLinks links={companyPolicies} />
        </FooterSection>

        {/* Contact Information */}
        <FooterSection title='Contact With Us'>
          <ContactInfo
            Icon={FaLocationDot}
            text='  Ojo Ayo Street, Ikorodu, Lagos State, Nigeria'
          />
          <ContactInfo
            Icon={TbMailFilled}
            href='mailto:info@tonaescrow.com'
            link_text='info@tonaescrow.com'
          />
          <ContactInfo Icon={FaPhoneAlt} text='+1(909) 562 1786' />
        </FooterSection>
      </section>

      {/*   Copywrite */}
      <div className='container flex flex-col gap-2 text-center py-5 border-t-1 border-secondary'>
        <p>© 2023 Tona Escrow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
