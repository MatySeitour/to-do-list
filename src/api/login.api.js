import axios from "axios";

export const loginRequest = async (user) => await axios.post("https://tasker-backend-production.up.railway.app/api/auth/login", user);

export const sendMailToRecovery = async (inputUser) => await axios.post("https://tasker-backend-production.up.railway.app/api/auth/recovery", inputUser);

export const sessionRequest = async () => await axios.get("https://tasker-backend-production.up.railway.app/api/auth/session");

export const createUserRequest = async (newUser) => await axios.post("https://tasker-backend-production.up.railway.app/api/auth/register", newUser);

export const createNewPassword = async (newPassword) => await axios.post("https://tasker-backend-production.up.railway.app/api/auth/new-password", newPassword)

export const logoutRequest = async () => await axios.get("https://tasker-backend-production.up.railway.app/api/auth/logout");

