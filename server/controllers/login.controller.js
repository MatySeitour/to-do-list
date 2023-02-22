import jwt from "jsonwebtoken";
import { config } from "../config.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import { pool } from "../db.js";
import boom from "@hapi/boom"


export const createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (username === "") {
            return res.status(500).json({
                message: "username must have at least 3 characters"
            })
        }
        else if (password === "") {
            return res.status(500).json({
                message: "password must have at least 5 characters"
            })
        }
        else if (email === "") {
            return res.status(500).json({
                message: "you need to write an email"
            })
        }
        const hash = await bcrypt.hash(password, 10);
        const [result] = await pool.query("INSERT INTO users(username, password, email) VALUES(?, ?, ?)", [username, hash, email]);
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM users");
        return res.json({
            username: result,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



export const login = async (req, res, next) => {
    try {
        const user = req.user;
        const payload = {
            id: user.id,
            username: user.user,
        }
        const token = jwt.sign(payload, config.jwtSecret);
        res.cookie("session", token);
        res.json({
            username: user.user,
        })
    }
    catch (error) {
        console.error(error)
        next(error);
    }
}

export const logOut = async (req, res, next) => {
    try {
        res.clearCookie("session");
        res.status(200).json({
            message: "log out"
        })
    }
    catch (error) {
        console.error(error)
        next(error);
    }
}

export const loginVerify = async (req, res, next) => {
    try {
        const user = req.user;
        const payload = {
            id: user.id,
            role: user.username,
        }
        const token = jwt.sign(payload, config.jwtSecret);
        res.json({
            user,
        })
    }
    catch (error) {
        next(error);
    }
}

export const recoveryPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const rta = await recoverySendMail(email);
        res.json(rta);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}

export const recoverySendMail = async (email) => {
    const user = await getEmailUser(email);
    if (!user) {
        console.log(user);
        throw boom.unauthorized();
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, config.jwtSecret);
    const link = `http://localhost:5173/recovery?token=${token}`;
    const mail = {
        from: config.EMAIL_ADDRESS, // sender address
        to: email, // list of receivers
        subject: "email to recover password", // Subject line
        html: `<b>ingresa a este link => ${link}</b>`, // html body
    }
    const rta = await sendMail(mail);
    return rta;
}

async function sendMail(infoMail) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: config.EMAIL_ADDRESS, // generated ethereal user
            pass: config.EMAIL_PASSWORD, // generated ethereal password
        },
    });

    await transporter.sendMail(infoMail);
    return { message: "mail sent" }
}

export const getEmailUser = async (email) => {
    try {
        const [result] = await pool.query(`SELECT * FROM users WHERE email="${email}"`);
        return result[0];
    }
    catch (error) {
        console.error(error)
    }
}