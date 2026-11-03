import { GET as adminGet } from "@/app/api/admin/appointments/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  return adminGet(request);
}
