"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Copy, Check, RotateCcw } from "lucide-react"

interface CodeEditorProps {
  initialCode: string
  onRun?: (code: string) => void
}

export function CodeEditor({ initialCode, onRun }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [copied, setCopied] = useState(false)
  const [output, setOutput] = useState<string>("")

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setCode(initialCode)
    setOutput("")
  }

  const handleRun = () => {
    setOutput(
      "// Code execution simulation\n// In a real implementation, this would compile and run your C# code\n// Output would appear here",
    )
    onRun?.(code)
  }

  return (
    <div className="w-full bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-blue-500/10 transition-all duration-300 hover:border-white/20">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 transition-all hover:bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 transition-all hover:bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 transition-all hover:bg-green-500" />
          </div>
          <span className="text-xs font-mono text-gray-400 ml-2">Script.cs</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs hover:bg-white/10 transition-all"
            onClick={handleReset}
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs hover:bg-white/10 transition-all"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 mr-1 text-green-400" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </>
            )}
          </Button>
          <Button
            size="sm"
            className="h-7 text-xs bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105"
            onClick={handleRun}
          >
            <Play className="w-3 h-3 mr-1" />
            Run
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-[400px] p-4 pl-12 bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none transition-all"
          spellCheck={false}
          style={{
            lineHeight: "1.6",
            tabSize: 4,
          }}
        />
        {/* Line numbers */}
        <div
          className="absolute left-0 top-0 p-4 pr-2 text-gray-600 font-mono text-sm pointer-events-none select-none border-r border-white/5"
          style={{ lineHeight: "1.6" }}
        >
          {code.split("\n").map((_, i) => (
            <div key={i} className="text-right">
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Output Panel */}
      {output && (
        <div className="border-t border-white/10 bg-black/40 animate-in slide-in-from-top-2 duration-300">
          <div className="px-4 py-2 border-b border-white/10 bg-white/5">
            <span className="text-xs font-mono text-gray-400">Output</span>
          </div>
          <pre className="p-4 text-sm font-mono text-green-400 max-h-[200px] overflow-auto">{output}</pre>
        </div>
      )}
    </div>
  )
}
