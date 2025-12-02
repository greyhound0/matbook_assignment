const express = require("express");
const cors = require("cors");

const schemaRoutes = require("./routes/schemaRoutes");
const submissionRoutes = require("./routes/submissionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/form-schema", schemaRoutes);
app.use("/api/submissions", submissionRoutes);

// Error handling middleware placeholder
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
