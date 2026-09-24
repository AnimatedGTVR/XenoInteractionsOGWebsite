import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const repo = searchParams.get("repo") || "AnimatedGTVR/XLLCMS---Mod-System-Xeno"

    // Get GitHub token from user session (if available)
    // For now, we'll make public API calls
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Xeno-Tech-Website",
    }

    // If user has connected GitHub, use their token for private repos
    const token = request.headers.get("x-github-token")
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    // Fetch repository information
    const repoResponse = await fetch(`https://api.github.com/repos/${repo}`, { headers })

    if (!repoResponse.ok) {
      return NextResponse.json({ error: "Repository not found or private" }, { status: repoResponse.status })
    }

    const repoData = await repoResponse.json()

    // Fetch releases (mods)
    const releasesResponse = await fetch(`https://api.github.com/repos/${repo}/releases`, { headers })
    const releases = releasesResponse.ok ? await releasesResponse.json() : []

    // Fetch contributors (keep private)
    const contributorsResponse = await fetch(`https://api.github.com/repos/${repo}/contributors`, { headers })
    const contributors = contributorsResponse.ok ? await contributorsResponse.json() : []

    // Fetch README for mod descriptions
    const readmeResponse = await fetch(`https://api.github.com/repos/${repo}/readme`, { headers })
    const readme = readmeResponse.ok ? await readmeResponse.json() : null

    return NextResponse.json({
      repository: {
        name: repoData.name,
        description: repoData.description,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        language: repoData.language,
        updated_at: repoData.updated_at,
        html_url: repoData.html_url,
      },
      mods: releases.map((release: any) => ({
        id: release.id,
        name: release.name,
        tag: release.tag_name,
        description: release.body,
        published_at: release.published_at,
        downloads: release.assets.reduce((sum: number, asset: any) => sum + asset.download_count, 0),
        assets: release.assets.map((asset: any) => ({
          name: asset.name,
          size: asset.size,
          download_url: asset.browser_download_url,
          download_count: asset.download_count,
        })),
      })),
      // Keep contributor info private - only return count
      stats: {
        totalContributors: contributors.length,
        totalMods: releases.length,
      },
      readme: readme
        ? {
            content: readme.content,
            encoding: readme.encoding,
          }
        : null,
    })
  } catch (error) {
    console.error("[v0] Error fetching GitHub repo:", error)
    return NextResponse.json({ error: "Failed to fetch repository data" }, { status: 500 })
  }
}
