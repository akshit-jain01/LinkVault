export default function ExpirySelector({ value, onChange }) {
  const options = [
    { label: "5 min", value: 5 },
    { label: "10 min", value: 10 },
    { label: "30 min", value: 30 },
    { label: "1 hour", value: 60 },
    { label: "1 day", value: 1440 },
  ];

  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-slate-700 mb-2">
        Expiry time
      </p>

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1 rounded-full border text-sm transition ${
              value === opt.value
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <input
          type="number"
          min="1"
          max="1440"
          placeholder="Custom minutes"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full border border-slate-300 rounded-lg p-2"
        />
      </div>
    </div>
  );
}
