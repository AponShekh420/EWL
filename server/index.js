const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");

const app = express();
dotenv.config();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "",
      process.env.CLIENT_URL,
    ],
    credentials: true,
    methods: "GET, POST, PATCH, DELETE, PUT",
  })
);

mongoose
  .connect(process.env.MONGOOSE_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successfully"))
  .catch((err) => console.log(err));

app.use(cookieParser);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true, limit: "5000mb" }));
app.use(express.json({ limit: "5000mb" }));

// Root routes
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "welcome to the home page",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server has started at ${PORT}`);
});
