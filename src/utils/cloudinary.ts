export const uploadFileToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
  if (!uploadPreset) {
    throw new Error("NEXT_PUBLIC_CLOUDINARY_PRESET is not defined");
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
  if (!cloudName) {
    throw new Error("NEXT_PUBLIC_CLOUD_NAME is not defined");
  }

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
