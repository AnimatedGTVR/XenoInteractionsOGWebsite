export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const { messages, model, enableThinking } = await req.json()
    console.log("[v0] Request received:", { model, enableThinking, messageCount: messages?.length })

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return Response.json(
        { error: "API key not configured. Please add ANTHROPIC_API_KEY to your environment variables." },
        { status: 500 },
      )
    }

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Invalid messages format" }, { status: 400 })
    }

    // Format messages
    const formattedMessages = messages.map((msg: any) => ({
      role: msg?.role === "user" ? "user" : "assistant",
      content: String(msg?.content || ""),
    }))

    console.log("[v0] Messages formatted successfully")

    const requestBody: any = {
      model: model || "claude-sonnet-4-20250514",
      max_tokens: 8000,
      temperature: 0.7,
      stream: true,
      system:
        "You are AXO, an advanced AI assistant for Xeno Tech - a game development studio specializing in modding systems and C# scripting. You help developers with code, debugging, architecture decisions, and best practices. Be concise, friendly, and provide practical solutions with code examples when relevant.",
      messages: formattedMessages,
    }

    // Add thinking config if needed
    const modelString = String(model || "").toLowerCase()
    if (enableThinking && (modelString.includes("opus-4") || modelString.includes("sonnet-4"))) {
      requestBody.thinking = {
        type: "enabled",
        budget_tokens: 5000,
      }
      console.log("[v0] Extended thinking enabled")
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("[v0] API error:", errorData)
      return Response.json({ error: errorData.error?.message || "API request failed" }, { status: response.status })
    }

    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error("No response body")
    }

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    // Create our stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "start" })}\n\n`))

          let buffer = ""

          while (true) {
            const { done, value } = await reader.read()

            if (done) {
              console.log("[v0] Stream completed")
              controller.enqueue(encoder.encode("data: [DONE]\n\n"))
              controller.close()
              break
            }

            // Decode the chunk
            buffer += decoder.decode(value, { stream: true })

            // Process complete lines
            const lines = buffer.split("\n")
            buffer = lines.pop() || ""

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim()

                if (data === "[DONE]") {
                  continue
                }

                try {
                  const parsed = JSON.parse(data)

                  // Handle content_block_delta events
                  if (parsed.type === "content_block_delta" && parsed.delta?.type === "text_delta") {
                    const responseData = JSON.stringify({
                      type: "text",
                      content: parsed.delta.text,
                    })
                    controller.enqueue(encoder.encode(`data: ${responseData}\n\n`))
                  }
                } catch (e) {
                  // Skip invalid JSON
                  console.log("[v0] Skipping invalid JSON:", data)
                }
              }
            }
          }
        } catch (error: any) {
          console.error("[v0] Streaming error:", error)
          const errorData = JSON.stringify({
            type: "error",
            content: `Error: ${error?.message || "Stream failed"}`,
          })
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error: any) {
    console.error("[v0] API route error:", error)
    return Response.json({ error: error?.message || "An error occurred. Please try again." }, { status: 500 })
  }
}

export async function GET() {
  console.log("[v0] Health check endpoint called")
  return Response.json({
    status: "ok",
    message: "Chat API is running",
    anthropicInitialized: true,
    timestamp: new Date().toISOString(),
  })
}
