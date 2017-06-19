import * as winston from "winston";
winston.configure({
    transports: [
        new winston.transports.File({
            name: "info-file",
            filename: "info.log",
            level: "info"
        }),
        new winston.transports.File({
            name: "error-file",
            filename: "error.log",
            level: "error"
        }),
        new winston.transports.Console({
            level: "info"
        })
    ]
});

export default winston;