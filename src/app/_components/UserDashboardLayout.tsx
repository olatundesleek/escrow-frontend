"use client";

import { useState } from "react";
import UserDashboardHeader from "@/app/_components/UserDashboardHeader";
import UserSidebar from "@/app/_components/UserSidebar";
import useGetCurrentUser from "../_hooks/useGetCurrentUser";
import FullPageLoader from "./FullPageLoader";
import toast from "react-hot-toast";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { isGetCurrentUserLoading, isError } = useGetCurrentUser();

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Base layout classes: Grid for larger screens, flex column for smaller
  const layoutClasses = `
    flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-purple-50
    lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr] lg:h-screen
  `;

  // Main content area classes
  const mainContentClasses = `
    w-full max-w-screen-xl mx-auto 
    flex flex-col gap-6 p-38
    px-4 
    pb-16
    overflow-y-auto 
    flex-grow
    lg:px-8 lg:pt-8
  `;

  return (
    <div className={layoutClasses}>
      {/* UserDashboardHeader will typically be fixed/sticky at the top */}
      <UserDashboardHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* UserSidebar as an overlay or fixed element */}
      <UserSidebar
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={handleCloseSidebar}
      />

      {/* Main content area */}
      <main className={mainContentClasses}>
        {isGetCurrentUserLoading && (
          <div className="flex h-full items-center justify-center">
            <FullPageLoader />
          </div>
        )}

        {isError && (
          <div className="flex h-full flex-col items-center justify-center text-center p-4">
            {/* Using toast for notifications, but showing a visible error message is also good UX */}
            {toast.error("Error getting data. Please refresh!")}
            <p className="mt-4 text-lg text-red-600 font-semibold">
              Failed to load dashboard data.
            </p>
            <p className="text-sm text-red-500">
              Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-md transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Refresh Page
            </button>
          </div>
        )}

        {/* Render children only when data is loaded and no error */}
        {!isGetCurrentUserLoading && !isError && children}
      </main>
    </div>
  );
}
