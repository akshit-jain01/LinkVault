import { useState } from "react";
import ExpirySelector from "./ExpirySelector";
import useClipboard from "./useClipboard";




const API = "http://localhost:3000/api";

export default function TextUpload() {
  const [text, setText] = useState("");
  const [expiresIn, setExpiresIn] = useState(10);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const { copied, copy } = useClipboard();

  const upload = async () => {
    setError("");
    setLink("");

    if (!text.trim()) {
      setError("Text cannot be empty");
      return;
    }

    const res = await fetch(`${API}/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, expiresIn }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error);

    setLink(data.link);
  };

  return (
    <div>
      <textarea
        className="w-full border border-slate-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="4"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <ExpirySelector value={expiresIn} onChange={setExpiresIn} />


      <button
        onClick={upload}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Upload Text
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {link && (
  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between gap-2">
        <a
        href={`http://localhost:5173/view/${link.split("/").pop()}`}
        target="_blank"
        className="text-green-700 break-all underline"
        >
        Open Shared Link
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
