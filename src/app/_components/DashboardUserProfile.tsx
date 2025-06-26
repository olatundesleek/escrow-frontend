"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaFlag,
  FaMailBulk,
  FaCalendarAlt,
} from "react-icons/fa";

import {
  InputField,
  InfoItem,
  PasswordField,
} from "@/app/_components/ProfileSetting";
import { FormValues } from "@/app/_types/dashboardServicesTypes";
import UserDashboardPageTitle from "./UserDashboardPageTitle";

type StatusType = "success" | "error" | "";

export default function DashboardUserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1234567890",
    role: "User",
    joined: "2024-01-01",
    avatar: "/useravartar.png",
    address: {
      address: "123 Main Street",
      city: "Lagos",
      country: "Nigeria",
      postalCode: "100001",
    },
  });

  const [avatar, setAvatar] = useState<{ preview: string; file: File | null }>({
    preview: user.avatar,
    file: null,
  });
  const [status, setStatus] = useState<{
    isSaving: boolean;
    message: string;
    type: StatusType;
  }>({ isSaving: false, message: "", type: "" });
  const [visibility, setVisibility] = useState({
    password: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      name: user.name,
      phone: user.phone,
      password: "",
      confirmPassword: "",
      address: user.address,
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () =>
        setAvatar({ preview: reader.result as string, file });
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    setStatus({ isSaving: true, message: "", type: "" });
    setTimeout(() => {
      setUser((prev) => ({ ...prev, ...data, avatar: avatar.preview }));
      setStatus({
        isSaving: false,
        message: "Profile updated successfully",
        type: "success",
      });
      reset({ ...data, password: "", confirmPassword: "" });
      setAvatar((prev) => ({ ...prev, file: null }));
    }, 1500);
  };

  const handleReset = () => {
    const confirmReset = confirm(
      "Are you sure you want to reset your changes?"
    );
    if (!confirmReset) return;

    reset({
      name: user.name,
      phone: user.phone,
      password: "",
      confirmPassword: "",
      address: user.address,
    });
    setAvatar({ preview: user.avatar, file: null });
    setStatus({ isSaving: false, message: "", type: "" });
  };

  return (
    <>
      <UserDashboardPageTitle />
      <div className="flex flex-col lg:flex-row gap-8 mt-10 w-full">
        <aside className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg flex flex-col items-center text-gray-800 relative w-full lg:w-[30%] bg-gradient-to-br from-white via-gray-50 to-gray-100">
          <div className="relative w-28 h-28 mb-4 rounded-full border border-gray-300 overflow-hidden shadow-md">
            <Image
              src={avatar.preview}
              alt="User Avatar"
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
          <label
            htmlFor="avatar-upload"
            className="text-sm text-blue-600 hover:underline cursor-pointer mb-4"
          >
            Change Photo
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />

          <div className="space-y-2 text-sm w-full mt-2">
            <div className="text-center">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
              <FaCalendarAlt />
              <span>Joined: {user.joined}</span>
            </div>
            <div className="border-t pt-4 mt-4 space-y-3 text-left w-full gap-2 flex flex-wrap justify-evenly">
              <InfoItem
                icon={FaEnvelope}
                text={user.email}
                color="text-blue-500"
              />
              <InfoItem
                icon={FaPhone}
                text={user.phone}
                color="text-green-500"
              />
              <InfoItem
                icon={FaMapMarkerAlt}
                text={user.address.address}
                color="text-red-500"
              />
              <InfoItem
                icon={FaCity}
                text={user.address.city}
                color="text-blue-400"
              />
              <InfoItem
                icon={FaFlag}
                text={user.address.country}
                color="text-yellow-600"
              />
              <InfoItem
                icon={FaMailBulk}
                text={user.address.postalCode}
                color="text-purple-500"
              />
            </div>
          </div>
        </aside>

        <main className="col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg w-full lg:w-[70%]">
          <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField
                id="name"
                label="Full Name"
                register={register("name", { required: "Name is required" })}
                error={errors.name}
              />
              <InputField
                id="phone"
                label="Phone Number"
                register={register("phone", { required: "Phone is required" })}
                error={errors.phone}
              />
              <InputField
                id="address"
                label="Street Address"
                register={register("address.address", {
                  required: "Street Address is required",
                })}
                error={errors.address?.address}
              />
              <InputField
                id="city"
                label="City"
                register={register("address.city", {
                  required: "City is required",
                })}
                error={errors.address?.city}
              />
              <InputField
                id="country"
                label="Country"
                register={register("address.country", {
                  required: "Country is required",
                })}
                error={errors.address?.country}
              />
              <InputField
                id="postalCode"
                label="Postal Code"
                register={register("address.postalCode", {
                  required: "Postal Code is required",
                })}
                error={errors.address?.postalCode}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <PasswordField
                id="password"
                label="New Password"
                register={register("password", {
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                error={errors.password}
                show={visibility.password}
                toggleShow={() =>
                  setVisibility((prev) => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
              />
              <PasswordField
                id="confirmPassword"
                label="Confirm Password"
                register={register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                error={errors.confirmPassword}
                show={visibility.confirm}
                toggleShow={() =>
                  setVisibility((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
              />
            </div>

            {status.message && (
              <div
                className={`flex items-center gap-2 text-sm ${
                  status.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status.type === "success" ? (
                  <FaCheckCircle />
                ) : (
                  <FaExclamationCircle />
                )}{" "}
                {status.message}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={status.isSaving}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {status.isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-100 px-5 py-2 rounded hover:bg-gray-200"
              >
                Reset
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
