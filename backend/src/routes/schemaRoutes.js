const express = require("express");
const router = express.Router();

// The exact Employee Onboarding form schema JSON as per assignment:
const formSchema = {
  title: "Employee Onboarding Form",
  description: "Please fill out the details to onboard the new employee.",
  fields: [
    {
      label: "Full Name",
      type: "text",
      placeholder: "Enter full name",
      validations: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
    },
    {
      label: "Age",
      type: "number",
      placeholder: "Enter age",
      validations: {
        required: true,
        min: 18,
        max: 65,
      },
    },
    {
      label: "Department",
      type: "select",
      placeholder: "Select department",
      options: ["Engineering", "HR", "Marketing", "Sales"],
      validations: {
        required: true,
      },
    },
    {
      label: "Skills",
      type: "multi-select",
      placeholder: "Select skills",
      options: ["React", "Node.js", "Python", "Communication", "Management"],
      validations: {
        minSelected: 1,
        maxSelected: 5,
      },
    },
    {
      label: "Joining Date",
      type: "date",
      placeholder: "Select joining date",
      validations: {
        required: true,
        minDate: "2024-01-01",
      },
    },
    {
      label: "Notes",
      type: "textarea",
      placeholder: "Additional notes",
      validations: {
        maxLength: 200,
      },
    },
    {
      label: "Full Time",
      type: "switch",
      validations: {},
    },
  ],
};

router.get("/", (req, res) => {
  res.json(formSchema);
});

module.exports = router;
