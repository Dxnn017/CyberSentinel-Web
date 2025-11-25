import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Fetch from history endpoint
    const historyResponse = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/history?limit=1000`)
    const historyData = await historyResponse.json()
    const analyses = historyData.results || []

    const total = analyses.length
    const phishing = analyses.filter((a: any) => a.prediction === "phishing").length
    const legitimate = analyses.filter((a: any) => a.prediction === "legitimate").length

    // Calculate averages
    const avgConfidence =
      analyses.length > 0
        ? Math.round(analyses.reduce((sum: number, a: any) => sum + a.confidence, 0) / analyses.length)
        : 0

    const phishingRate = total > 0 ? Math.round((phishing / total) * 100) : 0

    return NextResponse.json({
      total,
      phishing,
      legitimate,
      avgConfidence,
      phishingRate,
    })
  } catch (error) {
    return NextResponse.json({
      total: 0,
      phishing: 0,
      legitimate: 0,
      avgConfidence: 0,
      phishingRate: 0,
    })
  }
}
