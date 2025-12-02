const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// In-memory submissions storage
const submissions = [];

// Utility to validate a submission object against the schema rules above
function validateSubmission(data) {
  const errors = {};

  // Example validations (add all based on schema rules)
  if (!data["Full Name"] || data["Full Name"].length < 3) {
    errors["Full Name"] =
      "Full Name is required and must be at least 3 characters long.";
  }
  if (!data["Age"] || data["Age"] < 18 || data["Age"] > 65) {
    errors["Age"] = "Age is required and must be between 18 and 65.";
  }
  if (!data["Department"]) {
    errors["Department"] = "Department is required.";
  }
  if (
    !data["Skills"] ||
    !Array.isArray(data["Skills"]) ||
    data["Skills"].length < 1
  ) {
    errors["Skills"] = "At least one skill must be selected.";
  }
  if (!data["Joining Date"]) {
    errors["Joining Date"] = "Joining Date is required.";
  }
  // ... Add other validations as needed

  return errors;
}

// POST /api/submissions - accept and validate submission
router.post("/", (req, res) => {
  const submission = req.body;

  // Validate submission data
  const errors = validateSubmission(submission);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  // Create submission object with unique id and timestamp
  const newSubmission = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    submission,
  };

  // Save submission
  submissions.push(newSubmission);

  // Return success response
  res.status(201).json({
    success: true,
    id: newSubmission.id,
    createdAt: newSubmission.createdAt,
  });
});

// GET /api/submissions - paginated, sorted list
router.get("/", (req, res) => {
  let {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  sortOrder = sortOrder.toLowerCase();

  // Validate input params
  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;
  if (!["asc", "desc"].includes(sortOrder)) sortOrder = "desc";

  const sortedSubmissions = submissions.sort((a, b) => {
    if (sortBy === "createdAt") {
      if (sortOrder === "asc")
        return new Date(a.createdAt) - new Date(b.createdAt);
      else return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const startIndex = (page - 1) * limit;
  const paginatedData = sortedSubmissions.slice(startIndex, startIndex + limit);

  res.json({
    paginatedData,
    page,
    limit,
    totalCount: submissions.length,
    totalPages: Math.ceil(submissions.length / limit),
  });
});

module.exports = router;
