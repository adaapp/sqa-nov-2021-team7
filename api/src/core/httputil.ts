import { Response } from "express";

export const STATUS = {
    OK: 200,
    BAD_REQUEST: 400
};

export const ERROR_RESPONSE = (res: Response, message: string): void => {
    res.status(STATUS.BAD_REQUEST).json({
        status: false,
        message: message
    });
};
