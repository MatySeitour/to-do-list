import axios from "axios";

export const loginRequest = async (user) => await axios.post("/api/auth/login", user);

export const sendMailToRecovery = async (inputUser) => await axios.post("/api/auth/recovery", inputUser);

export const sessionRequest = async () => await axios.get("/api/auth/session");

export const createUserRequest = async (newUser) => await axios.post("/api/auth/register", newUser);

export const createNewPassword = async (newPassword) => await axios.post("/api/auth/new-password", newPassword)

export const logoutRequest = async () => await axios.get("/api/auth/logout");

