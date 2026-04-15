import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { readJsonFile, writeJsonFile } from "@/lib/store";

type LeadRecord = {
  id: string;
  name: string;
  phone: string;
  classLevel: string;
  entProfile: string;
  createdAt: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      classLevel?: string;
      entProfile?: string;
    };

    const required = ["name", "phone", "classLevel", "entProfile"] as const;
    const missing = required.some((field) => !body[field]?.trim());

    if (missing) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const leads = await readJsonFile<LeadRecord[]>("leads.json", []);
    const lead = {
      id: randomUUID(),
      name: body.name!.trim(),
      phone: body.phone!.trim(),
      classLevel: body.classLevel!.trim(),
      entProfile: body.entProfile!.trim(),
      createdAt: new Date().toISOString()
    };

    leads.push(lead);
    await writeJsonFile("leads.json", leads);

    return NextResponse.json({
      success: true,
      leadId: lead.id
    });
  } catch (error) {
    return NextResponse.json({ message: "Failed to save lead", error }, { status: 500 });
  }
}
