MatBook Dynamic Form & Submissions
A full‑stack assignment that exposes a dynamic employee onboarding form from a Node/Express backend and a React frontend, and stores and lists form submissions with server‑side pagination and sorting.
Tech Stack
• Frontend: React, TypeScript, Vite, React Router, React Query
• Backend: Node.js, Express
• Styling: Plain CSS
Features
• Fetches a dynamic form schema from the backend ( /api/form-schema ) and renders inputs based on field definitions.
• Supports multiple field types: text, number, select, multi‑select, textarea, date, and boolean switch.
• Submits form data to the backend ( POST /api/submissions ) with:
• Disabled submit button and loading state while sending.
• Field‑level error messages using backend validation responses.
• Displays a Submissions page backed by ( GET /api/submissions ) with:
• Server‑side pagination (page, limit).
• Sorting by creation date (asc/desc).
• Expandable panel per row showing a clean summary of the submission.
• Simple navigation between Form ( / ) and Submissions ( /submissions ).
Getting Started
Prerequisites
• Node.js (LTS recommended)
• npm
Setup
Clone the repository and install dependencies for both backend and frontend.

```
# in project root
cd backend
npm install

cd ../frontend
npm install

Running the Backend
From the  backend  folder:
npm run dev

This starts the API server on:
	•	 http://localhost:5000 
Main endpoints:
	•	 GET /api/form-schema  – returns the form definition.
	•	 POST /api/submissions  – validates and stores a submission.
	•	 GET /api/submissions  – returns paginated, sorted submissions.
Running the Frontend
From the  frontend  folder:
npm run dev

The app will be available at:
	•	 http://localhost:5173 
Make sure the backend is running on port  5000  before loading the frontend.
Usage
	1.	Open  http://localhost:5173 .
	2.	Fill out the Employee Onboarding Form and submit.
	•	Invalid submissions will show error messages under the relevant fields.
	3.	You will be redirected to  /submissions , or you can use the “Go to submissions” / “Back to form” links.
	4.	On the Submissions page:
	•	Change items per page and use Previous/Next for pagination.
	•	Toggle Sort by date between ascending and descending.
	•	Expand View in any row to see a structured summary of that submission.
Project Structure (high‑level)
	•	 backend/ 
	•	Express server, routes for schema and submissions, in‑memory storage + validation.
	•	 frontend/ 
	•	 src/App.tsx  – dynamic form page.
	•	 src/SubmissionsPage.tsx  – submissions table page.
	•	 src/hooks/useFormSchema.ts  – fetches form schema.
	•	 src/hooks/useSubmissions.ts  – fetches paginated submissions.
	•	 src/index.css  – global styling and layout.
Notes
	•	Submissions are stored in memory, so restarting the backend will clear existing data.
	•	The project focuses on demonstrating:
	•	Dynamic forms driven by a backend schema.
	•	Clean API integration with React Query.
	•	Basic UX patterns (loading states, error handling, pagination, sorting) without heavy UI libraries.


  “Built as part of the MatBook interview assignment”
```
