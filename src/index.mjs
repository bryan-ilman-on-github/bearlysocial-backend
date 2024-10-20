import express from "express";
import nodemailer from "nodemailer";

const app = express();
const port = 80;

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bryanilman20@gmail.com",
    pass: "gopvgqcyeuctbhpg",
  },
});

app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: '"BearlySocial" <bryanilman20@gmail.com>',
    to: to,
    subject: subject,
    text: text,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      res.status(200).json({ message: "Email sent successfully!", info });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error encountered while sending email.", error });
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
