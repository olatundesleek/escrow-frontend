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
          width={100}
          height={100}
          priority
          unoptimized
          className="rounded-md"
        />
      ) : (
        <h1 className="text-2xl font-bold text-db-primary">
          {data?.siteName || "Safe Transaction"}
        </h1>
      )}
    </Link>
  );
}
