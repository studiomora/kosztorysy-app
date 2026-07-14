import { renderToBuffer } from "@react-pdf/renderer";
import { db } from "@/db";
import { estimates, estimateItems } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { EstimateDocument } from "@/lib/pdf/EstimateDocument";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const estimateId = Number(id);
  if (!Number.isFinite(estimateId)) {
    return new Response("Not found", { status: 404 });
  }

  const [estimate] = await db.select().from(estimates).where(eq(estimates.id, estimateId));
  if (!estimate) {
    return new Response("Not found", { status: 404 });
  }

  const items = await db
    .select()
    .from(estimateItems)
    .where(eq(estimateItems.estimateId, estimateId))
    .orderBy(asc(estimateItems.sortOrder));

  const buffer = await renderToBuffer(<EstimateDocument estimate={estimate} items={items} />);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="kosztorys-${estimate.id}-${estimate.clientName.replace(/[^a-zA-Z0-9]+/g, "_")}.pdf"`,
    },
  });
}
