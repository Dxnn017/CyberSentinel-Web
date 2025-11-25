import { type NextRequest, NextResponse } from "next/server"

interface URLFeatures {
  url_length: number
  domain_length: number
  subdomain_count: number
  hyphen_count: number
  at_symbol: number
  double_slash: number
  https: number
  has_ip: number
  dot_count: number
  special_chars: number
  entropy: number
  path_length: number
  query_length: number
  port_present: number
  tld_length: number
  suspicious_words: number
  risk_score: number
  digit_ratio: number
  vowel_ratio: number
}

function extractURLFeatures(url: string): URLFeatures {
  try {
    const urlObj = new URL(url)
    const domain = urlObj.hostname
    const path = urlObj.pathname
    const query = urlObj.search

    // Basic features
    const url_length = url.length
    const domain_length = domain.length
    const subdomain_count = domain.split(".").length - 2
    const hyphen_count = (url.match(/-/g) || []).length
    const at_symbol = url.includes("@") ? 1 : 0
    const double_slash = (url.match(/\/\//g) || []).length - 1 // Subtract protocol
    const https = urlObj.protocol === "https:" ? 1 : 0
    const has_ip = /^\d+\.\d+\.\d+\.\d+$/.test(domain) ? 1 : 0
    const dot_count = (url.match(/\./g) || []).length
    const special_chars = (url.match(/[^a-zA-Z0-9]/g) || []).length
    const path_length = path.length
    const query_length = query.length
    const port_present = url.includes(":") && /:\d+/.test(url) ? 1 : 0
    const tld_length = domain.split(".").pop()?.length || 0

    // Entropy calculation
    const freq: { [key: string]: number } = {}
    for (const char of url.toLowerCase()) {
      freq[char] = (freq[char] || 0) + 1
    }
    let entropy = 0
    for (const count of Object.values(freq)) {
      const p = count / url.length
      entropy -= p * Math.log2(p)
    }

    // Suspicious words
    const suspiciousWords = [
      "login",
      "verify",
      "update",
      "confirm",
      "account",
      "password",
      "bank",
      "payment",
      "secure",
      "urgent",
    ]
    let suspicious_words = 0
    for (const word of suspiciousWords) {
      if (url.toLowerCase().includes(word)) suspicious_words++
    }

    // Risk score based on heuristics
    let risk_score = 0
    if (at_symbol) risk_score += 2
    if (has_ip) risk_score += 3
    if (https === 0) risk_score += 1
    if (subdomain_count > 3) risk_score += 1
    if (url_length > 75) risk_score += 1
    if (special_chars > 5) risk_score += 1
    if (suspicious_words > 0) risk_score += 2

    // Ratios
    const digit_ratio = ((url.match(/\d/g) || []).length / url.length) * 100
    const vowel_ratio = ((url.match(/[aeiou]/gi) || []).length / url.length) * 100

    return {
      url_length,
      domain_length,
      subdomain_count,
      hyphen_count,
      at_symbol,
      double_slash,
      https,
      has_ip,
      dot_count,
      special_chars,
      entropy,
      path_length,
      query_length,
      port_present,
      tld_length,
      suspicious_words,
      risk_score,
      digit_ratio,
      vowel_ratio,
    }
  } catch {
    throw new Error("Invalid URL format")
  }
}

// Simple ML model prediction (trained weights from the document)
function predictPhishing(features: URLFeatures): { score: number; prediction: string; confidence: number } {
  // Normalized features (using Min-Max scaling approximately)
  const normalized = {
    url_length: Math.min(features.url_length / 200, 1),
    domain_length: Math.min(features.domain_length / 50, 1),
    subdomain_count: Math.min(features.subdomain_count / 10, 1),
    hyphen_count: Math.min(features.hyphen_count / 10, 1),
    at_symbol: features.at_symbol,
    https: features.https,
    has_ip: features.has_ip,
    entropy: Math.min(features.entropy / 5, 1),
    suspicious_words: Math.min(features.suspicious_words / 5, 1),
    risk_score: Math.min(features.risk_score / 12, 1),
  }

  // Weighted scoring (from LightGBM model importance)
  const score =
    normalized.domain_length * 0.25 +
    normalized.entropy * 0.2 +
    normalized.risk_score * 0.2 +
    normalized.has_ip * 0.15 +
    normalized.at_symbol * 0.1 +
    normalized.https * -0.15 +
    normalized.suspicious_words * 0.1 +
    normalized.url_length * 0.05

  const confidence = Math.abs(score)
  const prediction = score > 0.4 ? "phishing" : "legitimate"

  return {
    score: Math.max(0, Math.min(1, (score + 0.5) * 0.7)), // Normalize to 0-1
    prediction,
    confidence: Math.round(confidence * 100),
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    const features = extractURLFeatures(url)
    const { score, prediction, confidence } = predictPhishing(features)

    // Store analysis in memory (in production, use database)
    const timestamp = new Date().toISOString()

    return NextResponse.json(
      {
        url,
        prediction,
        confidence,
        score,
        features,
        timestamp,
        status: prediction === "phishing" ? "dangerous" : "safe",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze URL" }, { status: 500 })
  }
}
