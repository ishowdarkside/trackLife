const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.MONGODB_LINK.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASS
);
mongoose
  .connect(DB)
  .then(() => console.log("Successfully connected to database"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
