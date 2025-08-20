import validator from "validator";
import { badRequest } from "./index.js";

export const IsIdInvalidResponse = () =>
    badRequest({
        message: "The provided id is not valid",
    });

export const checkIfIdIsValid = (id) => validator.isUUID(id);
