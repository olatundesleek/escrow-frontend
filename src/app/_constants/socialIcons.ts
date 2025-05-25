import { LuFacebook } from "react-icons/lu";
import {
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

import React from "react";

export const SOCIAL_ICONS = {
  facebook: React.createElement(LuFacebook, { size: 20 }),
  twitter: React.createElement(FaXTwitter, { size: 20 }),
  instagram: React.createElement(FaInstagram, { size: 20 }),
  linkedin: React.createElement(FaLinkedin, { size: 20 }),
  tiktok: React.createElement(FaTiktok, { size: 20 }),
  youtube: React.createElement(FaYoutube, { size: 20 }),
};
