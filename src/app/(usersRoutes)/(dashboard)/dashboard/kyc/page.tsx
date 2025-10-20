"use client";

import UserDashboardPageTitle from "@/app/_components/UserDashboardPageTitle";
import DashboardUserKYC from "@/app/_components/DashboardUserKYC";
import { useUserProfileForm } from "@/app/_hooks/useUserProfileForm";

export default function KYCPage() {
  const { currUser: currentUserData } = useUserProfileForm();

  if (!currentUserData)
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading user data...
      </div>
    );

  const user = {
    username: currentUserData?.username || "anonymous",
    applicant: {
      firstname: currentUserData?.firstname || "",
      lastname: currentUserData?.lastname || "",
      phone: currentUserData?.phone || "",
      email: currentUserData?.email || "",
    },
  };

  return (
    <main className="w-full h-full bg-db-background">
      <UserDashboardPageTitle/>
      <DashboardUserKYC username={user.username} applicant={user.applicant} />
    </main>
  );
}
