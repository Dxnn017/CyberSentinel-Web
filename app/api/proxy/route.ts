import { NextRequest, NextResponse } from "next/server"

const API_URL = "https://cybersentinel-csdr.onrender.com"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json(
      { error: "Failed to connect to API" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/health`)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "API not available" },
      { status: 503 }
    )
  }
}
