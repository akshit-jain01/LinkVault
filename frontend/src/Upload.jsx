import { useState } from "react";

const API = "http://localhost:3000/api";

export default function Upload() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [expiresIn, setExpiresIn] = useState(10);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const uploadText = async () => {
    setError("");
    setLink("");

    const res = await fetch(`${API}/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, expiresIn }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error);

    setLink(data.link);
  };

  const uploadFile = async () => {
    setError("");
    setLink("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("expiresIn", expiresIn);

    const res = await fetch(`${API}/upload-file`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error);

    setLink(data.link);
  };

  return (
    <div>
      <h2>Upload Text</h2>
      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here"
      />
      <br />
      <button onClick={uploadText}>Upload Text</button>

      <hr />

      <h2>Upload File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <button onClick={uploadFile}>Upload File</button>

      <hr />

      <label>Expires in (minutes): </label>
      <input
        type="number"
        value={expiresIn}
        onChange={(e) => setExpiresIn(e.target.value)}
        min="1"
        max="1440"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {link && (
        <p>
          Link:{" "}
          <a href={link} target="_blank">
            {link}
          </a>
        </p>
      )}
    </div>
  );
}
