import { NextRequest, NextResponse } from "next/server";

interface Note {
  message: string;
  contact: string | null;
  at: string;
}

async function persist(note: Note) {
  // Works in Node.js (local dev / Vercel). No-op on Cloudflare Workers.
  try {
    const { promises: fs } = await import("fs");
    const { join } = await import("path");
    const file = join(process.cwd(), "feedback-notes.json");
    let notes: Note[] = [];
    try { notes = JSON.parse(await fs.readFile(file, "utf8")); } catch {}
    notes.push(note);
    await fs.writeFile(file, JSON.stringify(notes, null, 2));
  } catch {}
}

export async function POST(req: NextRequest) {
  try {
    const { message, contact, at } = await req.json() as Partial<Note & { at: string }>;
    if (!message?.trim()) {
      return NextResponse.json({ error: "message required" }, { status: 400 });
    }
    const note: Note = {
      message: message.trim(),
      contact: contact?.trim() || null,
      at: at || new Date().toISOString(),
    };
    console.log("[feedback]", JSON.stringify(note));
    await persist(note);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}

// GET /api/feedback — read all saved notes (Node.js only)
export async function GET() {
  try {
    const { promises: fs } = await import("fs");
    const { join } = await import("path");
    const file = join(process.cwd(), "feedback-notes.json");
    return NextResponse.json(JSON.parse(await fs.readFile(file, "utf8")));
  } catch {
    return NextResponse.json([]);
  }
}
