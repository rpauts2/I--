"use client";
import { useState } from "react";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!prompt.trim()) { setError("Введите промпт"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const j = await res.json();
      if (!res.ok) { setError(j?.error || "Ошибка"); }
      else setResult(j);
    } catch (err) {
      setError(String(err));
    } finally { setLoading(false); }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Генерация изображения и текста</h1>
      <form onSubmit={onSubmit} className="mb-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Опишите, что сгенерировать..."
          className="w-full border rounded p-2 mb-2 min-h-[120px]"
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "Генерируется..." : "Сгенерировать"}
          </button>
          <button type="button" onClick={() => { setPrompt(""); setResult(null); setError(null); }} className="px-4 py-2 border rounded">
            Очистить
          </button>
        </div>
      </form>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {result && (
        <div className="mt-4">
          {result.imageUrl && <img src={result.imageUrl} alt="generated" className="w-full max-w-md rounded shadow mb-3" />}
          {result.textUrl && (
            <div className="bg-gray-50 p-3 rounded">
              <a href={result.textUrl} target="_blank" rel="noreferrer" className="text-blue-600">Открыть сгенерированный текст</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
