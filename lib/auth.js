import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export const SESSION_COOKIE = "apollo_admin_session";

export async function getAdminSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const secretValue = process.env.AUTH_SECRET;

  if (!token || !secretValue) return null;

  try {
    const secret = new TextEncoder().encode(secretValue);
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    if (
      payload.role !== "admin" ||
      !payload.sub ||
      !payload.exp ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return {
      id: payload.sub,
      name: payload.name ?? "",
      email: payload.email ?? "",
    };
  } catch {
    return null;
  }
}
