"use client"

import type React from "react"
import { useState } from "react"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const parseMarkdown = (text: string): React.ReactNode[] => {
    const elements: React.ReactNode[] = []
    const lines = text.split("\n")
    let i = 0
    let codeBlockContent = ""
    let codeBlockLanguage = ""
    let inCodeBlock = false
    let codeBlockIndex = 0

    while (i < lines.length) {
      const line = lines[i]

      // Code block detection
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          // Start code block
          inCodeBlock = true
          codeBlockLanguage = line.slice(3).trim()
          codeBlockContent = ""
        } else {
          // End code block
          inCodeBlock = false
          const currentIndex = codeBlockIndex
          const currentContent = codeBlockContent
          elements.push(
            <div key={`code-${i}`} className="my-4 rounded-lg overflow-hidden border border-cyan-500/30 relative group">
              <div className="bg-gray-800/80 px-4 py-2 text-xs flex items-center justify-between border-b border-cyan-500/20">
                <span className="text-cyan-400">{codeBlockLanguage || "code"}</span>
                <button
                  onClick={() => copyToClipboard(currentContent, currentIndex)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-gray-300 hover:text-white"
                  aria-label="Copy code"
                >
                  {copiedIndex === currentIndex ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-gray-900/80 p-4 overflow-x-auto">
                <code className="text-sm text-gray-300 font-mono">{currentContent}</code>
              </pre>
            </div>,
          )
          codeBlockContent = ""
          codeBlockLanguage = ""
          codeBlockIndex++
        }
        i++
        continue
      }

      if (inCodeBlock) {
        codeBlockContent += (codeBlockContent ? "\n" : "") + line
        i++
        continue
      }

      // Headers
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={`h3-${i}`} className="text-lg font-semibold text-cyan-400 mt-6 mb-3">
            {line.slice(4)}
          </h3>,
        )
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={`h2-${i}`} className="text-xl font-semibold text-cyan-300 mt-6 mb-3">
            {line.slice(3)}
          </h2>,
        )
      } else if (line.startsWith("# ")) {
        elements.push(
          <h1 key={`h1-${i}`} className="text-2xl font-bold text-white mt-6 mb-4">
            {line.slice(2)}
          </h1>,
        )
      }
      // Bullet points
      else if (line.match(/^[-*]\s+/)) {
        const listItems = [line]
        let j = i + 1
        while (j < lines.length && lines[j].match(/^[-*]\s+/)) {
          listItems.push(lines[j])
          j++
        }
        elements.push(
          <ul key={`list-${i}`} className="list-disc list-inside space-y-1 my-3 text-gray-300">
            {listItems.map((item, idx) => (
              <li key={idx}>{parseInlineFormatting(item.replace(/^[-*]\s+/, ""))}</li>
            ))}
          </ul>,
        )
        i = j
        continue
      }
      // Numbered lists
      else if (line.match(/^\d+\.\s+/)) {
        const listItems = [line]
        let j = i + 1
        while (j < lines.length && lines[j].match(/^\d+\.\s+/)) {
          listItems.push(lines[j])
          j++
        }
        elements.push(
          <ol key={`olist-${i}`} className="list-decimal list-inside space-y-1 my-3 text-gray-300">
            {listItems.map((item, idx) => (
              <li key={idx}>{parseInlineFormatting(item.replace(/^\d+\.\s+/, ""))}</li>
            ))}
          </ol>,
        )
        i = j
        continue
      }
      // Inline code
      else if (line.includes("`") && !line.startsWith("```")) {
        elements.push(
          <p key={`p-${i}`} className="my-2 text-gray-300 leading-relaxed">
            {parseInlineFormatting(line)}
          </p>,
        )
      }
      // Empty line
      else if (line.trim() === "") {
        elements.push(<div key={`br-${i}`} className="h-2" />)
      }
      // Regular paragraph
      else {
        elements.push(
          <p key={`p-${i}`} className="my-2 text-gray-300 leading-relaxed">
            {parseInlineFormatting(line)}
          </p>,
        )
      }

      i++
    }

    return elements
  }

  const parseInlineFormatting = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = []
    const currentText = text
    let key = 0

    // Process inline code
    const codeRegex = /`([^`]+)`/g
    let lastIndex = 0
    let match

    while ((match = codeRegex.exec(currentText)) !== null) {
      // Add text before code
      if (match.index > lastIndex) {
        const before = currentText.slice(lastIndex, match.index)
        parts.push(processBoldItalic(before, key++))
      }

      // Add code
      parts.push(
        <code key={`code-${key++}`} className="bg-gray-800/60 px-2 py-0.5 rounded text-cyan-400 text-sm font-mono">
          {match[1]}
        </code>,
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < currentText.length) {
      parts.push(processBoldItalic(currentText.slice(lastIndex), key++))
    }

    return parts.length > 0 ? parts : currentText
  }

  const processBoldItalic = (text: string, key: number): React.ReactNode => {
    // Bold
    const boldRegex = /\*\*([^*]+)\*\*/g
    if (boldRegex.test(text)) {
      const parts = text.split(boldRegex)
      return parts.map((part, idx) => {
        if (idx % 2 === 1) {
          return (
            <strong key={`bold-${key}-${idx}`} className="font-semibold text-white">
              {part}
            </strong>
          )
        }
        return part
      })
    }

    // Italic
    const italicRegex = /\*([^*]+)\*/g
    if (italicRegex.test(text)) {
      const parts = text.split(italicRegex)
      return parts.map((part, idx) => {
        if (idx % 2 === 1) {
          return (
            <em key={`italic-${key}-${idx}`} className="italic">
              {part}
            </em>
          )
        }
        return part
      })
    }

    return text
  }

  return <div className={`markdown-content ${className}`}>{parseMarkdown(content)}</div>
}
