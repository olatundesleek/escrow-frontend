"use client";
import { FaTools } from "react-icons/fa";
import { useSiteSetting } from "../_context/SiteSettingContext";
import { useEffect, useState } from "react";

export default function Maintenance() {
  const { data } = useSiteSetting();
  const [siteName, setSiteName] = useState<string>();

  useEffect(() => {
    if (data.siteName) {
      setSiteName(data.siteName);
    }
  }, [data.siteName]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-amber-100 px-4 text-center">
      <FaTools size={64} className="mb-6 text-amber-400 animate-bounce" />
      <h1 className="text-4xl font-bold mb-4">We&#39;ll Be Back Soon!</h1>
      <p className="text-lg mb-6 max-w-xl">
        {data.maintenanceMode.message ? (
          data.maintenanceMode.message
        ) : (
          <>
            Our site is currently undergoing scheduled maintenance.
            <br />
            We appreciate your patience and understanding.
            <br />
            Please check back later.
          </>
        )}
      </p>
      <div className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} {siteName || "escrow website"} All
        rights reserved.
      </div>
    </div>
  );
}
