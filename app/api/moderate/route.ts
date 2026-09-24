export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface ModerationResult {
  allowed: boolean
  severity: "none" | "minor" | "moderate" | "severe"
  reason?: string
  timeoutMinutes?: number
}

// Context-aware moderation patterns
const INAPPROPRIATE_PATTERNS = {
  severe: [
    /\b(fuck|fucking|fucked)\s+(you|it|her|him|them)\b/i, // Aggressive sexual/violent
    /\b(rape|molest|assault)\b/i,
    /\b(kill|murder|die)\s+(yourself|you|them)\b/i,
  ],
  moderate: [
    /\b(dick|cock|pussy|cunt|bitch)\b(?!\s+(that's|this is|so)\s+(amazing|awesome|cool))/i, // Sexual unless positive context
    /\b(sex|sexual|porn|xxx)\b(?!\s+(education|health|therapy))/i, // Sexual content unless educational
  ],
  minor: [
    /\b(shit|damn|hell|ass)\b(?=.*\b(you|your|stupid|idiot)\b)/i, // Insults
    /\b(retard|retarded|autistic)\b(?!.*\b(spectrum|diagnosis|support)\b)/i, // Slurs unless medical context
  ],
}

// Allowed emotional expressions (won't be flagged)
const ALLOWED_EXPRESSIONS = [
  /\b(omfg?|omg|wtf|holy (shit|fuck))\s+(that's|this is|so)\s+(amazing|awesome|incredible|cool|great)/i,
  /\b(fuck yeah|hell yeah|damn (right|straight))\b/i,
  /\b(badass|kickass)\b/i,
]

export async function POST(req: Request) {
  try {
    const { content, userId } = await req.json()

    if (!content || typeof content !== "string") {
      return Response.json({ error: "Invalid content" }, { status: 400 })
    }

    // Check if content matches allowed emotional expressions first
    for (const pattern of ALLOWED_EXPRESSIONS) {
      if (pattern.test(content)) {
        return Response.json({
          allowed: true,
          severity: "none",
        } as ModerationResult)
      }
    }

    // Check for inappropriate content by severity
    for (const [severity, patterns] of Object.entries(INAPPROPRIATE_PATTERNS)) {
      for (const pattern of patterns) {
        if (pattern.test(content)) {
          const timeoutMinutes = severity === "severe" ? 60 : severity === "moderate" ? 15 : 5

          // Store violation in localStorage (client-side will handle this)
          const result: ModerationResult = {
            allowed: false,
            severity: severity as "minor" | "moderate" | "severe",
            reason: `Inappropriate ${severity} content detected`,
            timeoutMinutes,
          }

          console.log("[v0] Moderation violation:", { userId, severity, timeoutMinutes })
          return Response.json(result)
        }
      }
    }

    // Content is clean
    return Response.json({
      allowed: true,
      severity: "none",
    } as ModerationResult)
  } catch (error: any) {
    console.error("[v0] Moderation error:", error)
    return Response.json({ error: "Moderation check failed" }, { status: 500 })
  }
}
