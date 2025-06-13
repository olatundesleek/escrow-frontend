"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import UserDashboardPageTitle from "./UserDashboardPageTitle";

type FormValues = {
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: { message?: string };
  type?: string;
}

const InputField = ({
  label,
  id,
  register,
  error,
  type = "text",
  ...props
}: InputFieldProps) => (
  <div>
    <label htmlFor={id} className="block font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      {...register}
      {...props}
      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
    />
    {error && <p className="text-red-600 text-xs">{error.message}</p>}
  </div>
);

interface PasswordFieldProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: { message?: string };
  show: boolean;
  toggleShow: () => void;
}

const PasswordField = ({
  id,
  label,
  register,
  error,
  show,
  toggleShow,
}: PasswordFieldProps) => (
  <div>
    <label htmlFor={id} className="block font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        {...register}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10"
        placeholder="********"
      />
      <button
        type="button"
        tabIndex={-1}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
        onClick={toggleShow}
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
    {error && <p className="text-red-600 text-xs">{error.message}</p>}
  </div>
);

export default function DashboardUserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1234567890",
    role: "User",
    joined: "2024-01-01",
    avatar: "/useravartar.png",
  });

  const [avatar, setAvatar] = useState({
    preview: user.avatar,
    file: null as File | null,
  });

  const [status, setStatus] = useState({
    isSaving: false,
    message: "",
    type: "" as "success" | "error" | "",
  });

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
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setAvatar({ preview: reader.result as string, file });
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    setStatus({ isSaving: true, message: "", type: "" });

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", user.email);
    formData.append("phone", data.phone);
    if (data.password) formData.append("password", data.password);
    if (avatar.file) formData.append("avatar", avatar.file);

    setTimeout(() => {
      setUser((prev) => ({
        ...prev,
        name: data.name,
        phone: data.phone,
        avatar: avatar.preview,
      }));
      setStatus({
        isSaving: false,
        message: "Profile updated successfully",
        type: "success",
      });
      reset({ ...data, password: "", confirmPassword: "" });
      setAvatar((prev) => ({ ...prev, file: null }));
    }, 2000);
  };

  const handleReset = () => {
    reset({
      name: user.name,
      phone: user.phone,
      password: "",
      confirmPassword: "",
    });
    setAvatar({ preview: user.avatar, file: null });
    setStatus({ isSaving: false, message: "", type: "" });
  };

  return (
    <>
      <UserDashboardPageTitle />

      <div className="flex flex-col md:flex-row gap-6 mt-10 items-start">
        {/* Profile Card */}
        <section className="w-full md:w-[420px] bg-white shadow-md border border-gray-200 rounded-md p-6 flex flex-col items-center">
          <div className="w-24 h-24 relative mb-4">
            <Image
              src={avatar.preview}
              alt="User Avatar"
              fill
              className="object-cover rounded-full"
              sizes="96px"
            />
          </div>
          <label
            htmlFor="avatar-upload"
            className="text-blue-600 text-sm mb-4 cursor-pointer"
          >
            Change Avatar
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <main className="w-full mt-4 bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg shadow-inner p-4">
            <h2 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
              <span className="bg-blue-100 rounded-full px-3 py-1 text-blue-600 text-sm">
                Username
              </span>
              <span>{user.name}</span>
            </h2>
            <div className="flex flex-col gap-1 text-gray-700">
              <p>
                <strong>Contact:</strong> {user.phone}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                <span className="bg-amber-100 px-2 py-0.5 text-xs rounded text-amber-700">
                  {user.role}
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Joined: <span className="font-medium">{user.joined}</span>
              </p>
            </div>
          </main>
        </section>

        {/* Form Section */}
        <section className="flex-1 bg-white border border-gray-200 rounded-md p-6 shadow-md w-full">
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              id="name"
              label="Full Name"
              register={register("name", { required: "Name is required" })}
              error={errors.name}
            />
            <InputField
              id="phone"
              label="Phone"
              register={register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[\d+\-() ]+$/,
                  message: "Invalid phone number",
                },
              })}
              error={errors.phone}
            />
            <PasswordField
              id="password"
              label="New Password"
              register={register("password", {
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={errors.password}
              show={visibility.password}
              toggleShow={() =>
                setVisibility((prev) => ({ ...prev, password: !prev.password }))
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
                setVisibility((prev) => ({ ...prev, confirm: !prev.confirm }))
              }
            />

            {status.message && (
              <p
                className={`flex items-center gap-2 text-sm ${
                  status.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status.type === "success" ? (
                  <FaCheckCircle />
                ) : (
                  <FaExclamationCircle />
                )}
                {status.message}
              </p>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={status.isSaving}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {status.isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition"
              >
                Reset
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
