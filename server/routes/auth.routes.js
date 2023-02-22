import { Router } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { createUser, logOut, loginVerify, getUsers, recoveryPassword } from "../controllers/login.controller.js";
import { login } from "../controllers/login.controller.js";

const router = Router();

router.post("/register", createUser);

router.get("/users", getUsers);

router.post("/login", passport.authenticate("local", { session: false }), login);

router.get("/session", passport.authenticate("jwt", { session: false }), loginVerify);

router.post("/recovery", passport.authenticate("jwt", { session: false }), recoveryPassword);

router.get("/logout", logOut);


export default router;