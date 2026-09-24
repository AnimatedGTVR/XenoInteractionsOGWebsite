export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

interface LyraRequest {
  action: "grammar" | "code-quality" | "bug-detection" | "project-help"
  content: string
  language?: string
}

export async function POST(req: Request) {
  try {
    const { action, content, language } = (await req.json()) as LyraRequest

    if (!content || typeof content !== "string") {
      return Response.json({ error: "Invalid content" }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return Response.json({ error: "API key not configured" }, { status: 500 })
    }

    // Build system prompt based on action
    let systemPrompt = ""
    switch (action) {
      case "grammar":
        systemPrompt = `You are Lyra, a grammar and writing assistant. Analyze the provided text for:
- Grammar errors and corrections
- Spelling mistakes
- Punctuation issues
- Style improvements
- Clarity suggestions

Provide your response in a structured format with:
1. Corrected version
2. List of specific issues found
3. Overall quality score (0-100)

Be concise and helpful.`
        break

      case "code-quality":
        systemPrompt = `You are Lyra, a code quality expert specializing in ${language || "general programming"}. Analyze the provided code for:
- Code quality and best practices
- Performance issues
- Security vulnerabilities
- Maintainability concerns
- Design patterns usage

Provide your response with:
1. Overall quality grade (A-F)
2. Specific issues with line numbers if possible
3. Improvement suggestions
4. Positive aspects

Be constructive and educational.`
        break

      case "bug-detection":
        systemPrompt = `You are Lyra, a bug detection specialist for ${language || "general programming"}. Analyze the provided code for:
- Potential bugs and errors
- Logic issues
- Edge cases not handled
- Runtime errors
- Type mismatches

Provide your response with:
1. List of potential bugs with severity (Critical/High/Medium/Low)
2. Explanation of each issue
3. Suggested fixes
4. Testing recommendations

Be thorough and precise.`
        break

      case "project-help":
        systemPrompt = `You are Lyra, a project management and development assistant. Help with:
- Project organization and structure
- Task breakdown and planning
- Best practices and workflows
- Tool recommendations
- Documentation guidance

Provide practical, actionable advice tailored to the user's needs.`
        break

      default:
        return Response.json({ error: "Invalid action" }, { status: 400 })
    }

    const requestBody = {
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      temperature: 0.3, // Lower temperature for more consistent analysis
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
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
      console.error("[v0] Lyra API error:", errorData)
      return Response.json({ error: errorData.error?.message || "API request failed" }, { status: response.status })
    }

    const data = await response.json()
    const result = data.content?.[0]?.text || "No response generated"

    return Response.json({
      action,
      result,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("[v0] Lyra API route error:", error)
    return Response.json({ error: error?.message || "An error occurred" }, { status: 500 })
  }
}

export async function GET() {
  return Response.json({
    status: "ok",
    message: "Lyra AI Assistant is running",
    actions: ["grammar", "code-quality", "bug-detection", "project-help"],
  })
}
