export async function onRequestPost({ request, env }) {
  const ctype = request.headers.get("content-type") || "";
  let email = "";
  if (ctype.includes("application/json")) {
    const body = await request.json().catch(()=>({}));
    email = (body.email||"").trim();
  } else {
    const form = await request.formData();
    email = (form.get("email") || "").toString().trim();
  }

  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!ok) {
    return new Response(JSON.stringify({ ok:false, error:"Invalid email" }), { status: 400, headers: { "content-type": "application/json" } });
  }

  try {
    if (env.SUBS && env.SUBS.put) {
      await env.SUBS.put(email, new Date().toISOString());
    }
    return new Response(JSON.stringify({ ok:true }), { headers: { "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ ok:false, error: "Store failed" }), { status: 500, headers: { "content-type": "application/json" } });
  }
}