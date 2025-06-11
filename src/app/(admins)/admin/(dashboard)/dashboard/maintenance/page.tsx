"use client";
import AdminDashboardPageTitle from "@/app/_components/AdminDashboardPageTitle";
import MaintaianceSwitch from "@/app/_components/MaintainanceSwitchLabel";
import { useSiteSetting } from "@/app/_context/SiteSettingContext";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import axios from "axios";

type TMaintenanceReqBody = {
  enabled: boolean;
  message: string;
};

const updateMaintenance = async (payload: TMaintenanceReqBody) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/maintenance`,
      payload,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
const Page = () => {
  const siteSetting = useSiteSetting();
  const { mutateAsync } = useMutation({
    mutationKey: ["maintenance"],
    mutationFn: updateMaintenance,
  });

  const [value, setValue] = useState<string>(
    siteSetting ? siteSetting.data.maintenanceMode.message : ""
  );

  const focusRef = useRef<HTMLInputElement | null>(null);
  // const [enabled, setEnabled] = useState<boolean>(

  const [checked, setChecked] = useState<boolean>(
    siteSetting.data.maintenanceMode.enabled
  );

  const updateCheck = useCallback(setChecked, [setChecked]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value === siteSetting.data.maintenanceMode.message) {
      return;
    }
    if (value && checked)
      mutateAsync({
        enabled: checked,
        message: value,
      });
    console.log("go");
  };

  return (
    <div>
      <AdminDashboardPageTitle />
      <div className="w-full h-[40%] p-4">
        <MaintaianceSwitch
          label={"Maintainance"}
          setChecked={updateCheck}
          checked={checked}
          focusRef={focusRef.current}
        />
        <div className="description-cont flex py-8">
          <div className="w-[150px]">Details:</div>
          {/* <div className="w-">{siteSetting.data.maintenanceMode.message} </div> */}
          <input
            type="text"
            disabled={!checked}
            onChange={handleInputChange}
            placeholder="Details"
            value={value}
            className="px-[10px] py-[8px]"
            ref={focusRef}
          />
        </div>

        <button
          className="w-[100px] bg-blue-500 text-white rounded-sm p-[4px]"
          onClick={handleBtnClick}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default Page;
