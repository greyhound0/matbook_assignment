import type { FormEvent } from "react";
import { useState } from "react";
import { useFormSchema } from "./hooks/useFormSchema";
import { Link, useNavigate } from "react-router-dom";

type Field = {
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
  validations?: Record<string, unknown>;
};

type Schema = {
  title: string;
  description: string;
  fields: Field[];
};

function App() {
  const { data, isLoading, isError, error } = useFormSchema();
  const [values, setValues] = useState<Record<string, any>>({});
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  if (isLoading) return <p>Loading form…</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  const schema = data as Schema;

  function handleChange(label: string, value: any) {
    setValues((prev) => ({ ...prev, [label]: value }));
    // clear error for this field as user edits
    setFieldErrors((prev) => {
      const copy = { ...prev };
      delete copy[label];
      return copy;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitMessage(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const body = await res.json();
      if (!res.ok) {
        setSubmitMessage("Please fix the errors above.");
        if (body && body.errors && typeof body.errors === "object") {
          setFieldErrors(body.errors as Record<string, string>);
        }
        return;
      }

      setSubmitMessage("Submitted successfully! Redirecting to submissions…");
      setValues({});
      setTimeout(() => navigate("/submissions"), 800);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <div style={{ marginBottom: "0.5rem" }}>
            <Link to="/submissions">Go to submissions</Link>
          </div>
          <h1>{schema.title}</h1>
          <p>{schema.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          {schema.fields.map((field) => {
            const name = field.label;
            const value =
              values[name] ?? (field.type === "multi-select" ? [] : "");
            const errorText = fieldErrors[name];

            if (["text", "number", "date"].includes(field.type)) {
              return (
                <div key={name} className="form-field">
                  <label className="form-label">
                    {name}
                    <input
                      className={`form-input ${
                        errorText ? "form-input-error" : ""
                      }`}
                      type={field.type === "text" ? "text" : field.type}
                      placeholder={field.placeholder}
                      value={value}
                      onChange={(e) =>
                        handleChange(
                          name,
                          field.type === "number"
                            ? Number(e.target.value)
                            : e.target.value
                        )
                      }
                    />
                  </label>
                  {errorText && <p className="field-error">{errorText}</p>}
                </div>
              );
            }

            if (field.type === "textarea") {
              return (
                <div key={name} className="form-field">
                  <label className="form-label">
                    {name}
                    <textarea
                      className={`form-input form-textarea ${
                        errorText ? "form-input-error" : ""
                      }`}
                      placeholder={field.placeholder}
                      value={value}
                      onChange={(e) => handleChange(name, e.target.value)}
                    />
                  </label>
                  {errorText && <p className="field-error">{errorText}</p>}
                </div>
              );
            }

            if (field.type === "select") {
              return (
                <div key={name} className="form-field">
                  <label className="form-label">
                    {name}
                    <select
                      className={`form-input ${
                        errorText ? "form-input-error" : ""
                      }`}
                      value={value}
                      onChange={(e) => handleChange(name, e.target.value)}
                    >
                      <option value="">Select…</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                  {errorText && <p className="field-error">{errorText}</p>}
                </div>
              );
            }

            if (field.type === "multi-select") {
              const arr = Array.isArray(value) ? value : [];
              return (
                <div key={name} className="form-field">
                  <span className="form-label">{name}</span>
                  {field.options?.map((opt) => (
                    <label key={opt} className="checkbox-row">
                      <input
                        type="checkbox"
                        checked={arr.includes(opt)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleChange(name, [...arr, opt]);
                          } else {
                            handleChange(
                              name,
                              arr.filter((x: string) => x !== opt)
                            );
                          }
                        }}
                      />
                      {opt}
                    </label>
                  ))}
                  {errorText && <p className="field-error">{errorText}</p>}
                </div>
              );
            }

            if (field.type === "switch") {
              return (
                <div key={name} className="form-field">
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={!!value}
                      onChange={(e) => handleChange(name, e.target.checked)}
                    />{" "}
                    {name}
                  </label>
                  {errorText && <p className="field-error">{errorText}</p>}
                </div>
              );
            }

            return null;
          })}

          <div className="form-actions">
            <button
              type="submit"
              className="button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting…" : "Submit"}
            </button>
          </div>
        </form>

        {submitMessage && <p className="submit-message">{submitMessage}</p>}
      </div>
    </div>
  );
}

export default App;
