import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useClipboard from "./useClipboard";


const API = "http://localhost:3000/api";



export default function View() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { copied, copy } = useClipboard();

  useEffect(() => {
    fetch(`${API}/view/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Link expired or invalid");
        }
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  /* ---------- TEXT VIEW ---------- */
  if (data.type === "text") {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white max-w-xl w-full p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-slate-800">
            📄 Shared Text
          </h2>

          <div className="relative">
  <button
    onClick={() => copy(data.content)}
    className="absolute top-2 right-2 text-sm bg-slate-200 px-3 py-1 rounded hover:bg-slate-300"
  >
    {copied ? "Copied!" : "Copy"}
  </button>

  <pre className="whitespace-pre-wrap bg-slate-50 border rounded p-4 text-slate-700">
    {data.content}
  </pre>
</div>

        </div>
      </div>
    );
  }

  /* ---------- FILE VIEW ---------- */
  if (data.type === "file") {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4 text-slate-800">
            📁 File Shared
          </h2>

          <p className="text-slate-600 mb-4">
            {data.fileName}
          </p>

          <a
            href={`http://localhost:3000${data.downloadUrl}`}
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Download File
          </a>
        </div>
      </div>
    );
  }

  return null;
}
