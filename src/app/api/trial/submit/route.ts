import { NextResponse } from "next/server";

import { submitTrial } from "@/lib/trial";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      attemptId?: string;
      answers?: Array<{ questionId: string; selectedOptionId: string | null }>;
    };

    if (!body.attemptId || !Array.isArray(body.answers)) {
      return NextResponse.json({ message: "attemptId and answers are required" }, { status: 400 });
    }

    const result = await submitTrial({
      attemptId: body.attemptId,
      answers: body.answers
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "Failed to submit trial", error }, { status: 500 });
  }
}
