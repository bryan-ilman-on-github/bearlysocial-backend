import * as aws from "@aws-sdk/client-ses";
import * as dotenv from "dotenv";
import nodemailer from "nodemailer";
import { connectToDatabase } from "./mongodb-client.js";

dotenv.config();

const ses = new aws.SES({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

const createMailOptions = (destination, otp) => ({
  from: '"BearlySocial" <contact@bearly.social>',
  to: destination,
  subject: "Your One-Time Password (OTP)",
  html: `<p style="font-size: 18px;">Your One-time Password (OTP) is:</p>
         <p style="font-size: 24px; font-weight: bold;">${otp}</p>
         <p style="font-size: 18px">The OTP is valid for only <span style="font-weight: bold;">8 minutes</span>.</p>`,
});

export const requestOTP = async ({ id, email_address }) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const db = await connectToDatabase();
    const users = db.collection("users");

    const user = await users.findOne({ _id: id });

    if (!user) {
      const newUser = {
        _id: id,
        otp,
        otp_attempt_num: 0,
        otp_expiry_time: Date.now() + 8 * 60 * 1000,
        cooldown_time: null,
        first_name: null,
        last_name: null,
        interest_coll_code: [],
        lang_coll_code: [],
        country_code: null,
        insta_handler: null,
        fb_handler: null,
        linkedin_handler: null,
        mood_code: null,
        schedule: {},
      };

      await users.insertOne(newUser);
    } else if (user.otp_attempt_num < 4 || user.cooldown_time < Date.now()) {
      const updateFields = {
        otp,
        otp_expiry_time: Date.now() + 8 * 60 * 1000,
        otp_attempt_num: user.otp_attempt_num < 4 ? user.otp_attempt_num : 0,
        cooldown_time:
          user.cooldown_time < Date.now() ? null : user.cooldown_time,
      };

      await users.updateOne({ _id: id }, { $set: updateFields });
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ cooldown_time: user.cooldown_time }),
      };
    }

    await transporter.sendMail(createMailOptions(email_address, otp));
    return { statusCode: 200 };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

export const main = async (args) => await requestOTP(args);
