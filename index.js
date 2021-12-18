const express = require("express");

const app = express();
const port = 8000;

const cors = require("cors");

app.use(
  cors({
    // LOKAL
    // origin: "http://localhost:3000",
    // CROSS ORIGIN
    origin: "https://nutech-app.herokuapp.com",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const router = require("./routers");

app.use(router);

app.listen(process.env.PORT || port, () => {
  console.log(`Server running on port:${port}`);
});
