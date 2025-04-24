import { LuFacebook } from "react-icons/lu";
import { FaLocationDot, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { TbBrandLinkedin, TbMailFilled } from "react-icons/tb";
import React from "react";
import Logo from "./Logo";
import { FooterSection } from "./_footer/FooterSection";
import { SocialLink } from "./_footer/SocialLink";
import { FooterLinks } from "./_footer/FooterLinks";
import { ContactInfo } from "./_footer/ContactInfo";
import { usefulLinks, companyPolicies } from "./_footer/data";

const Footer = () => {
  return (
    <footer className="text-amber-100 bg-primary mt-10 w-full h-auto flex flex-col gap-10 p-10 justify-center items-center">
      {/* Logo and Description, Useful Links, Company Policies, Contact Information */}
      <section className="container flex justify-between gap-10 md:flex-nowrap flex-wrap">
        {/* Logo and Description */}
        <div className="container flex flex-col gap-2">
          <Logo />
          <p>
            Securing your transactions with trust and transparency. Join
            thousands of satisfied users and experience peace of mind with our
            reliable escrow services.
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
          <ContactInfo
            Icon={FaLocationDot}
            text="  Ojo Ayo Street, Ikorodu, Lagos State, Nigeria"
          />
          <ContactInfo
            Icon={TbMailFilled}
            href="mailto:info@tonaescrow.com"
            link_text="info@tonaescrow.com"
          />
          <ContactInfo Icon={FaPhoneAlt} text="+1(909) 562 1786" />
        </FooterSection>
      </section>

      {/*   Copywrite */}
      <div className="container flex flex-col gap-2 text-center py-5 border-t-1 border-secondary">
        <p>© 2025 Tona Escrow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
