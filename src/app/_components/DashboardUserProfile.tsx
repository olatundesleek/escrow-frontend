"use client"; // This directive is for Next.js, kept for context.

import React, { useState, useEffect } from "react";
import Image from "next/image"; // Assuming Next.js Image component is available
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

import Modal from "./Modal";
import UserDashboardPageTitle from "./UserDashboardPageTitle";
import { type FormValues } from "../_types/dashboardServicesTypes";
import { InputField, InfoItem, PasswordField } from "./ProfileSetting";

type StatusType = "success" | "error" | "";

export default function App() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1234567890",
    role: "User",
    joined: "2024-01-01",
    avatar: "/useravartar.png", // Placeholder image
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
    currentPassword: false,
    password: false,
    confirm: false,
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    isConfirm: false,
    onConfirm: () => {},
    confirmText: "", // Added confirmText to state
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
      currentPassword: "",
      password: "",
      confirmPassword: "",
      address: user.address,
    },
  });

  // Effect to reset form to current user data if user changes
  useEffect(() => {
    reset({
      name: user.name,
      phone: user.phone,
      address: user.address,
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });
    setAvatar({ preview: user.avatar, file: null });
  }, [user, reset]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setModalContent({
          title: "Invalid File Type",
          message: "Please select a valid image file (e.g., PNG, JPG).",
          isConfirm: false,
          onConfirm: () => setIsModalOpen(false), // Ensure modal closes
          confirmText: "",
        });
        setIsModalOpen(true);
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
      reset({
        ...data,
        password: "",
        confirmPassword: "",
        currentPassword: "",
      }); // Clear password fields
      setAvatar((prev) => ({ ...prev, file: null })); // Clear file after save
    }, 1500);
  };

  const handleReset = () => {
    setModalContent({
      title: "Confirm Reset",
      message:
        "Are you sure you want to reset your changes? All unsaved modifications will be lost.",
      isConfirm: true,
      onConfirm: () => {
        reset({
          name: user.name,
          phone: user.phone,
          password: "",
          confirmPassword: "",
          currentPassword: "",
          address: user.address,
        });
        setAvatar({ preview: user.avatar, file: null });
        setStatus({ isSaving: false, message: "", type: "" });
        setIsModalOpen(false); // Close modal after reset
      },
      confirmText: "Reset", // Added specific confirm text
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <UserDashboardPageTitle />
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 mt-6 w-full">
        {/* Aside / User Info Card */}
        <aside className="bg-white border border-gray-200 rounded-xl p-6 shadow-md flex flex-col items-center text-gray-800 relative w-full lg:w-1/3">
          <div className="relative w-28 h-28 mb-4 rounded-full border border-gray-300 overflow-hidden shadow-md">
            <Image
              src={avatar.preview}
              alt="User Avatar"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 112px" // Responsive sizes attribute
            />
          </div>
          <label
            htmlFor="avatar-upload"
            className="inline-flex items-center justify-center text-sm text-blue-600 hover:underline cursor-pointer mb-4 px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-200 font-medium"
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
            <div className="text-center mb-4">
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                {user.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 capitalize">
                {user.role}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 mt-2">
              <FaCalendarAlt className="text-gray-400" />
              <span>Joined: {user.joined}</span>
            </div>
            <div className="border-t border-gray-200 pt-6 mt-6 space-y-3 text-left w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
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

        {/* Main Content / Edit Profile Form */}
        <main className="bg-white border border-gray-200 rounded-xl p-6 shadow-md w-full lg:w-2/3">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <InputField
                id="name"
                label="Full Name"
                register={register("name", { required: "Name is required" })}
                error={errors.name}
                placeholder="e.g., Jane Doe"
              />
              <InputField
                id="phone"
                label="Phone Number"
                register={register("phone", { required: "Phone is required" })}
                error={errors.phone}
                placeholder="e.g., +123-456-7890"
              />
              <InputField
                id="address"
                label="Street Address"
                register={register("address.address", {
                  required: "Street Address is required",
                })}
                error={errors.address?.address}
                placeholder="e.g., 456 Oak Ave"
              />
              <InputField
                id="city"
                label="City"
                register={register("address.city", {
                  required: "City is required",
                })}
                error={errors.address?.city}
                placeholder="e.g., New York"
              />
              <InputField
                id="country"
                label="Country"
                register={register("address.country", {
                  required: "Country is required",
                })}
                error={errors.address?.country}
                placeholder="e.g., USA"
              />
              <InputField
                id="postalCode"
                label="Postal Code"
                register={register("address.postalCode", {
                  required: "Postal Code is required",
                })}
                error={errors.address?.postalCode}
                placeholder="e.g., 10001"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-gray-200">
              <PasswordField
                id="currentPassword"
                label="Current Password"
                register={register("currentPassword", {
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                error={errors.currentPassword}
                show={visibility.currentPassword}
                toggleShow={() =>
                  setVisibility((prev) => ({
                    ...prev,
                    currentPassword: !prev.currentPassword,
                  }))
                }
                placeholder="Enter current password"
              />
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
                placeholder="Enter new password"
              />
              <PasswordField
                id="confirmPassword"
                label="Confirm New Password" // Changed label for clarity
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
                placeholder="Confirm new password"
              />
            </div>

            {status.message && (
              <div
                className={`flex items-center gap-2 text-sm p-3 rounded-md font-medium ${
                  status.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status.type === "success" ? (
                  <FaCheckCircle className="text-lg" />
                ) : (
                  <FaExclamationCircle className="text-lg" />
                )}{" "}
                {status.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={status.isSaving}
                className="flex-1 sm:flex-none bg-[#5f27cd] text-white px-6 py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md transform hover:scale-[1.02]"
              >
                {status.isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 sm:flex-none bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all duration-200 font-semibold shadow-md transform hover:scale-[1.02]"
              >
                Reset
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* The new Headless UI Modal is used here */}
      <Modal
        isOpen={isModalOpen}
        title={modalContent.title}
        onClose={() => setIsModalOpen(false)}
        width="w-full max-w-sm" // Keep it small as per previous request
      >
        {/* Content of the modal passed as children */}
        <p className="text-gray-600 mb-6">{modalContent.message}</p>
        <div className="flex justify-end gap-3">
          {modalContent.isConfirm && (
            <button
              onClick={modalContent.onConfirm}
              className="px-4 py-2 bg-[#5f27cd] text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              {modalContent.confirmText || "Confirm"}
            </button>
          )}
          <button
            onClick={() => setIsModalOpen(false)}
            className={`px-4 py-2 rounded-md transition-colors duration-200 font-medium ${
              modalContent.isConfirm
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-[#5f27cd] text-white hover:bg-blue-800"
            }`}
          >
            {modalContent.isConfirm ? "Cancel" : "OK"}
          </button>
        </div>
      </Modal>
    </>
  );
}
