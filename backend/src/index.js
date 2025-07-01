import express from "express";
import { PORT } from "./config.js";
import userRoutes from "./routes/users.routes.js";
import designsRoutes from "./routes/designs.routes.js"
import tshirtsRoutes from "./routes/tshirts.routes.js"
import reviewRoutes from "./routes/reviews.routes.js"
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(userRoutes);
app.use(designsRoutes);
app.use(tshirtsRoutes);
app.use(reviewRoutes);

app.listen(PORT);
console.log("Server on port", PORT);
