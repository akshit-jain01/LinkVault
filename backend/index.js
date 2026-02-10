const express = require("express");
const mongoose = require("mongoose");
const uploadRoutes = require("./routes/upload");
const viewRoutes = require("./routes/view");
const cors = require("cors");


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", uploadRoutes);
app.use("/api", viewRoutes);


const MONGO_URI = "mongodb://127.0.0.1:27017/linkvault";



mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// test route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


