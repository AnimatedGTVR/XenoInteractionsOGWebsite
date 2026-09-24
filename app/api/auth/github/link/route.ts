import { type NextRequest, NextResponse } from "next/server"
import { linkGitHubAccount } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { uid } = await request.json()

    if (!uid) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // Get GitHub data from cookie
    const githubDataCookie = request.cookies.get("github_data")

    if (!githubDataCookie) {
      return NextResponse.json({ error: "No GitHub data found" }, { status: 400 })
    }

    const githubData = JSON.parse(githubDataCookie.value)

    // Link GitHub account to user profile
    await linkGitHubAccount(uid, githubData)

    // Clear the cookie
    const response = NextResponse.json({ success: true, githubData })
    response.cookies.delete("github_data")

    return response
  } catch (error) {
    console.error("[v0] Link GitHub account error:", error)
    return NextResponse.json({ error: "Failed to link GitHub account" }, { status: 500 })
  }
}
