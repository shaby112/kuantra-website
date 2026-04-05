export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const LOOPS_API_KEY = process.env.LOOPS_API_KEY;
  if (!LOOPS_API_KEY) {
    return res.status(500).json({ error: "Waitlist service not configured." });
  }

  const email = req.body?.email?.trim?.().toLowerCase();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email." });
  }

  try {
    const loopsRes = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOOPS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source: "kuantra-waitlist",
        subscribed: true,
      }),
    });

    const data = await loopsRes.json().catch(() => ({}));

    if (!loopsRes.ok) {
      const message = data?.message || data?.error || "Failed to join waitlist.";
      return res.status(loopsRes.status).json({ error: message });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: "Unable to reach waitlist service." });
  }
}
