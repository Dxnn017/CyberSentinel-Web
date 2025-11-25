"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileJson, FileText } from "lucide-react"
import { useState } from "react"

export function ReportGenerator() {
  const [generating, setGenerating] = useState(false)

  const generateCSVReport = async () => {
    setGenerating(true)
    try {
      const history = JSON.parse(localStorage.getItem("analysisHistory") || "[]")
      const data = { results: history, total: history.length }

      const headers = ["URL", "Prediction", "Confidence", "Timestamp"]
      const rows = data.results.map((item: any) => [item.url, item.prediction, item.confidence, item.timestamp])

      let csv = headers.join(",") + "\n"
      rows.forEach((row: any[]) => {
        csv += row.map((cell) => `"${cell}"`).join(",") + "\n"
      })

      const blob = new Blob([csv], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `phishing-report-${new Date().getTime()}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Failed to generate CSV:", error)
    } finally {
      setGenerating(false)
    }
  }

  const generateJSONReport = async () => {
    setGenerating(true)
    try {
      const history = JSON.parse(localStorage.getItem("analysisHistory") || "[]")
      const data = { results: history, total: history.length }

      const report = {
        generated: new Date().toISOString(),
        totalAnalyses: data.total,
        analyses: data.results,
      }

      const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `phishing-report-${new Date().getTime()}.json`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Failed to generate JSON:", error)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <Card className="bg-slate-900 border-slate-700 p-6">
      <h3 className="text-sm font-semibold text-white uppercase mb-4">Export Reports</h3>
      <div className="space-y-2">
        <Button
          onClick={generateCSVReport}
          disabled={generating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start"
        >
          <FileText className="w-4 h-4 mr-2" />
          Export as CSV
        </Button>
        <Button
          onClick={generateJSONReport}
          disabled={generating}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white justify-start"
        >
          <FileJson className="w-4 h-4 mr-2" />
          Export as JSON
        </Button>
      </div>
    </Card>
  )
}
