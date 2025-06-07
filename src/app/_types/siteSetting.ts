export type SocialMediaLinks = {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
};

export type SiteSettingData = {
  maintenanceMode: { enabled: boolean };
  socialMediaLinks: SocialMediaLinks;
  siteDescription?: string;
  sitePhone?: string;
  siteAddress?: string;
  siteColors?: string;
  siteEmail?: string;
  siteLogo?: string;
  siteName?: string;
};

export type SiteInfo = {
  email: string;
  description: string;
  colors: string;
  phone: string;
  address: string;
};
