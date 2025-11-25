"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Chrome, FileBox as Firefox, AlertCircle } from "lucide-react"

export function BrowserIntegration() {
  return (
    <Card className="bg-gradient-to-br from-purple-950 to-purple-900 border-purple-700 p-6">
      <h3 className="font-semibold text-white text-sm uppercase mb-4">Browser Integration</h3>

      <p className="text-xs text-slate-300 mb-4">
        Install CyberSentinel as a browser extension for real-time protection on every website you visit.
      </p>

      <div className="space-y-2">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
          <Chrome className="w-4 h-4 mr-2" />
          Chrome Web Store
        </Button>
        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white justify-start">
          <Firefox className="w-4 h-4 mr-2" />
          Firefox Add-ons
        </Button>
      </div>

      <div className="mt-4 p-3 bg-slate-900 rounded flex gap-2">
        <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-400">Extension provides automatic URL scanning before navigation</p>
      </div>
    </Card>
  )
}
