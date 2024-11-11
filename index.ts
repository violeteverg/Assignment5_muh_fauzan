import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import router from "./src/routes";
import swaggerDocument from "./src/config/swagger-output.json";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
