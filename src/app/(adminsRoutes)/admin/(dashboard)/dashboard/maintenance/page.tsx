'use client';
import AdminDashboardPageTitle from '@/app/_components/AdminDashboardPageTitle';
import MaintaianceSwitch from '@/app/_components/MaintainanceSwitchLabel';
import { useSiteSetting } from '@/app/_context/SiteSettingContext';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';

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
      },
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
const Page = () => {
  const siteSetting = useSiteSetting();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['maintenance'],
    mutationFn: updateMaintenance,
  });

  const [value, setValue] = useState<string>(
    siteSetting ? siteSetting.data.maintenanceMode?.message : '',
  );

  const focusRef = useRef<HTMLInputElement | null>(null);
  // const [enabled, setEnabled] = useState<boolean>(

  const [checked, setChecked] = useState<boolean>(
    siteSetting.data.maintenanceMode?.enabled,
  );

  const updateCheck = useCallback(setChecked, [setChecked]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (value)
      mutateAsync({
        enabled: checked,
        message: value,
      });
  };

  return (
    <div>
      <AdminDashboardPageTitle />
      <div className='w-full h-[40%] p-4'>
        <MaintaianceSwitch
          label={'Maintainance'}
          setChecked={updateCheck}
          checked={checked}
          focusRef={focusRef.current}
          bg='bg-dashboard-secondary'
        />
        <div className='description-cont flex py-8'>
          <div className='w-[150px]'>Details:</div>
          {/* <div className="w-">{siteSetting.data.maintenanceMode.message} </div> */}
          <input
            type='text'
            disabled={!checked}
            onChange={handleInputChange}
            placeholder='Details'
            value={value}
            className='px-[10px] py-[8px] text-dashboard-secondary'
            ref={focusRef}
          />
        </div>

        <button
          className='w-[100px] bg-dashboard-secondary text-white rounded-sm p-[4px] flex justify-center'
          onClick={handleBtnClick}
        >
          {isPending ? <SpinnerMini /> : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default Page;
