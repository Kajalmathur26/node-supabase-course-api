const express = require("express");
const cors = require("cors");
require("dotenv").config();

const logger = require("./middleware/logger");
const courseRoutes = require("./routes/courses");
const app = express();

app.use(cors());
app.use(express.json());

//middlreware
app.use(logger);

//routes
app.use("/", courseRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});