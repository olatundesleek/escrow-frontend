import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { changePassword } from "../_lib/auth";
import { type FormValues } from "../_types/dashboardServicesTypes";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaFlag,
  FaMailBulk,
} from "react-icons/fa";
import toast from "react-hot-toast";
// import { getUserProfile } from "../_lib/userProfile";

type StatusType = "success" | "error" | "";

export const useUserProfileForm = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1234567890",
    role: "User",
    joined: "2024-01-01",
    avatar: "/useravartar.png", // Placeholder image
    address: "123 Main Street",
    city: "Lagos",
    country: "Nigeria",
    postalCode: "100001",
  });

  // const fetchUser = async () => {
  //   try {
  //     const user = await getUserProfile();
  //     if (!user.success) {
  //       return;
  //     }
  //     console.log(user);
  //     setUser({ ...user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

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

  const [isUpdating, setIsUpdating] = useState(false);

  const passwordRules = {
    minLength: { value: 6, message: "Minimum 6 characters" },
  };
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    isConfirm: false,
    onConfirm: () => {},
    confirmText: "", // Added confirmText to state
  });

  // For profile data
  const profileForm = useForm<FormValues>({
    defaultValues: {
      name: user.name,
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
      postalCode: user.postalCode,
    },
  });

  // For password change
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

  // Effect to reset form to current user data if user changes
  useEffect(() => {
    resetProfile({
      name: user.name,
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
      postalCode: user.postalCode,
    });
    resetPassword({
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });

    setAvatar({ preview: user.avatar, file: null });
  }, [user, resetProfile, resetPassword]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setModalContent({
          title: "File Too Large",
          message: "Please select a file under 2MB.",
          isConfirm: false,
          onConfirm: () => setIsModalOpen(false),
          confirmText: "",
        });
        setIsModalOpen(true);
        return;
      }

      if (!file.type.startsWith("image/")) {
        setModalContent({
          title: "Invalid File Type",
          message: "Please select a valid image file (e.g., PNG, JPG).",
          isConfirm: false,
          onConfirm: () => setIsModalOpen(false),
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

  const handleChangePassword = async (data: FormValues) => {
    if (data.currentPassword || data.password || data.confirmPassword) {
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
      console.log(result);
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
    }
  };
  const onUpdateProfile = (data: FormValues) => {
    setIsUpdating(true);

    // Simulate API delay
    setTimeout(() => {
      setUser((prev) => ({ ...prev, ...data, avatar: avatar.preview }));

      resetProfile({
        ...data,
        password: "",
        confirmPassword: "",
        currentPassword: "",
      });

      setAvatar((prev) => ({ ...prev, file: null }));
      setIsUpdating(false);
    }, 2000); // 2 seconds
  };

  const handleReset = () => {
    setModalContent({
      title: "Confirm Reset",
      message:
        "Are you sure you want to reset your changes? All unsaved modifications will be lost.",
      isConfirm: true,
      onConfirm: () => {
        resetProfile({
          name: user.name,
          phone: user.phone,
          address: user.address,
          city: user.city,
          country: user.country,
          postalCode: user.postalCode,
        });
        resetPassword({
          currentPassword: "",
          password: "",
          confirmPassword: "",
        });

        setAvatar({ preview: user.avatar, file: null });
        setStatus({ isSaving: false, message: "", type: "" });
        setIsModalOpen(false); // Close modal after reset
      },
      confirmText: "Reset", // Added specific confirm text
    });
    setIsModalOpen(true);
  };

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

  const inputFields = [
    {
      name: "name",
      label: "Full Name",
      placeholder: "e.g., Jane Doe",
      rules: { required: "Name is required" },
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "e.g., +123-456-7890",
      rules: { required: "Phone is required" },
    },
    {
      name: "address",
      label: "Street Address",
      placeholder: "e.g., 456 Oak Ave",
      rules: { required: "Street Address is required" },
    },
    {
      name: "city",
      label: "City",
      placeholder: "e.g., New York",
      rules: { required: "City is required" },
    },
    {
      name: "country",
      label: "Country",
      placeholder: "e.g., USA",
      rules: { required: "Country is required" },
    },
    {
      name: "postalCode",
      label: "Postal Code",
      placeholder: "e.g., 10001",
      rules: { required: "Postal Code is required" },
    },
  ];

  const userInfo = [
    { icon: FaEnvelope, text: user.email, color: "text-blue-500" },
    { icon: FaPhone, text: user.phone, color: "text-green-500" },
    { icon: FaMapMarkerAlt, text: user.address, color: "text-red-500" },
    { icon: FaCity, text: user.city, color: "text-blue-400" },
    { icon: FaFlag, text: user.country, color: "text-yellow-600" },
    {
      icon: FaMailBulk,
      text: user.postalCode,
      color: "text-purple-500",
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
