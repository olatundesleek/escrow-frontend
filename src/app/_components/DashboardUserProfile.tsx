"use client";

import React from "react";
import Image from "next/image"; // Assuming Next.js Image component is available
import { FaCalendarAlt } from "react-icons/fa";
import Modal from "./Modal";
import UserDashboardPageTitle from "./UserDashboardPageTitle";
import { InputField, PasswordField } from "./ProfileSetting";
import { useUserProfileForm } from "../_hooks/useUserProfileForm";
import { FormValues } from "../_types/dashboardServicesTypes";
import useUserDashboard from "../_userFeatures/userDashboard/useUserDashboard";

export default function UserProfile() {
  const {
    user,
    userInfo,
    avatar,
    inputFields,
    passwordFields,
    registerProfile,
    handleProfileSubmit,
    profileErrors,
    registerPassword,
    handlePasswordSubmit,
    passwordErrors,
    handleAvatarChange,
    handleChangePassword,
    onUpdateProfile,
    handleReset,
    visibility,
    setVisibility,
    isModalOpen,
    setIsModalOpen,
    modalContent,
    isUpdating,
    status,
  } = useUserProfileForm();

  const { userDashboardData } = useUserDashboard();

  const joinedDate = new Date(
    userDashboardData?.dashboardDetails.data.createdAt ?? ""
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <UserDashboardPageTitle />
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 mt-6 w-full">
        {/* Aside / User Info Card */}
        <aside className="bg-white border border-gray-200 rounded-xl p-6 shadow-md flex flex-col items-center text-gray-800 relative w-full lg:w-1/3">
          <div className="relative w-28 h-28 mb-4 rounded-full border border-gray-300 overflow-hidden shadow-md">
            {avatar.preview && (
              <Image
                src={avatar.preview ?? null}
                alt="User Avatar"
                width={112}
                height={112}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 112px"
                style={{ borderRadius: "9999px" }}
              />
            )}
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
                {user.username}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 capitalize">
                {user.role}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 mt-2">
              <FaCalendarAlt className="text-gray-400" />
              <span>Joined: {joinedDate}</span>
            </div>
            <ul className="border-t border-gray-200 pt-6 mt-6 space-y-3 text-left w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
              <>
                {userInfo.map((info, index) => {
                  let displayText = info.text;
                  if (typeof displayText === "object" && displayText !== null) {
                    displayText = Object.values(displayText).join(" ");
                  }
                  return (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-700 w-full sm:w-auto p-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="flex gap-2">
                        <info.icon className={`${info.color} text-lg`} />
                        {info.text}
                      </span>
                    </li>
                  );
                })}
              </>
            </ul>
          </div>
        </aside>

        {/* Main Content / Edit Profile Form */}
        <main className="bg-white border border-gray-200 rounded-xl p-6 shadow-md w-full lg:w-2/3">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
            Edit Profile
          </h2>
          {/* Profile Update Form */}
          <form
            onSubmit={handleProfileSubmit(onUpdateProfile)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {inputFields.map((field) => {
                const error = profileErrors[field.name as keyof FormValues];
                return (
                  <InputField
                    key={field.name}
                    id={field.name}
                    label={field.label}
                    register={registerProfile(
                      field.name as keyof FormValues,
                      field.rules
                    )}
                    error={error}
                    placeholder={field.placeholder}
                  />
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                disabled={isUpdating}
                className="flex-1 sm:flex-none bg-[#5f27cd] text-white px-6 py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md transform hover:scale-[1.02]"
              >
                {isUpdating ? "Saving..." : "Update Profile"}
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

          {/* Password Change Form */}
          <form
            onSubmit={handlePasswordSubmit(handleChangePassword)}
            className="space-y-6 mt-10 pt-6 border-t border-gray-200"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {passwordFields.map((field) => (
                <PasswordField
                  key={field.name}
                  id={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  register={registerPassword(field.name, field.rules)}
                  error={passwordErrors[field.name]}
                  show={visibility[field.name as keyof typeof visibility]}
                  toggleShow={() =>
                    setVisibility((prev) => ({
                      ...prev,
                      [field.name]: !prev[field.name as keyof typeof prev],
                    }))
                  }
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={status.isSaving}
              className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md transform hover:scale-[1.02]"
            >
              {status.isSaving ? "Changing..." : "Change Password"}
            </button>
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
