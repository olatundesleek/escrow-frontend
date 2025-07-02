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
    name: "",
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
      name: data.siteName || "",
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
    <footer className="w-full bg-primary border-t border-dashboard-border text-accent pt-12">
      <div className="flex flex-col md:flex-row justify-between gap-12 xl:px-32 px-4">
        {/* Logo and Description */}
        <div className="flex flex-col gap-3 max-w-xs">
          <Logo />
          {siteInfo.description && (
            <p className="text-base text-text mt-2">{siteInfo.description}</p>
          )}
          {/* Social Links */}
          <ul className="flex gap-3 mt-5" aria-label="Social media links">
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

        {/* Useful Links & Contact */}
        <nav
          aria-label="Footer Navigation"
          className="flex flex-col gap-8 md:flex-row md:gap-14"
        >
          <FooterSection title="Useful Links">
            <FooterLinks links={usefulLinks} />
          </FooterSection>
          <FooterSection title="Company Policies">
            <FooterLinks links={companyPolicies} />
          </FooterSection>
          <FooterSection title="Contact With Us">
            <address className="not-italic flex flex-col gap-3">
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
      <div className="xl:px-32 px-4 text-center py-6 text-sm text-gray-500 border-t border-dashboard-border mt-12">
        <p>
          © {currentYear}{" "}
          <span className="font-semibold text-secondary">{siteInfo.name}</span>.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
