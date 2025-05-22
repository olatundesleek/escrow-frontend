export const siteSetting = async () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/site/info`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!response.ok || response.status.toString().startsWith("4")) {
      const errorData = await response.json();
      return { ...errorData, status: errorData.status };
    }
    const data = await response.json();

    if (data && response.status === 200) return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occured";
    return { success: false, message: errorMessage };
  }
};
