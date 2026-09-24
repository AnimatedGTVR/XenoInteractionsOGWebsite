"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export function GitHubConnectButton({ onConnect }: { onConnect?: () => void }) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)

    // Check if GitHub OAuth is configured
    const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID

    if (!githubClientId) {
      alert(
        "GitHub OAuth is not configured. Please add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to your environment variables.",
      )
      setIsConnecting(false)
      return
    }

    // Redirect to GitHub OAuth
    const redirectUri = `${window.location.origin}/api/auth/github`
    const scope = "read:user"
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=${scope}`

    window.location.href = githubAuthUrl
  }

  return (
    <Button onClick={handleConnect} disabled={isConnecting} className="gap-2 bg-transparent" variant="outline">
      <Github className="h-4 w-4" />
      {isConnecting ? "Connecting..." : "Connect GitHub"}
    </Button>
  )
}
