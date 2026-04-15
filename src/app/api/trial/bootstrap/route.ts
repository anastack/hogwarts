import { NextResponse } from "next/server";

import { getTrialBootstrap } from "@/lib/trial";

export async function GET() {
  try {
    const profiles = await getTrialBootstrap();
    return NextResponse.json({ profiles });
  } catch (error) {
    return NextResponse.json({ message: "Failed to load profiles", error }, { status: 500 });
  }
}
