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
