"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import AdminDashboardPageTitle from "@/app/_components/AdminDashboardPageTitle";
import { useSiteSetting } from "@/app/_context/SiteSettingContext";
import { Textarea } from "@headlessui/react";
import { SiteSettingData } from "@/app/_types/siteSetting";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const handleUpdateSiteSettings = async (
  payload: Omit<SiteSettingData, "maintenanceMode">
) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`,
    payload,
    {
      withCredentials: true,
    }
  );
  return res;
};
const Page = () => {
  const siteSetting = useSiteSetting();

  const [formData, setFormData] = useState<
    Omit<SiteSettingData, "maintenanceMode">
  >(siteSetting.data);
  const { mutateAsync } = useMutation({
    mutationFn: handleUpdateSiteSettings,
    mutationKey: ["updatesitesetting"],
  });

  useEffect(() => {
    setFormData(siteSetting.data); // sync local state when context changes
  }, [siteSetting.data]);

  const handleChange = (path: string, value: unknown) => {
    const keys = path.split(".");
    const lastKey = keys.pop();
    let obj = formData as Record<string, any>;
    for (const key of keys) {
      obj = obj[key] ??= {};
    }
    if (obj[lastKey!] === value) return; //
    setFormData((prev: any) => {
      const updated = structuredClone(prev);
      let ref = updated;
      for (const key of keys) {
        ref = ref[key] ??= {};
      }
      ref[lastKey!] = value;
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AdminDashboardPageTitle />
      <div className="w-[100%] py-[12px] bg-blue-300 px-[8px] mt-[5px] rounded-sm">
        Site Settings
      </div>
      <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1 bg-white py-[12px] px-[12px] my-[20px] rounded-md shadow-md">
        <Input
          label="Site name"
          value={formData.siteName}
          onChange={(e) => handleChange("siteName", e.target.value)}
        />

        <div>
          <label className="block text-[20px] mx-[5px] my-[8px]">
            Site logo
          </label>
          <input
            type="file"
            onChange={(e) =>
              handleChange("siteLogo", e.target.files?.[0] ?? null)
            }
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-[20px] mx-[5px] my-[8px]">
            Site Description
          </label>
          <Textarea
            value={formData.siteDescription}
            onChange={(e) => handleChange("siteDescription", e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>

        <Input
          label="Site url"
          value={formData.siteUrl}
          onChange={(e) => handleChange("siteUrl", e.target.value)}
        />
        <Input
          label="Site email"
          type="email"
          value={formData.siteEmail}
          onChange={(e) => handleChange("siteEmail", e.target.value)}
        />
        <Input
          label="Site phone"
          type="tel"
          value={formData.sitePhone}
          onChange={(e) => handleChange("sitePhone", e.target.value)}
        />
        <Input
          label="Site Address"
          value={formData.siteAddress}
          onChange={(e) => handleChange("siteAddress", e.target.value)}
        />
        <Input
          label="Facebook url"
          value={formData.socialMediaLinks?.facebook}
          onChange={(e) =>
            handleChange("socialMediaLinks.facebook", e.target.value)
          }
        />
        <Input
          label="Twitter url"
          value={formData.socialMediaLinks?.twitter}
          onChange={(e) =>
            handleChange("socialMediaLinks.twitter", e.target.value)
          }
        />
        <Input
          label="Instagram url"
          value={formData.socialMediaLinks?.instagram}
          onChange={(e) =>
            handleChange("socialMediaLinks.instagram", e.target.value)
          }
        />
        <Input
          label="Primary color"
          type="color"
          value={formData.siteColors?.primary}
          onChange={(e) => handleChange("siteColors.primary", e.target.value)}
        />
        <Input
          label="Secondary color"
          type="color"
          value={formData.siteColors?.secondary}
          onChange={(e) => handleChange("siteColors.secondary", e.target.value)}
        />
        <Input
          label="Background color"
          type="color"
          value={formData.siteColors?.background}
          onChange={(e) =>
            handleChange("siteColors.background", e.target.value)
          }
        />
        <Input
          label="Text Color"
          type="color"
          value={formData.siteColors?.text_color}
          onChange={(e) =>
            handleChange("siteColors.text_color", e.target.value)
          }
        />
      </div>

      <div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-dashboard-secondary px-[12px] py-[8px] w-[80px] rounded-sm text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Page;

const Input = ({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label className="block text-[20px] mx-[5px] my-[8px]">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="shadow h-[60px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);
