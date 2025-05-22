"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { SiteSettingData } from "../_types/siteSetting";

interface siteSettingProps {
  success: boolean;
  data: object;
  message: string;
}

export const siteSettingContext = createContext<siteSettingProps | undefined>(
  undefined
);
const SiteSetting = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<SiteSettingData>({} as SiteSettingData);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const siteSetting = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/site/info`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (!response.ok || response.status.toString().startsWith("4")) {
        const errorData = await response.json();
        setMessage({ ...errorData, status: errorData.status });
        return { ...errorData, status: errorData.status };
      }
      const data = await response.json();

      if (data && response.status === 200) {
        setSuccess(true);
        setMessage(data.message);
        setData(data);
        return data;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occured";
      setSuccess(false);
      setMessage(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  useEffect(() => {
    (async () => await siteSetting())();
  }, []);

  return (
    <siteSettingContext.Provider value={{ success, data, message }}>
      {children}
    </siteSettingContext.Provider>
  );
};

export default SiteSetting;

export const useSiteSetting = () => {
  const context = useContext(siteSettingContext);
  if (!context) {
    throw new Error(
      "useSiteSetting must be used within a siteSettingContext Provider"
    );
  }
  return context;
};
