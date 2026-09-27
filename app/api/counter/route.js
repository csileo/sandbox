import { NextResponse } from "next/server";
import { getCount, incrementCount } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ count: getCount() });
}

export async function POST() {
  return NextResponse.json({ count: incrementCount() });
}
