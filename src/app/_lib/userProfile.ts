export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// Fetch user profile
export const getUserProfile = async (): Promise<ApiResponse | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message };
    }

    return { success: true, message: data.message, data: data.user.data };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// Update user profile
export const updateUser = async ({
  streetAddress,
  city,
  state,
  country,
  postalCode,
  phone,
  profilePicture,
}: {
  streetAddress: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  phone: string;
  profilePicture?: File;
}): Promise<ApiResponse> => {
  try {
    const formData = new FormData();

    // Order matches input fields
    formData.append("streetAddress", streetAddress);
    formData.append("city", city);
    if (state) formData.append("state", state);
    formData.append("country", country);
    formData.append("postalCode", postalCode);
    formData.append("phone", phone);

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
      {
        method: "PUT",
        credentials: "include",
        body: formData,
      }
    );

    const data = await response.json();

    console.log("UserData: ", data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to update profile",
      };
    }

    return {
      success: true,
      message: data.message || "Profile updated",
      data: data.user,
    };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, message: "Unexpected error" };
  }
};
