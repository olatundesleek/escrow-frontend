import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/next.svg";
import { LuFacebook } from "react-icons/lu";
import { FaLocationDot, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { TbBrandLinkedin, TbMailFilled } from "react-icons/tb";

const FooterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="container flex flex-col gap-2">
    <h2 className="text-2xl font-bold w-full flex flex-col gap-2 mb-2">
      {title} <span className="w-10 bg-[#E9967A] h-1"></span>
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
  <li className="text-[#E9967A] hover:bg-cyan-700 transition-all duration-300 p-2 rounded-xl border-1 border-[#E9967A]">
    <Link href={href}>{icon}</Link>
  </li>
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

const ContactInfo = () => (
  <ul>
    <li className="flex items-center gap-2">
      <FaLocationDot size={20} className="text-[#E9967A]" />
      Ojo Ayo Street, Ikorodu, Lagos State, Nigeria
    </li>
    <li className="flex items-center gap-2">
      <TbMailFilled size={20} className="text-[#E9967A]" />
      <Link href="mailto:info@tonaescrow.com">info@tonaescrow.com</Link>
    </li>
    <li className="flex items-center gap-2">
      <FaPhoneAlt size={20} className="text-[#E9967A]" />
      +1(909) 562 1786
    </li>
  </ul>
);

const Footer = () => {
  const usefulLinks = [
    { href: "#", label: "About Us" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Contact" },
  ];

  const companyPolicies = [
    { href: "#", label: "Cookie policy" },
    { href: "#", label: "Privacy policy" },
    { href: "#", label: "Terms of Service" },
  ];

  return (
    <footer className="text-amber-100 bg-cyan-900 mt-10 w-full h-auto flex gap-10 items-start text-left p-20 flex-wrap md:flex-nowrap">
      {/* Logo and Description */}
      <div className="container flex flex-col gap-2">
        <Image src={logo} alt="Logo" className="object-fill w-30 h-10" />
        <p>
          Securing your transactions with trust and transparency. Join thousands
          of satisfied users and experience peace of mind with our reliable
          escrow services.
        </p>
        <ul className="flex gap-2 mt-2">
          <SocialLink href="#" icon={<LuFacebook size={20} />} />
          <SocialLink href="#" icon={<FaXTwitter size={20} />} />
          <SocialLink href="#" icon={<TbBrandLinkedin size={20} />} />
          <SocialLink href="#" icon={<FaInstagram size={20} />} />
        </ul>
      </div>

      {/* Useful Links */}
      <FooterSection title="Useful Links">
        <FooterLinks links={usefulLinks} />
      </FooterSection>

      {/* Company Policies */}
      <FooterSection title="Company Policies">
        <FooterLinks links={companyPolicies} />
      </FooterSection>

      {/* Contact Information */}
      <FooterSection title="Contact With Us">
        <ContactInfo />
      </FooterSection>
    </footer>
  );
};

export default Footer;
