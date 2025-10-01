import { apiFetch } from ".";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  message: string;
  access_token: string;
  user: any; // you can replace with your User type
};

export const authLogin = async (payload: LoginPayload): Promise<LoginResponse> => {
  const data = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    data: payload,
  });

  if (data.access_token) {
    localStorage.setItem("token", data.access_token);
  }

  return data;
};

export const authLogout = () => {
  localStorage.removeItem("token");
};

type CreateUserPayload = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  profileImage?: File; // optional file
};

export const createUser = async (user: CreateUserPayload) => {
  const formData = new FormData();
  formData.append("firstName", user.firstName);
  formData.append("lastName", user.lastName);
  formData.append("username", user.username);
  formData.append("password", user.password);

  if (user.profileImage) {
    formData.append("profileImage", user.profileImage);
  }

  return await apiFetch("/users", {
    method: "POST",
    data: formData,
  }, true); // 👈 true because it's FormData
};
