"use client";

import { useMemo, useState } from "react";

type ContactFormProps = {
  serviceOptions: string[];
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  targetShowDate: string;
  showLocation: string;
  service: string;
  projectDetails: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  targetShowDate: "",
  showLocation: "",
  service: "",
  projectDetails: ""
};

export function ContactForm({ serviceOptions }: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const canSubmit = useMemo(
    () =>
      Object.values(formState).every((value) => value.trim().length > 0) &&
      status !== "loading",
    [formState, status]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setFormState(initialState);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setFormState((current) => ({
      ...current,
      [key]: value
    }));
    if (status !== "idle") {
      setStatus("idle");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__grid">
        <label>
          <span>Name</span>
          <input
            autoComplete="name"
            onChange={(event) => updateField("name", event.target.value)}
            type="text"
            value={formState.name}
          />
        </label>

        <label>
          <span>Email</span>
          <input
            autoComplete="email"
            onChange={(event) => updateField("email", event.target.value)}
            type="email"
            value={formState.email}
          />
        </label>

        <label>
          <span>Phone</span>
          <input
            autoComplete="tel"
            onChange={(event) => updateField("phone", event.target.value)}
            type="tel"
            value={formState.phone}
          />
        </label>

        <label>
          <span>Company Name</span>
          <input
            onChange={(event) => updateField("companyName", event.target.value)}
            type="text"
            value={formState.companyName}
          />
        </label>

        <label>
          <span>Target Show Date</span>
          <input
            onChange={(event) => updateField("targetShowDate", event.target.value)}
            type="date"
            value={formState.targetShowDate}
          />
        </label>

        <label>
          <span>Show Location</span>
          <input
            onChange={(event) => updateField("showLocation", event.target.value)}
            type="text"
            value={formState.showLocation}
          />
        </label>

        <label className="contact-form__full">
          <span>Service</span>
          <select
            onChange={(event) => updateField("service", event.target.value)}
            value={formState.service}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="contact-form__full">
          <span>Project Details</span>
          <textarea
            onChange={(event) => updateField("projectDetails", event.target.value)}
            rows={7}
            value={formState.projectDetails}
          />
        </label>
      </div>

      <div className="contact-form__actions">
        <button disabled={!canSubmit} type="submit">
          {status === "loading" ? "Sending..." : "Send the Project Brief"}
        </button>
        <p
          className={`contact-form__status ${
            status === "success"
              ? "contact-form__status--success"
              : status === "error"
                ? "contact-form__status--error"
                : ""
          }`}
        >
          {status === "success"
            ? "Request received. We’ll follow up with the next planning step."
            : status === "error"
              ? "Submission could not be completed. Try again in a moment."
              : "The more detail you share here, the faster we can route the request to the right team."}
        </p>
      </div>
    </form>
  );
}
