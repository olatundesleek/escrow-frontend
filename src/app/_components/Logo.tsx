"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSiteSetting } from "../_context/SiteSettingContext";

export type SiteSetting = {
  siteLogo?: string;
  siteName?: string;
};

export default function Logo() {
  const { data }: { data: SiteSetting } = useSiteSetting();
  const [displayLogo, setDisplayLogo] = useState<string | null>(null);

  useEffect(() => {
    const logo = data.siteLogo?.trim();
    setDisplayLogo(logo && logo !== "" ? logo : null);
  }, [data.siteLogo]);

  return (
    <Link href="/" className="flex items-center gap-2">
      {displayLogo ? (
        <Image
          src={displayLogo}
          alt="Logo"
          width={40}
          height={40}
          priority
          unoptimized
        />
      ) : (
        <h1 className="text-3xl font-bold text-secondary">
          {data.siteName || "Site Name"}
        </h1>
      )}
    </Link>
  );
}
