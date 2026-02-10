import { useState } from "react";
import ExpirySelector from "./ExpirySelector";
import useClipboard from "./useClipboard";




const API = "http://localhost:3000/api";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [expiresIn, setExpiresIn] = useState(10);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const { copied, copy } = useClipboard();

  const upload = async () => {
    setError("");
    setLink("");

    if (!file) {
      setError("Please select or drop a file");
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

  // 🔹 Drag handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
          ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 bg-slate-50"
          }`}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <p className="text-slate-600">
          {file
            ? `📄 ${file.name}`
            : "Drag & drop a file here, or click to select"}
        </p>
      </div>

      {/* Expiry */}
      <ExpirySelector value={expiresIn} onChange={setExpiresIn} />


      {/* Upload button */}
      <button
        onClick={upload}
        className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition"
      >
        Upload File
      </button>

      {/* Error */}
      {error && <p className="text-red-500 mt-3">{error}</p>}

      {/* Result */}
      {link && (
  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between gap-2">
    <a
      href={`http://localhost:5173/view/${link.split("/").pop()}`}
      target="_blank"
      className="text-green-700 break-all underline"
    >
      Open Shared File
    </a>

    <button
      onClick={() =>
        copy(`http://localhost:5173/view/${link.split("/").pop()}`)
      }
      className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  </div>
)}

    </div>
  );
}
