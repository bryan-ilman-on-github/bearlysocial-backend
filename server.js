import express from "express";

// import route handlers
import { deleteAccount } from "./packages/default/delete-account/script.js";
import { requestOTP } from "./packages/default/request-otp/script.js";
import { validateOTP } from "./packages/default/validate-otp/script.js";
import { validateToken } from "./packages/default/validate-token/script.js";

const app = express();
const port = 8080;

// middleware to parse JSON bodies
app.use(express.json());

// define your routes dynamically
const routes = [
  { path: "/delete-account", handler: deleteAccount, method: "delete" },
  { path: "/request-otp", handler: requestOTP, method: "get" },
  { path: "/validate-otp", handler: validateOTP, method: "post" },
  { path: "/validate-token", handler: validateToken, method: "post" },
];

routes.forEach(({ path, handler, method }) => {
  app[method](path, async (req, res) => {
    const result = await handler(req.body);
    res.status(result.statusCode).json(result.body);
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
