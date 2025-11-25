import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (in production, use Supabase or database)
let analysisHistory: any[] = []

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get("limit") || "50"
  const sorted = analysisHistory
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, Number.parseInt(limit))

  return NextResponse.json({
    total: analysisHistory.length,
    results: sorted,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    analysisHistory.push(body)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to store history" }, { status: 500 })
  }
}

export async function DELETE() {
  analysisHistory = []
  return NextResponse.json({ success: true })
}
