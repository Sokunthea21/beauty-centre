import { apiFetch } from ".";

type CustomerRegisterPayload = {
  email: string;
  password: string;
}

type CustomerLoginPayload = {
  email: string;
  password: string;
}

type ApiResponse = {
  success: boolean;
  message: string;
}

type LoginResponse = {
  success: boolean;
  message: string;
  access_token: string;
  user: any; // you can replace with your User type
};

type customerVerifyPayload = {
  email: string;
  verifyCode: string;
}

type getAllCustomerPayload = {
  page: number;
  limit: number;
}

type fillCustomerProfilePayload = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  birthdate: Date | string; // send as ISO string
  addressLine: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  profileImage?: File;
}

export const customerRegister = async (
  payload: CustomerRegisterPayload
): Promise<ApiResponse> => {
  const response = await apiFetch<ApiResponse>("/customers/sign-up", {
    method: "POST",
    data: payload,
  });

  return response;
};

export const customerLogin = async (payload: CustomerLoginPayload): Promise<LoginResponse> => {
  const data = await apiFetch<LoginResponse>("/customers/sign-in", {
      method: "POST",
      data: payload,
  });

  return data;
}

export const customerRequestCode = async (payload: { email: string }): Promise<ApiResponse> => {
  const response = await apiFetch<ApiResponse>("/customers/request-verify-code", {
    method: "POST",
    data: payload,
  });

  return response;
}

export const customerVerify = async (payload: customerVerifyPayload): Promise<ApiResponse> => {
  const response = await apiFetch<ApiResponse>("/customers/verify-email", {
    method: "POST",
    data: payload,
  });

  return response;
}

export const findCustomerById = async (id: number) => {
  const response = await apiFetch(`/customers/find-customer-by-id/${id}`);

  return response;
}

export const fillCustomerProfile = async (payload: fillCustomerProfilePayload): Promise<ApiResponse> => {
  const formData = new FormData();

  formData.append("firstName", payload.firstName);
  formData.append("lastName", payload.lastName);
  formData.append("phoneNumber", payload.phoneNumber);
  formData.append("gender", payload.gender);
  formData.append("birthdate", payload.birthdate instanceof Date ? payload.birthdate.toISOString() : payload.birthdate);
  formData.append("addressLine", payload.addressLine);
  formData.append("city", payload.city);
  formData.append("province", payload.province);
  formData.append("postalCode", payload.postalCode);
  formData.append("country", payload.country);

  if (payload.profileImage) {
    formData.append("profileImage", payload.profileImage);
  }

  const response = await apiFetch<ApiResponse>("/customers/fill-profile", {
    method: "PATCH", // or POST depending on your API
    data: formData,
  }, true); // true = FormData

  return response;
}

export const getAllCustomers = async (payload?: getAllCustomerPayload) => {
  const response = await apiFetch("/customers/find-all-customers", {
    method: "POST",
    data: payload ?? {}
  });

  return response;
}