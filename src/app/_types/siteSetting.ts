export type SocialMediaLinks = {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
};
type TColor = {
  primary: string;
  secondary: string;
  background: string;
  text_color: string;
};
export type SiteSettingData = {
  socialMediaLinks: SocialMediaLinks;
  siteDescription?: string;
  sitePhone?: string;
  siteAddress?: string;
  siteColors?: TColor;
  siteUrl?: string;
  siteEmail?: string;
  siteLogo?: string;
  siteName?: string;
  maintenanceMode: {
    enabled: boolean;
    message: string;
  };
};

export type SiteInfo = {
  name: string;
  email: string;
  description: string;
  colors: TColor;
  phone: string;
  address: string;
};
