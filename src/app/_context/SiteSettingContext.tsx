"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SiteSettingData } from "../_types/siteSetting";
import Spinner from "../_components/Spinner";

interface SiteSettingContextProps {
  success: boolean;
  data: SiteSettingData;
  message: string;
  loading: boolean;
}

const SiteSettingContext = createContext<SiteSettingContextProps | undefined>(
  undefined
);

export const useSiteSetting = () => {
  const context = useContext(SiteSettingContext);
  if (!context) {
    throw new Error("useSiteSetting must be used within SiteSettingProvider");
  }
  return context;
};

export const SiteSettingProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<SiteSettingData>({} as SiteSettingData);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/site/info`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const result = await res.json();
        if (!res.ok) {
          setSuccess(false);
          setMessage(result.message || "Failed to load site settings");
        } else {
          setSuccess(true);
          setMessage(result.message || "");
          setData(result);
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Unexpected error";
        setSuccess(false);
        setMessage(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  return (
    <SiteSettingContext.Provider value={{ success, data, message, loading }}>
      {children}
    </SiteSettingContext.Provider>
  );
};
