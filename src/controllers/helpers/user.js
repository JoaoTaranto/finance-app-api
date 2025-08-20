import { badRequest, notFound } from "./http.js";
import validator from "validator";

export const emailIsInvalidResponse = () =>
    badRequest({
        message: "Invalid e-mail. Please provide a valid one",
    });

export const passwordIsInvalidResponse = () =>
    badRequest({
        message: "Password must be at least 6 characters",
    });

export const userNotFoundResponse = () =>
    notFound({
        message: "User not found!",
    });

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const checkIfPasswordIsValid = (password) => password.length >= 6;
