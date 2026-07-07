import cors from "cors";
import dotenv from "dotenv";
import Express from "express";

import { connectToDatabase } from "./config/mongoConn.js";
import ResponseHandler from "./utils/responseHandler.js";

import ip from "ip";
import configuration from "./config/configuration.js";

import router from "./routes/index.js";

dotenv.config();

const app = Express();

const PORT = configuration.PORT || 3000;

app.use(Express.json({ limit: "50mb" }));
app.use(Express.urlencoded({ limit: "50mb", extended: true }));
app.use((req, _res, next) => {
  const cookieHeader = req.headers.cookie;

  req.cookies = {};

  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const [name, ...valueParts] = cookie.trim().split("=");

      if (name) {
        req.cookies[name] = decodeURIComponent(valueParts.join("="));
      }
    });
  }

  next();
});

const corsOptions = {
  // origin: ["http://localhost:5173"],
  origin: ["https://morae-frontend.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));

connectToDatabase();
app.get("/", (req, res) => {
  return ResponseHandler.sendSuccessResponse(
    res,
    null,
    "Task Manager Main App",
    200,
  );
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://${ip.address()}:${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
});
