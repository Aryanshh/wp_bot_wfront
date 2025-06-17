import React, { useState } from "react";
import "./App.css";

function App() {
  const [lead, setLead] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("http://localhost:5000/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead)
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      setResponse({ error: "Failed to classify lead" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🧠 Lead Qualifier</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={lead.name}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={lead.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message or Requirements"
          value={lead.message}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Scoring..." : "Classify Lead"}
        </button>
      </form>

      {response && (
        <div className="result">
          <h2>📊 Result</h2>
          {response.error ? (
            <p style={{ color: "red" }}>{response.error}</p>
          ) : (
            <>
              <p><strong>Classification:</strong> {response.classification}</p>
              <p><strong>Metadata:</strong></p>
              <pre>{JSON.stringify(response.metadata, null, 2)}</pre>
              <p><strong>Transcript:</strong></p>
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {response.transcript}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
