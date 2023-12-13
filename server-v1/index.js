const express = require("express");
const config = require("config");
const cors = require("cors");
const empsApp = require("./routes/emps");

const PORT = config.get("PORT");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/emps", empsApp);

app.listen(PORT, () => {
  console.log(`server listening to port ${PORT}`);
});
