export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export const getUserProfile = async () => {
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

    if (!response.ok) {
      const data = await response.json();
      return { success: false, message: data.message };
    }

    const data = await response.json();
    console.log(data);
    return { success: true, message: data.message, ...data };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (
  city: string,
  streetAddress: string,
  country: string,
  phone: string,
  postalCode: string,
  profilePicture?: File
) => {
  try {
    const formData = new FormData();

    // Append all text fields to the FormData object
    formData.append("city", city);
    formData.append("streetAddress", streetAddress);
    formData.append("country", country);
    formData.append("phone", phone);
    formData.append("postalCode", postalCode);

    // Append the file to the FormData object
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
      {
        method: "PUT",
        credentials: "include",
        // the browser will set it automatically set Content-Type header;
        body: formData,
      }
    );

    const data = await response.json();

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
