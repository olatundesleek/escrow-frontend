// useUserProfileForm.ts
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { changePassword } from "../_lib/auth";
import type { FormValues } from "../_types/dashboardServicesTypes";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaFlag,
  FaMailBulk,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { getUserProfile, updateUser } from "../_lib/userProfile";
import type {
  initialUserType,
  User,
} from "../_types/userDashboardServicesTypes";

type StatusType = "success" | "error" | "";

type ModalContent = {
  title: string;
  message: string;
  isConfirm: boolean;
  onConfirm: () => void;
  confirmText?: string;
};

export const useUserProfileForm = () => {
  // user can be null until fetched
  const [user, setUser] = useState<initialUserType | null>(null);

  const fetchUser = async () => {
    try {
      const currentuser = await getUserProfile();

      if (!currentuser?.success) return;

      const userdata = currentuser.data as User;
      console.log("fetched user:", userdata);
      // normalize into flat structure for the form
      const normalizedUser: initialUserType = {
        username: userdata.username ?? "",
        email: userdata.email ?? "",
        phone: userdata.phone ?? "",
        role: userdata.role ?? "",
        joined: "",
        avatar: userdata.profilePicture ?? "",
        streetAddress: userdata.address?.streetAddress ?? "",
        city: userdata.address?.city ?? "",
        country: userdata.address?.country ?? "",
        state: userdata.address?.state ?? "",
        postalCode: userdata.address?.postalCode ?? "",
      };

      setUser(normalizedUser);
    } catch (err) {
      console.error("fetchUser error", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // avatar preview + file
  const [avatar, setAvatar] = useState<{ preview: string; file: File | null }>({
    preview: "",
    file: null,
  });

  // sync avatar preview when user loads
  useEffect(() => {
    if (user?.avatar) setAvatar({ preview: user.avatar, file: null });
  }, [user?.avatar]);

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

  const [isUpdating, setIsUpdating] = useState(false);

  const passwordRules = {
    minLength: { value: 6, message: "Minimum 6 characters" },
  };

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    title: "",
    message: "",
    isConfirm: false,
    onConfirm: () => {},
    confirmText: "Confirm",
  });

  // ----------------------------
  // Forms (react-hook-form)
  // ----------------------------
  const profileForm = useForm<FormValues>({
    defaultValues: {
      streetAddress: user?.streetAddress ?? "",
      city: user?.city ?? "",
      state: user?.state ?? "",
      country: user?.country ?? "",
      phone: user?.phone ?? "",
      postalCode: user?.postalCode ?? "",
    },
  });

  const passwordForm = useForm<FormValues>({
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = profileForm;

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
    watch,
  } = passwordForm;

  // whenever user data updates, reset form values and avatar preview
  useEffect(() => {
    resetProfile({
      streetAddress: user?.streetAddress ?? "",
      city: user?.city ?? "",
      state: user?.state ?? "",
      country: user?.country ?? "",
      phone: user?.phone ?? "",
      postalCode: user?.postalCode ?? "",
    });

    resetPassword({
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });

    setAvatar((prev) => ({ preview: user?.avatar ?? "", file: prev.file }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // ----------------------------
  // Password change
  // ----------------------------
  const handleChangePassword = async (data: FormValues) => {
    if (!data.currentPassword && !data.password && !data.confirmPassword)
      return;

    setStatus({ isSaving: true, message: "", type: "" });

    if (data.password !== data.confirmPassword) {
      setStatus({
        isSaving: false,
        message: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    const result = await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.password,
      confirmNewPassword: data.confirmPassword,
    });

    if (!result.success) {
      setStatus({ isSaving: false, message: result.message, type: "error" });
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setStatus({
      isSaving: false,
      message: "Password changed successfully.",
      type: "success",
    });

    resetPassword({
      ...watch(),
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });
  };

  // ----------------------------
  // Avatar change: preview + immediate upload
  // ----------------------------
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File too large. Max 2MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type. Please upload an image.");
      return;
    }

    // show preview immediately
    const reader = new FileReader();
    reader.onload = () => setAvatar({ preview: reader.result as string, file });
    reader.readAsDataURL(file);

    setAvatar((prev) => ({ ...prev, file: null }));
  };

  // ----------------------------
  // Profile update (text fields)
  // ----------------------------
  const onUpdateProfile = async (values: FormValues) => {
    setIsUpdating(true);
    try {
      // Build a plain object with only changed/needed keys
      const payload = {
        streetAddress: "",
        city: "",
        state: "",
        username: "",
        country: "",
        phone: "",
        postalCode: "",
        email: "",
        profilePicture: avatar.file || undefined,
      };

      if (typeof values.streetAddress === "string")
        payload.streetAddress = values.streetAddress;
      if (typeof values.city === "string") payload.city = values.city;
      if (typeof values.state === "string") payload.state = values.state;
      if (typeof values.country === "string") payload.country = values.country;
      if (typeof values.phone === "string") payload.phone = values.phone;
      if (typeof values.postalCode === "string")
        payload.postalCode = values.postalCode;
      if (typeof values.profilePicture === "object")
        payload.profilePicture = values.profilePicture;

      const res = await updateUser(payload); // updateUser handles JSON or FormData

      if (!res?.success) {
        toast.error(res?.message ?? "Failed to update profile");
        return;
      }

      // merge returned data (best-effort)
      setUser((prev) => {
        const updated = res.data ?? {};
        return prev ? { ...prev, ...updated } : (updated as initialUserType);
      });

      toast.success(res.message ?? "Profile updated");
      resetProfile(values);
    } catch (err) {
      console.error("Profile update failed", err);
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  // ----------------------------
  // Reset confirmation
  // ----------------------------
  const handleReset = () => {
    setModalContent({
      title: "Confirm Reset",
      message:
        "Are you sure you want to reset your changes? All unsaved modifications will be lost.",
      isConfirm: true,
      onConfirm: () => {
        resetProfile({
          streetAddress: user?.streetAddress ?? "",
          city: user?.city ?? "",
          state: user?.state ?? "",
          country: user?.country ?? "",
          phone: user?.phone ?? "",
          postalCode: user?.postalCode ?? "",
        });
        resetPassword({
          currentPassword: "",
          password: "",
          confirmPassword: "",
        });
        setAvatar({ preview: user?.avatar ?? "", file: null });
        setStatus({ isSaving: false, message: "", type: "" });
        setIsModalOpen(false);
      },
      confirmText: "Reset",
    });
    setIsModalOpen(true);
  };

  // ----------------------------
  // Fields order + helpers for forms & UI
  // ----------------------------
  const inputFields = [
    {
      name: "streetAddress",
      label: "Street Address",
      placeholder: "e.g., No. 9 Kemberi road",
      rules: { required: "Street Address is required" },
    },
    {
      name: "city",
      label: "City",
      placeholder: "e.g., New York",
      rules: { required: "City is required" },
    },
    {
      name: "state",
      label: "State",
      placeholder: "e.g., California",
      rules: { required: "State is required" },
    },
    {
      name: "country",
      label: "Country",
      placeholder: "e.g., USA",
      rules: { required: "Country is required" },
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "e.g., +123-456-7890",
      rules: { required: "Phone is required" },
    },
    {
      name: "postalCode",
      label: "Postal Code",
      placeholder: "e.g., 10001",
      rules: { required: "Postal Code is required" },
    },
  ];

  const passwordFields = [
    {
      name: "currentPassword",
      label: "Current Password",
      placeholder: "Enter current password",
      rules: passwordRules,
    },
    {
      name: "password",
      label: "New Password",
      placeholder: "Enter new password",
      rules: passwordRules,
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "Confirm new password",
      rules: {
        validate: (value: string) =>
          value === watch("password") || "Passwords do not match",
      },
    },
  ] as const;

  const userInfo = [
    {
      icon: FaFlag,
      text: user?.country ?? "",
      color: "text-yellow-600",
      label: "Country",
    },
    {
      icon: FaFlag,
      text: user?.state ?? "",
      color: "text-orange-500",
      label: "State",
    },
    {
      icon: FaCity,
      text: user?.city ?? "",
      color: "text-blue-400",
      label: "City",
    },
    {
      icon: FaMapMarkerAlt,
      text: user?.streetAddress ?? "",
      color: "text-red-500",
      label: "Street",
    },
    {
      icon: FaMailBulk,
      text: user?.postalCode ?? "",
      color: "text-purple-500",
      label: "Postal code",
    },
    {
      icon: FaPhone,
      text: user?.phone ?? "",
      color: "text-green-500",
      label: "Phone",
    },
    {
      icon: FaEnvelope,
      text: user?.email ?? "",
      color: "text-blue-500",
      label: "Email",
    },
  ];

  return {
    user,
    userInfo,
    avatar,
    inputFields,
    passwordFields,
    registerProfile,
    handleProfileSubmit,
    resetProfile,
    profileErrors,
    registerPassword,
    handlePasswordSubmit,
    resetPassword,
    passwordErrors,
    watch,
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
  };
};
