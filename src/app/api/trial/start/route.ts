import { NextResponse } from "next/server";

import { startTrial } from "@/lib/trial";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { profileId?: string };
    if (!body.profileId) {
      return NextResponse.json({ message: "profileId is required" }, { status: 400 });
    }

    const session = await startTrial(body.profileId);
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ message: "Failed to start trial", error }, { status: 500 });
  }
}
