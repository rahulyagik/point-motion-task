const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const routes = require("./routes/routes.js");

const app = express();

app.use(express.json());

app.use("/", routes);

app.all("*", (req, res, next) => {
  next(
    res.status(404).json({
      message: `Can't find ${req.originalUrl} on this server!`,
    })
  );
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
