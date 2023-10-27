import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { loginRouter } from "./service/routers/loginRouter";
import { selectSeatRouter } from "./service/routers/selectSeatRouter";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/space-express/auth", loginRouter);
app.use("/api/space-express/select-seat/", selectSeatRouter)

app.use("*", (req, res) => {
  console.log(req.path);
  console.log(req.body);
  res.status(404).json({ message: "Not found!" });
});

app.listen(4000, () => {
  console.log("listening on port 4000!");
});
