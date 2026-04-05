export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const token = req.headers.authorization;
  if (token !== `Bearer ${process.env.BLOG_ADMIN_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { fileName, mimeType, dataBase64 } = req.body || {};

  if (!fileName || !mimeType || !dataBase64) {
    return res.status(400).json({ error: "fileName, mimeType, dataBase64 are required" });
  }

  if (!/^image\/(png|jpeg|jpg|webp|gif|svg\+xml)$/.test(mimeType)) {
    return res.status(400).json({ error: "Unsupported image type" });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) return res.status(500).json({ error: "GitHub token not configured" });

  const repo = "shaby112/kuantra-website";
  const safeName = String(fileName).toLowerCase().replace(/[^a-z0-9._-]/g, "-");
  const ext = safeName.includes(".") ? safeName.split(".").pop() : "png";
  const mediaPath = `public/blog-media/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${mediaPath}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `media(blog): upload ${safeName}`,
        content: dataBase64,
        branch: "main",
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: payload?.message || "Upload failed" });
    }

    return res.status(200).json({
      ok: true,
      path: `/${mediaPath.replace(/^public\//, "")}`,
      sha: payload?.content?.sha,
    });
  } catch (error) {
    return res.status(500).json({ error: "Unable to upload image" });
  }
}
