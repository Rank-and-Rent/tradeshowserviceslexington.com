import { NextResponse } from "next/server";

const requiredFields = [
  "name",
  "email",
  "phone",
  "companyName",
  "targetShowDate",
  "showLocation",
  "service",
  "projectDetails"
] as const;

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;

  const isValid = requiredFields.every((field) => {
    const value = body[field];

    return typeof value === "string" && value.trim().length > 0;
  });

  if (!isValid) {
    return NextResponse.json(
      {
        ok: false,
        error: "All required contact fields must be completed."
      },
      {
        status: 400
      }
    );
  }

  return NextResponse.json({
    ok: true
  });
}
