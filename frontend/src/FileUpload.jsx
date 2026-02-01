import { useState } from "react";

const API = "http://localhost:3000/api";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [expiresIn, setExpiresIn] = useState(10);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const upload = async () => {
    setError("");
    setLink("");

    if (!file) {
      setError("Please select a file");
      return;
    }

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
      <input
        type="file"
        className="w-full mb-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <input
        type="number"
        min="1"
        max="1440"
        className="w-full border border-slate-300 rounded-lg p-2 mb-4"
        value={expiresIn}
        onChange={(e) => setExpiresIn(e.target.value)}
        placeholder="Expiry (minutes)"
      />

      <button
        onClick={upload}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Upload File
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {link && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <a
                href={`http://localhost:5173/view/${link.split("/").pop()}`}
                target="_blank"
                className="text-blue-600 underline break-all"
                >
                Open Shared Link
                </a>

        </div>
      )}
    </div>
  );
}
