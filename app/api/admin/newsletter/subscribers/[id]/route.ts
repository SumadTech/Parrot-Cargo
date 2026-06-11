import { NextResponse } from "next/server";

import { deleteSubscriber } from "@/lib/newsletter";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  const deleted = await deleteSubscriber(id);

  if (!deleted) {
    return NextResponse.json(
      { message: "Subscriber not found." },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}
