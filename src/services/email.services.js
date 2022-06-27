const nodemailer = require("nodemailer")
const config = require("../config/config")
const logger = require("../config/winston")

const transporter = nodemailer.createTransport(config.smtp.config)

transporter
    .verify()
    .then(() => logger.info("connected to email"))
    .catch((err) => logger.warn("Unable to connect with smtp server"))

const sendMail = async (to, subject, text="", html = "") => {
    await transporter.sendMail({
        from: config.smtp.from,
        to,
        subject,
        text,
        html,
    })
    console.log(to, subject, text, html);
}

const sendRegisterEmail = async (userName, email) => {
    const to = email
    const subject = "Registration Successful"
    const html = `<h1>Dear ${userName}</h1>
        <p>Registration succesful</p>`
    await sendMail(to,subject, "", html)
}

module.exports = {
    transporter,
    sendRegisterEmail
}