import { createTransport } from "nodemailer";

const transporter = createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "",
        pass: "",
    },
    secure: true,
})

export default transporter;