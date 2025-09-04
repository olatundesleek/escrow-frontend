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
import { getUserProfile, updateUserProfile } from "../_lib/userProfile";
import { initialUserType } from "../_types/userDashboardServicesTypes";
import { intialUserData } from "../_constants/user";

type StatusType = "success" | "error" | "";

export const useUserProfileForm = () => {
  const [user, setUser] = useState<initialUserType>(intialUserData);

  const fetchUser = async () => {
    try {
      const currentuser = await getUserProfile();
      if (!currentuser.success) {
        return;
      }

      console.log(currentuser);

      const userdata: initialUserType = {
        username: currentuser.user.data.username || "",
        email: currentuser.user.data.email || "",
        role: currentuser.user.data.role || "User",
        joined: currentuser.user.data.joined || "",
        avatar: currentuser.user.data.profilePicture || "/useravartar.png",
        city: currentuser.user.data.address?.city || "",
        streetAddress: currentuser.user.data.address.streetAddress || "",
        country: currentuser.user.data.address?.country || "",
        phone: currentuser.user.data.phone || "",
        postalCode: currentuser.user.data.address?.postalCode || "",
      };

      setUser(userdata);
    } catch {
      return;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
      city: user.city,
      streetAddress: user.streetAddress,
      country: user.country,
      phone: user.phone,
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
      city: user.city,
      streetAddress: user.streetAddress,
      country: user.country,
      phone: user.phone,
      postalCode: user.postalCode,
    });
    resetPassword({
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });

    setAvatar({ preview: user.avatar, file: null });
  }, [user, resetProfile, resetPassword]);

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

  const onUpdateProfile = async (values: FormValues) => {
    setIsUpdating(true);
    try {
      let res;

      // Check if a new file has been selected
      if (avatar.file) {
        res = await updateUserProfile(
          values.city,
          values.streetAddress,
          values.country,
          values.phone,
          values.postalCode,
          avatar.file // Pass the File object
        );
      } else {
        // Call the API without the file if no new image was selected
        res = await updateUserProfile(
          values.city,
          values.streetAddress,
          values.country,
          values.phone,
          values.postalCode
        );
      }

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      console.log(res);
      // Update the local user state with the new values
      setUser((prev) => ({
        ...prev,
        city: values.city,
        streetAddress: values.streetAddress,
        country: values.country,
        phone: values.phone,
        postalCode: values.postalCode,
        avatar: avatar.preview, // The preview is now the "real" avatar
      }));

      resetProfile(values);
      setAvatar((prev) => ({ ...prev, file: null }));
    } catch {
      toast.error("Something went wrong while updating profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReset = () => {
    setModalContent({
      title: "Confirm Reset",
      message:
        "Are you sure you want to reset your changes? All unsaved modifications will be lost.",
      isConfirm: true,
      onConfirm: () => {
        resetProfile({
          city: user.city,
          streetAddress: user.streetAddress,
          country: user.country,
          phone: user.phone,
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
      name: "city",
      label: "City",
      placeholder: "e.g., New York",
      rules: { required: "City is required" },
    },
    {
      name: "streetAddress",
      label: "Street Address",
      placeholder: "e.g., No. 9 Kemberi road",
      rules: { required: "street Address is required" },
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "e.g., +123-456-7890",
      rules: { required: "Phone is required" },
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
    {
      icon: FaEnvelope,
      text: user.email || "",
      color: "text-blue-500",
    },
    {
      icon: FaCity,
      text: user.city || "",
      color: "text-blue-400",
    },
    {
      icon: FaMapMarkerAlt,
      text: user.streetAddress || "",
      color: "text-red-500",
    },
    { icon: FaPhone, text: user.phone || "", color: "text-green-500" },
    {
      icon: FaFlag,
      text: user.country || "",
      color: "text-yellow-600",
    },
    {
      icon: FaMailBulk,
      text: user.postalCode || "",
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
