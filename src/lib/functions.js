const apiUrl = "http://localhost:4000/api";

export async function getUser(id, token) {
    const response = await fetch(`${apiUrl}/user/get/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
}

export async function getUserChats(id, token) {
    const response = await fetch(`${apiUrl}/chat/get/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
}

export async function getChat(userId, token) {
    const response = await fetch(`${apiUrl}/chat/get/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
}

export async function getChatMessage(id, token) {
    const response = await fetch(`${apiUrl}/chat/message/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
}

export async function sendMessage(chatId, message, token) {
  const response = await fetch(`${apiUrl}/chat/message/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      chatId: chatId,
      message: message
    }),
  });
  const data = await response.json();
  return data;
}