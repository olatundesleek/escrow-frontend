"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import AdminDashboardPageTitle from '@/app/_components/AdminDashboardPageTitle';
import { useSiteSetting } from '@/app/_context/SiteSettingContext';
import { Textarea } from '@headlessui/react';
import { SiteSettingData } from '@/app/_types/siteSetting';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';
import toast from 'react-hot-toast';
import Button from '@/app/_components/Button';

const handleUpdateSiteSettings = async (
  payload: Omit<
    SiteSettingData,
    '_id' | '__v' | 'createdAt' | 'updatedAt' | 'maintenanceMode'
  >,
) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`,
    payload,
    {
      withCredentials: true,
    },
  );

  return res;
};

const Page = () => {
  const siteSetting = useSiteSetting();
  const toastRef = useRef<string>('');

  const [formData, setFormData] = useState<SiteSettingData>(siteSetting.data);

  const [errors, setErrors] = useState<Record<string, string>>({});

  //simple field validators
  const isEmpty = (v: unknown) =>
    v === null || v === undefined || (typeof v === 'string' && v.trim() === '');

  const isEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  function isValidUrl(value?: string) {
    if (!value) return false;
    const v = value.trim();
    try {
      // try as-is
      new URL(v);
      return true;
    } catch {
      // try adding protocol
      try {
        new URL('https://' + v);
        return true;
      } catch {
        return false;
      }
    }
  }

  function isValidPhone(value?: string) {
    if (!value) return false;
    const digits = String(value).replace(/[^\d]/g, ''); // remove non-digits
    // accept between 7 and 15 digits (covers local and intl formats)
    return digits.length >= 7 && digits.length <= 15;
  }

  function validateForm() {
    const nextErrors: Record<string, string> = {};

    if (isEmpty(formData.siteName)) {
      nextErrors.siteName = 'Site name is required';
    }

    if (isEmpty(formData.siteEmail) || !isEmail(String(formData.siteEmail))) {
      nextErrors.siteEmail = 'Invalid email address';
    }
    if (isEmpty(formData.siteDescription)) {
      nextErrors.siteDescription = 'Site description is required';
    }

    if (isEmpty(formData.siteUrl) || !isValidUrl(String(formData.siteUrl))) {
      nextErrors.siteUrl = 'Invalid URL';
    }

    // Site phone
    if (
      isEmpty(formData.sitePhone) ||
      !isValidPhone(String(formData.sitePhone))
    ) {
      nextErrors.sitePhone = 'Invalid phone number';
    }

    if (
      isEmpty(formData.siteAddress) ||
      String(formData.siteAddress).trim().length < 5
    ) {
      nextErrors.siteAddress = 'Address is too short';
    }

    // Social links - only validate if user supplied something
    const facebook = formData.socialMediaLinks?.facebook;
    const twitter = formData.socialMediaLinks?.twitter;
    const instagram = formData.socialMediaLinks?.instagram;

    if (isEmpty(facebook) && !isValidUrl(String(facebook))) {
      nextErrors['socialMediaLinks.facebook'] = 'Invalid Facebook URL';
    }
    if (isEmpty(twitter) && !isValidUrl(String(twitter))) {
      nextErrors['socialMediaLinks.twitter'] = 'Invalid Twitter URL';
    }
    if (isEmpty(instagram) && !isValidUrl(String(instagram))) {
      nextErrors['socialMediaLinks.instagram'] = 'Invalid Instagram URL';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: handleUpdateSiteSettings,
    mutationKey: ['updatesitesetting'],
    onMutate: () => {
      toastRef.current = toast.loading('Updating site settings');
    },
    onSuccess: ({ data: { message } }) => {
      toast.success(message, {
        id: toastRef.current,
      });
    },
    onError: (err) => {
      let errMessage = 'Error updating site settings';

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errMessage = err.response.data.message;
      }

      toast.error(errMessage, { id: toastRef.current });
    },
  });

  useEffect(() => {
    setFormData(siteSetting.data); // sync local state when context changes
  }, [siteSetting.data]);

  const handleChange = (path: string, value: unknown) => {
    const keys = path.split('.');
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

    setErrors({});

    if (!validateForm()) {
      // optionally focus first errored field
      toast.error('Please fix validation errors');
      return;
    }

    const {
      socialMediaLinks,
      siteDescription,
      sitePhone,
      siteAddress,
      siteColors,
      siteUrl,
      siteEmail,
      siteLogo,
      siteName,
    } = formData;

    mutateAsync({
      socialMediaLinks,
      siteDescription,
      siteAddress,
      siteColors,
      siteEmail,
      siteLogo,
      siteName,
      sitePhone,
      siteUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <AdminDashboardPageTitle />
      <div className='w-[100%] py-[12px] bg-blue-300 px-[8px] mt-[5px] rounded-sm'>
        Site Settings
      </div>
      <div className='grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1 bg-white py-[12px] px-[12px] my-[20px] rounded-md shadow-md'>
        <Input
          label='Site name'
          value={formData.siteName}
          onChange={(e) => handleChange('siteName', e.target.value)}
          error={errors.siteName}
        />

        <div>
          <label
            htmlFor='site-logo'
            className='block text-[20px] mx-[5px] my-[8px]'
          >
            Site logo
          </label>
          <input
            type='file'
            onChange={(e) =>
              handleChange('siteLogo', e.target.files?.[0] ?? null)
            }
            className='shadow appearance-none border rounded w-full py-2 px-3'
            id='site-logo'
          />
        </div>

        <div>
          <label className='block text-[20px] mx-[5px] my-[8px]'>
            Site Description
          </label>
          <Textarea
            value={formData.siteDescription}
            onChange={(e) => handleChange('siteDescription', e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3'
          />
          {errors.siteDescription && (
            <p className='text-error text-sm mt-1'>{errors.siteDescription}</p>
          )}
        </div>

        <Input
          label='Site url'
          value={formData.siteUrl}
          onChange={(e) => handleChange('siteUrl', e.target.value)}
          error={errors.siteUrl}
        />
        <Input
          label='Site email'
          type='email'
          value={formData.siteEmail}
          onChange={(e) => handleChange('siteEmail', e.target.value)}
          error={errors.siteEmail}
        />
        <Input
          label='Site phone'
          type='tel'
          value={formData.sitePhone}
          onChange={(e) => handleChange('sitePhone', e.target.value)}
          error={errors.sitePhone}
        />
        <Input
          label='Site Address'
          value={formData.siteAddress}
          onChange={(e) => handleChange('siteAddress', e.target.value)}
          error={errors.siteAddress}
        />
        <Input
          label='Facebook url'
          value={formData.socialMediaLinks?.facebook}
          onChange={(e) =>
            handleChange('socialMediaLinks.facebook', e.target.value)
          }
          error={errors['socialMediaLinks.facebook']}
        />
        <Input
          label='Twitter url'
          value={formData.socialMediaLinks?.twitter}
          onChange={(e) =>
            handleChange('socialMediaLinks.twitter', e.target.value)
          }
          error={errors['socialMediaLinks.twitter']}
        />
        <Input
          label='Instagram url'
          value={formData.socialMediaLinks?.instagram}
          onChange={(e) =>
            handleChange('socialMediaLinks.instagram', e.target.value)
          }
          error={errors['socialMediaLinks.instagram']}
        />
        <Input
          label='Primary color'
          type='color'
          value={formData.siteColors?.primary}
          onChange={(e) => handleChange('siteColors.primary', e.target.value)}
        />
        <Input
          label='Secondary color'
          type='color'
          value={formData.siteColors?.secondary}
          onChange={(e) => handleChange('siteColors.secondary', e.target.value)}
        />
        <Input
          label='Background color'
          type='color'
          value={formData.siteColors?.background}
          onChange={(e) =>
            handleChange('siteColors.background', e.target.value)
          }
        />
        <Input
          label='Text Color'
          type='color'
          value={formData.siteColors?.text_color}
          onChange={(e) =>
            handleChange('siteColors.text_color', e.target.value)
          }
        />
      </div>

      <div>
        <Button
          type='submit'
          style='px-[12px] py-[8px] w-[80px] rounded-sm  text-center flex justify-center'
          color='bg-dashboard-secondary text-white'
          // className={`bg-dashboard-secondary px-[12px] py-[8px] w-[80px] rounded-sm text-white text-center flex justify-center cursor-pointer`}
          isLoading={isPending}
        >
          {isPending ? <SpinnerMini /> : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default Page;

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
}: {
  label: string;
  type?: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => (
  <div>
    <label htmlFor={label} className='block text-[20px] mx-[5px] my-[8px]'>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      id={label}
      className='shadow h-[60px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    />
    {error && <p className='text-error text-sm mt-1'>{error}</p>}
  </div>
);
