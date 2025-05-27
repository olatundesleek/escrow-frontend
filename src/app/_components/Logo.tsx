"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSiteSetting } from "../_context/SiteSettingContext";

export default function Logo() {
  const { data } = useSiteSetting();
  const [displayLogo, setDisplayLogo] = useState<string | null>(null);

  useEffect(() => {
    const trimmedLogo = data?.siteLogo?.trim();
    setDisplayLogo(trimmedLogo && trimmedLogo !== "" ? trimmedLogo : null);
  }, [data?.siteLogo]);

  return (
    <Link href="/" className="flex items-center gap-2">
      {displayLogo ? (
        <Image
          src={displayLogo}
          alt={data?.siteName || "Logo"}
          width={40}
          height={40}
          priority
          unoptimized
        />
      ) : (
        <h1 className="text-3xl font-bold text-secondary">
          {data?.siteName || "Website"}
        </h1>
      )}
    </Link>
  );
}
