"use client";

import React from "react";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaInfoCircle,
} from "react-icons/fa";
import UserDashboardPageTitle from "./UserDashboardPageTitle";
import { InputField, PasswordField } from "./ProfileSetting";
import { useUserProfileForm } from "../_hooks/useUserProfileForm";
import { FormValues } from "../_types/dashboardServicesTypes";
import { Button } from "./DashboardBtn";
import useUserDashboard from "../_userFeatures/userDashboard/useUserDashboard";
import { getUserProfile } from "../_lib/userProfile";
import { useEffect } from "react";
/**
 * UserProfile Page
 *
 * Layout:
 * - Left: Profile overview (avatar, contact info, joined date).
 * - Right: Profile form (update info) + password form (change password).
 *
 * UX:
 * - Photo instantly previews when changed.
 * - Info tooltips (hover on icons).
 */
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
    isUpdating,
    status,
  } = useUserProfileForm();

  const { userDashboardData } = useUserDashboard();

  useEffect(() => {
    const fetch = async () => {
      const currentuser = await getUserProfile();
      console.log(currentuser);
    };
    fetch();
  }, []);

  const createdAt =
    userDashboardData?.dashboardDetails.data.userDashboardData.createdAt;

  const joinedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      {/* --- Page Title --- */}
      <UserDashboardPageTitle title="Profile">
        {/* Info Tooltip */}
        <div className="relative group cursor-pointer">
          <FaInfoCircle className="text-db-primary text-lg" />
          <div className="absolute right-0 top-6 w-56 p-2 bg-db-background text-xs text-db-text-secondary border border-db-border rounded-md shadow-md opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
            <p>
              <strong>Update profile:</strong> Edit your details and click{" "}
              <em>Save changes</em>.
            </p>
            <p className="mt-1">
              <strong>Reset edits:</strong> Undo unsaved changes.
            </p>
            <p className="mt-1">
              <strong>Change photo:</strong> Upload a new profile picture.
            </p>
          </div>
        </div>
      </UserDashboardPageTitle>
      <p className="mt-1 text-sm text-db-text-secondary max-w-prose">
        Review and update your personal details, security settings, and profile
        photo.
      </p>

      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        {/* ---------- LEFT: Profile Overview ---------- */}
        <aside className="w-full lg:w-1/3 bg-db-surface border border-db-border rounded-2xl p-6 shadow-sm flex flex-col items-center">
          {/* Avatar */}
          <div className="relative w-28 h-28 rounded-full overflow-hidden border border-db-border shadow-md">
            {avatar?.preview ? (
              <Image
                src={avatar.preview}
                alt={`${user?.username ?? "User"} avatar`}
                fill
                className="object-cover"
                sizes="112px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-db-background text-db-primary text-4xl">
                {user?.username?.[0]?.toUpperCase() ?? "U"}
              </div>
            )}
          </div>

          {/* Upload control */}
          <label
            htmlFor="avatar-upload"
            className="mt-4 px-3 py-2 inline-flex items-center gap-2 text-sm font-medium text-db-primary
                       bg-db-background border border-db-border rounded-full cursor-pointer
                       hover:bg-db-primary/10 transition"
          >
            Change photo
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="sr-only"
          />

          {/* Name + Role */}
          <div className="text-center mt-4">
            <h3 className="text-lg font-semibold text-db-text-primary truncate">
              {user?.username ?? "User"}
            </h3>
            <p className="text-sm text-db-text-secondary mt-1 capitalize">
              {user?.role ?? "Member"}
            </p>
          </div>

          {/* Joined Date */}
          {joinedDate && (
            <div className="flex items-center gap-2 text-xs text-db-text-secondary mt-3">
              <FaCalendarAlt className="text-db-primary shrink-0" />
              <span className="truncate">Joined {joinedDate}</span>
            </div>
          )}

          {/* Contact Info */}
          <ul className="w-full mt-6 flex flex-wrap gap-3">
            {userInfo?.length ? (
              userInfo.map((info, i) => {
                const display =
                  typeof info.text === "object"
                    ? Object.values(info.text).join(" ")
                    : info.text;
                return (
                  <li
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-md bg-db-background border border-db-border flex-1 min-w-[45%] max-w-full"
                  >
                    <info.icon className={`${info.color} text-lg shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <span className="block text-xs text-db-text-secondary">
                        {info.label}
                      </span>
                      <span className="block text-sm text-db-text-primary break-words">
                        {display}
                      </span>
                    </div>
                  </li>
                );
              })
            ) : (
              <>
                <li className="flex items-center gap-3 p-3 rounded-md bg-db-background border border-db-border flex-1 min-w-[45%]">
                  <FaEnvelope className="text-db-primary text-lg shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-db-text-secondary">Email</div>
                    <div className="text-sm break-words">
                      {user?.email ?? "Not set"}
                    </div>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-md bg-db-background border border-db-border flex-1 min-w-[45%]">
                  <FaPhone className="text-db-primary text-lg shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-db-text-secondary">Phone</div>
                    <div className="text-sm break-words">
                      {user?.phone ?? "Not set"}
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
        </aside>

        {/* ---------- RIGHT: Forms ---------- */}
        <main className="w-full lg:w-2/3 space-y-6">
          {/* Profile Form */}
          <section className="bg-db-surface border border-db-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-semibold text-db-text-primary">
                  Edit Profile
                </h2>
                <p className="text-sm text-db-text-secondary mt-1 max-w-prose">
                  Update your contact information so it’s always accurate.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleProfileSubmit(onUpdateProfile)}
              className="mt-6 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  variant="primary"
                  className="flex-1"
                  size="lg"
                >
                  {isUpdating ? "Saving…" : "Save changes"}
                </Button>
                <Button
                  type="button"
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Reset
                </Button>
              </div>

              {status?.message && (
                <div
                  role="status"
                  className={`mt-2 px-4 py-2 rounded-md text-sm shadow-sm ${
                    status.type === "success"
                      ? "bg-db-success/10 text-db-success"
                      : "bg-db-error/10 text-db-error"
                  }`}
                >
                  {status.message}
                </div>
              )}
            </form>
          </section>

          {/* Password Form */}
          <section className="bg-db-surface border border-db-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-db-text-primary">
              Change Password
            </h3>
            <p className="text-sm text-db-text-secondary mt-1 max-w-prose">
              Use a strong password that only you know.
            </p>

            <form
              onSubmit={handlePasswordSubmit(handleChangePassword)}
              className="mt-4 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <Button
                type="submit"
                disabled={status?.isSaving}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {status?.isSaving ? "Updating…" : "Change password"}
              </Button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}
