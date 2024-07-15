import express from "express";

import { deleteAccount } from "./packages/default/delete-account/script.js";
import { requestOTP } from "./packages/default/request-otp/script.js";
import { validateOTP } from "./packages/default/validate-otp/script.js";
import { validateToken } from "./packages/default/validate-token/script.js";

const app = express();

// middleware to parse JSON bodies
app.use(express.json());

app.delete("/delete-account", async (req, res) => {
  const result = await deleteAccount(req.body);
  res.json(result);
});

app.get("/request-otp", async (req, res) => {
  const result = await requestOTP(req.body);
  res.json(result);
});

app.post("/validate-otp", (req, res) => {
  const result = validateOTP({});
  res.status(200).json(result);
});

app.post("/validate-token", (req, res) => {
  const result = validateToken({});
  res.status(200).json(result);
});

const port = 8080;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
