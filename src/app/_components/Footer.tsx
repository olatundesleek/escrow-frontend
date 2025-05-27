"use client";
import { useEffect, useState, useMemo } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import Logo from "./Logo";
import { FooterSection } from "./FooterSection";
import { SocialLink } from "./SocialLink";
import { FooterLinks } from "./FooterLinks";
import { ContactInfo } from "./ContactInfo";
import { usefulLinks, companyPolicies } from "./data";
import { useSiteSetting } from "../_context/SiteSettingContext";
import { SiteSettingData } from "../_types/siteSetting";
import { SOCIAL_ICONS } from '../_constants/socialIcons';
import { SiteInfo } from "../_types/siteSetting";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data } = useSiteSetting() as { data: SiteSettingData };
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    email: "",
    description: "",
    colors: "",
    phone: "",
    address: "",
  });

  // Memoize social links to avoid unnecessary re-renders
  const socialLinks = useMemo(() => {
    const links = data?.socialMediaLinks || {};
    return (Object.keys(SOCIAL_ICONS) as (keyof typeof SOCIAL_ICONS)[]).reduce(
      (acc, key) => {
        acc[key] = links[key as keyof typeof links] || "";
        return acc;
      },
      {} as Record<keyof typeof SOCIAL_ICONS, string>
    );
  }, [data?.socialMediaLinks]);

  useEffect(() => {
    if (!data) return;
    setSiteInfo({
      email: data.siteEmail || "",
      colors: data.siteColors || "",
      description: data.siteDescription || "",
      phone: data.sitePhone || "",
      address: data.siteAddress || "",
    });
  }, [data]);

  return (
    <footer className="text-amber-100 bg-black w-full h-auto flex flex-col gap-10 p-10 justify-center items-center">
      {/* Main Footer Content */}
      <section className="container flex justify-between gap-10 md:flex-nowrap flex-wrap">
        {/* Logo and Description */}
        <div className="container flex flex-col gap-2">
          <Logo />
          {siteInfo.description && <p>{siteInfo.description}</p>}
          {/* Social Links */}
          <ul className="flex gap-2 mt-2">
            {Object.entries(socialLinks).map(
              ([key, value]) =>
                value && (
                  <SocialLink
                    key={key}
                    href={value}
                    icon={SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS]}
                  />
                )
            )}
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
          {siteInfo.address && (
            <ContactInfo Icon={FaLocationDot} text={siteInfo.address} />
          )}
          <ContactInfo
            Icon={TbMailFilled}
            href={`mailto:${siteInfo.email}`}
            link_text={`${siteInfo.email}`}
          />
          {siteInfo.phone && (
            <ContactInfo Icon={FaPhoneAlt} text={siteInfo.phone} />
          )}
        </FooterSection>
      </section>

      {/* Copyright */}
      <div className="container flex flex-col gap-2 text-center py-5 border-t-1">
        <p>© {currentYear} Tona Escrow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
