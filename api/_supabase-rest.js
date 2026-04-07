function getSupabaseEnv() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase is not configured. Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return { url: url.replace(/\/$/, ""), key };
}

export function requireAdminToken(req) {
  const token = req.headers.authorization;
  const expected = process.env.BLOG_ADMIN_TOKEN;
  return Boolean(expected) && token === `Bearer ${expected}`;
}

export async function supabaseRest(path, init = {}) {
  const { url, key } = getSupabaseEnv();
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    ...init.headers,
  };

  return fetch(`${url}${path}`, {
    ...init,
    headers,
  });
}

export function makeJsonResponse(res, status, payload) {
  return res.status(status).json(payload);
}
