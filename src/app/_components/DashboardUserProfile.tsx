"use client";

import React from "react";
import Image from "next/image"; // Assuming Next.js Image component is available
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaCalendarAlt,
} from "react-icons/fa";

import Modal from "./Modal";
import UserDashboardPageTitle from "./UserDashboardPageTitle";
import { InputField, InfoItem, PasswordField } from "./ProfileSetting";
import { useUserProfileForm } from "../_hooks/useUserProfileForm";
import { FormValues } from "../_types/dashboardServicesTypes";
import { FieldError } from "react-hook-form";

export default function UserProfile() {
  const {
    user,
    avatar,
    userInfo,
    inputFields,
    register,
    handleSubmit,
    handleReset,
    handleAvatarChange,
    visibility,
    setIsModalOpen,
    setVisibility,
    passwordFields,
    isModalOpen,
    modalContent,
    errors,
    onSubmit,
    status,
  } = useUserProfileForm();

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
              {userInfo.map((info, index) => (
                <InfoItem
                  key={index}
                  icon={info.icon}
                  text={info.text}
                  color={info.color}
                />
              ))}
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
              {inputFields.map((field) => {
                const error = field.errorKey.startsWith("address.")
                  ? errors.address?.[
                      field.errorKey.split(
                        "."
                      )[1] as keyof FormValues["address"]
                    ]
                  : errors[field.errorKey as keyof FormValues];

                return (
                  <InputField
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    register={register(field.name, field.rules)}
                    error={error as FieldError | undefined}
                    placeholder={field.placeholder}
                  />
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-gray-200">
              {passwordFields.map((field) => {
                return (
                  <PasswordField
                    key={field.key}
                    id={field.id}
                    label={field.label}
                    placeholder={field.placeholder}
                    register={register(field.key, field.rule)}
                    error={errors[field.key]}
                    show={visibility[field.showKey as keyof typeof visibility]}
                    toggleShow={() =>
                      setVisibility((prev) => ({
                        ...prev,
                        [field.showKey]: !prev[field.showKey],
                      }))
                    }
                  />
                );
              })}
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
