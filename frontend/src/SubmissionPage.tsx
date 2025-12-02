import { useState } from "react";
import { Link } from "react-router-dom";
import { useSubmissions } from "./hooks/useSubmissions";

function SubmissionsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading, isError, error } = useSubmissions(
    page,
    limit,
    sortOrder
  );

  if (isLoading) return <p>Loading submissions…</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  const body: any = data; // { paginatedData, page, limit, totalCount, totalPages }
  const rows = body.paginatedData ?? [];

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <Link to="/">Back to form</Link>
          <h1 style={{ marginTop: "0.5rem" }}>Submissions</h1>
          <p>Total submissions: {body.totalCount}</p>
        </div>

        <div
          style={{
            margin: "1rem 0",
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <label>
            Items per page:{" "}
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>

          <div className="sort-toggle">
            <span className="sort-label">Sort by date:</span>
            <button
              type="button"
              className={`sort-chip ${
                sortOrder === "desc" ? "sort-chip-active" : ""
              }`}
              onClick={() => setSortOrder("desc")}
            >
              Newest
            </button>
            <button
              type="button"
              className={`sort-chip ${
                sortOrder === "asc" ? "sort-chip-active" : ""
              }`}
              onClick={() => setSortOrder("asc")}
            >
              Oldest
            </button>
          </div>
        </div>

        {rows.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    textAlign: "left",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    textAlign: "left",
                  }}
                >
                  Created
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    textAlign: "left",
                  }}
                >
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((sub: any) => (
                <tr key={sub.id}>
                  <td>{sub.id}</td>
                  <td>{new Date(sub.createdAt).toLocaleString()}</td>
                  <td>
                    <details className="submission-details">
                      <summary>View</summary>
                      <div className="submission-content">
                        <div className="submission-row">
                          <span className="submission-label">Full Name</span>
                          <span className="submission-value">
                            {sub.submission["Full Name"]}
                          </span>
                        </div>
                        <div className="submission-row">
                          <span className="submission-label">Age</span>
                          <span className="submission-value">
                            {sub.submission["Age"]}
                          </span>
                        </div>
                        <div className="submission-row">
                          <span className="submission-label">Department</span>
                          <span className="submission-value">
                            {sub.submission["Department"]}
                          </span>
                        </div>
                        {sub.submission["Skills"] && (
                          <div className="submission-row">
                            <span className="submission-label">Skills</span>
                            <span className="submission-value">
                              {sub.submission["Skills"].join(", ")}
                            </span>
                          </div>
                        )}
                        {sub.submission["Joining Date"] && (
                          <div className="submission-row">
                            <span className="submission-label">
                              Joining Date
                            </span>
                            <span className="submission-value">
                              {sub.submission["Joining Date"]}
                            </span>
                          </div>
                        )}
                        {sub.submission["Notes"] && (
                          <div className="submission-row">
                            <span className="submission-label">Notes</span>
                            <span className="submission-value">
                              {sub.submission["Notes"]}
                            </span>
                          </div>
                        )}
                        {"Full Time" in sub.submission && (
                          <div className="submission-row">
                            <span className="submission-label">Full Time</span>
                            <span className="submission-value">
                              {sub.submission["Full Time"] ? "Yes" : "No"}
                            </span>
                          </div>
                        )}
                      </div>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={{ marginTop: "1rem" }}>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span style={{ margin: "0 0.75rem" }}>
            Page {body.page} of {body.totalPages}
          </span>
          <button
            disabled={page >= body.totalPages}
            onClick={() => setPage((p) => Math.min(body.totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmissionsPage;
