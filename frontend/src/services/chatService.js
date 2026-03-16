export const fetchChats = async (userId) => {
  try {
    const res = await fetch(`https://rent-mate-backend.vercel.app/api/chats/${userId}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching chats:", err);
    return [];
  }
};

export const fetchMessages = async (chatId) => {
  try {
    const res = await fetch(`https://rent-mate-backend.vercel.app/api/messages/${chatId}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching messages:", err);
    return [];
  }
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file, file.name);
  try {
    const res = await fetch("https://rent-mate-backend.vercel.app/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data?.url ? `https://rent-mate-backend.vercel.app${data.url}` : null;
  } catch (err) {
    console.error("File upload failed:", err);
    return null;
  }
};
