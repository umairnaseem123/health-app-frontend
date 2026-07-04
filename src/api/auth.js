import client from "./axiosClient";
import { mockSignup, mockLogin, mockGetMe } from "./mocks/auth.mock";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === "true";

export async function signup(email, password, fullName) {
  if (USE_MOCK) return mockSignup(email, fullName);
  const res = await client.post("/auth/signup/", {
    email,
    password,
    full_name: fullName,
  });
  return res.data.data;
}

export async function login(email, password) {
  if (USE_MOCK) return mockLogin(email, password);
  const res = await client.post("/auth/login/", { email, password });
  return res.data.data;
}

export async function getMe() {
  if (USE_MOCK) return mockGetMe();
  const res = await client.get("/auth/me/");
  return res.data.data;
}
