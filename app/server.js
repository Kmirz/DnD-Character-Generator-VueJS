require("dotenv").config();
const path = require("path");

const cors = require("cors");
const express = require("express");

const PDFRouter = require("./Routes/getPDF");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/", PDFRouter);
app.use(express.static("dist"));
app.use("*", (req, res) => {
  res.sendFile(path.join("dist", "index.html"), { root: "./" });
});

app.listen(process.env.PORT || 3001, () => console.log("Server Started"));
