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
import { SOCIAL_ICONS } from "../_constants/socialIcons";
import { SiteInfo } from "../_types/siteSetting";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data } = useSiteSetting() as { data: SiteSettingData };
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    email: "",
    description: "",
    colors: { background: "", primary: "", secondary: "", text_color: "" },
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
      colors: data.siteColors || {
        background: "",
        primary: "",
        secondary: "",
        text_color: "",
      },
      description: data.siteDescription || "",
      phone: data.sitePhone || "",
      address: data.siteAddress || "",
    });
  }, [data]);

  return (
    <footer className="w-full bg-primary border-t border-dashboard-border text-accent pt-10">
      <div className="flex flex-col md:flex-row justify-between gap-10 xl:px-32 px-4">
        {/* Logo and Description */}
        <div className="flex flex-col gap-2 max-w-xs">
          <Logo />
          {siteInfo.description && (
            <p className="text-sm mt-2">{siteInfo.description}</p>
          )}
          {/* Social Links */}
          <ul className="flex gap-2 mt-4" aria-label="Social media links">
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
        <nav
          aria-label="Footer Navigation"
          className="flex flex-col gap-6 md:flex-row md:gap-10"
        >
          <FooterSection title="Useful Links">
            <FooterLinks links={usefulLinks} />
          </FooterSection>
          <FooterSection title="Company Policies">
            <FooterLinks links={companyPolicies} />
          </FooterSection>
          <FooterSection title="Contact With Us">
            <address className="not-italic flex flex-col gap-2">
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
            </address>
          </FooterSection>
        </nav>
      </div>
      {/* Copyright */}
      <div className="max-w-7xl mx-auto text-center py-5 text-xs text-gray-500 border-t border-dashboard-border mt-10">
        <p>© {currentYear} Tona Escrow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
