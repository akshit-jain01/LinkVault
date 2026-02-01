import { useState } from "react";
import TextUpload from "./TextUpload";
import FileUpload from "./FileUpload";

export default function Home() {
  const [tab, setTab] = useState("text");

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">
          🔐 LinkVault
        </h1>

        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 rounded-l-lg font-medium ${
              tab === "text"
                ? "bg-blue-500 text-white"
                : "bg-slate-200 text-slate-700"
            }`}
            onClick={() => setTab("text")}
          >
            Text
          </button>

          <button
            className={`flex-1 py-2 rounded-r-lg font-medium ${
              tab === "file"
                ? "bg-blue-500 text-white"
                : "bg-slate-200 text-slate-700"
            }`}
            onClick={() => setTab("file")}
          >
            File
          </button>
        </div>

        {tab === "text" ? <TextUpload /> : <FileUpload />}
      </div>
    </div>
  );
}
