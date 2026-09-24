import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 })
    }

    // Exchange code for access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github`,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      console.error("[v0] GitHub OAuth error:", tokenData.error)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}?error=github_auth_failed`)
    }

    const accessToken = tokenData.access_token

    // Fetch user data from GitHub
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    const userData = await userResponse.json()

    // Store the GitHub data (encrypted/hashed for security)
    const githubData = {
      username: userData.login,
      id: userData.id,
      avatarUrl: userData.avatar_url,
      profileUrl: userData.html_url,
      bio: userData.bio,
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      createdAt: userData.created_at,
      isPrivate: true,
    }

    // Store in session or return to client
    // The client will then link this to the user's profile
    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?github_linked=true`)
    response.cookies.set("github_data", JSON.stringify(githubData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 5, // 5 minutes
    })

    return response
  } catch (error) {
    console.error("[v0] GitHub OAuth callback error:", error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}?error=github_auth_error`)
  }
}
