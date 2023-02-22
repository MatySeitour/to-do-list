import axios from "axios";

export const loginRequest = async (user) => await axios.post("/api/auth/login", user);

export const sessionRequest = async () => await axios.get("/api/auth/session");

export const createUserRequest = async (newUser) => await axios.post("/api/auth/register", newUser);

export const logoutRequest = async () => await axios.get("/api/auth/logout");

