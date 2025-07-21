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
    address: {
      address: "123 Main Street",
      city: "Lagos",
      country: "Nigeria",
      postalCode: "100001",
    },
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

  const onSubmit = async (data: FormValues) => {
    setStatus({ isSaving: true, message: "", type: "" });

    if (data.currentPassword || data.password || data.confirmPassword) {
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
        return;
      }
    }

    // Continue with profile update
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
      });

      setAvatar((prev) => ({ ...prev, file: null }));
    }, 1000);
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

  const passwordFields = [
    {
      id: "currentPassword",
      label: "Current Password",
      placeholder: "Enter current password",
      rule: passwordRules,
      key: "currentPassword",
      showKey: "currentPassword",
    },
    {
      id: "password",
      label: "New Password",
      placeholder: "Enter new password",
      rule: passwordRules,
      key: "password",
      showKey: "password",
    },
    {
      id: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "Confirm new password",
      rule: {
        validate: (value: string) =>
          value === watch("password") || "Passwords do not match",
      },
      key: "confirmPassword",
      showKey: "confirm",
    },
  ] as const;

  const inputFields = [
    {
      id: "name",
      label: "Full Name",
      name: "name",
      errorKey: user.name,
      placeholder: "e.g., Jane Doe",
      rules: { required: "Name is required" },
    },
    {
      id: "phone",
      label: "Phone Number",
      name: "phone",
      errorKey: user.phone,
      placeholder: "e.g., +123-456-7890",
      rules: { required: "Phone is required" },
    },
    {
      id: "address",
      label: "Street Address",
      name: "address.address",
      errorKey: user.address.address,
      placeholder: "e.g., 456 Oak Ave",
      rules: { required: "Street Address is required" },
    },
    {
      id: "city",
      label: "City",
      name: "address.city",
      errorKey: user.address.city,
      placeholder: "e.g., New York",
      rules: { required: "City is required" },
    },
    {
      id: "country",
      label: "Country",
      name: "address.country",
      errorKey: user.address.country,
      placeholder: "e.g., USA",
      rules: { required: "Country is required" },
    },
    {
      id: "postalCode",
      label: "Postal Code",
      name: "address.postalCode",
      errorKey: user.address.postalCode,
      placeholder: "e.g., 10001",
      rules: { required: "Postal Code is required" },
    },
  ] as const;

  const userInfo = [
    { icon: FaEnvelope, text: user.email, color: "text-blue-500" },
    { icon: FaPhone, text: user.phone, color: "text-green-500" },
    { icon: FaMapMarkerAlt, text: user.address.address, color: "text-red-500" },
    { icon: FaCity, text: user.address.city, color: "text-blue-400" },
    { icon: FaFlag, text: user.address.country, color: "text-yellow-600" },
    {
      icon: FaMailBulk,
      text: user.address.postalCode,
      color: "text-purple-500",
    },
  ];

  return {
    user,
    userInfo,
    inputFields,
    avatar,
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
  };
};
