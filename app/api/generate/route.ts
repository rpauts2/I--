import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = String(body?.prompt || "").trim();
    if (!prompt) return new Response(JSON.stringify({ error: "Prompt required" }), { status: 400 });

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) return new Response(JSON.stringify({ error: "OPENAI_API_KEY not set" }), { status: 500 });

    const chatResp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Напиши короткий текст (заголовок + 2-3 предложения) для портфолио по промпту:\n\n${prompt}` }],
        max_tokens: 250,
        temperature: 0.8
      })
    });
    const chatJson = await chatResp.json();
    const generatedText = chatJson?.choices?.[0]?.message?.content?.trim() || "";

    const imgResp = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify({ prompt, n: 1, size: "1024x1024" })
    });
    const imgJson = await imgResp.json();
    const b64 = imgJson?.data?.[0]?.b64_json;
    if (!b64) throw new Error("No image returned from OpenAI");

    const outDir = path.resolve(process.cwd(), "public", "generated");
    await fs.mkdir(outDir, { recursive: true });

    const id = uuidv4();
    const imgName = `${id}.png`;
    const txtName = `${id}.txt`;

    await fs.writeFile(path.join(outDir, imgName), Buffer.from(b64, "base64"));
    await fs.writeFile(path.join(outDir, txtName), generatedText, "utf8");

    const dataDir = path.resolve(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });
    const metaPath = path.join(dataDir, "meta.json");

    let meta = [];
    try {
      const raw = await fs.readFile(metaPath, "utf8");
      meta = JSON.parse(raw);
      if (!Array.isArray(meta)) meta = [];
    } catch {
      meta = [];
    }

    meta.unshift({
      id,
      prompt,
      textFile: `/generated/${txtName}`,
      imageFile: `/generated/${imgName}`,
      createdAt: new Date().toISOString()
    });

    await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), "utf8");

    return new Response(JSON.stringify({ id, textUrl: `/generated/${txtName}`, imageUrl: `/generated/${imgName}` }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
