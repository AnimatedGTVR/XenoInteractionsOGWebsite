import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "demo-key",
  authDomain: "xeno-interactions.firebaseapp.com",
  projectId: "xeno-interactions",
  storageBucket: "xeno-interactions.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  provider: "google" | "discord" | "email" | "github"
  githubData?: {
    username: string
    id: number
    avatarUrl: string
    profileUrl: string
    bio?: string
    publicRepos: number
    followers: number
    following: number
    createdAt: string
    isPrivate: boolean // Flag to keep data hidden from public view
  }
  createdAt: Date
  lastLogin: Date
  preferences: {
    theme: "light" | "dark" | "system"
    soundEnabled: boolean
    notifications: boolean
    language: string
  }
}

export const signInWithGoogle = async (): Promise<UserProfile | null> => {
  try {
    const provider = new GoogleAuthProvider()
    provider.addScope("email")
    provider.addScope("profile")

    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      photoURL: user.photoURL || undefined,
      provider: "google",
      createdAt: new Date(),
      lastLogin: new Date(),
      preferences: {
        theme: "system",
        soundEnabled: true,
        notifications: true,
        language: "en",
      },
    }

    // Save to Firestore
    await setDoc(doc(db, "users", user.uid), userProfile, { merge: true })

    return userProfile
  } catch (error) {
    console.error("Google sign-in error:", error)
    throw error
  }
}

export const signInWithDiscord = async (): Promise<UserProfile | null> => {
  // Discord OAuth would be implemented here
  // For now, simulate the process
  throw new Error("Discord OAuth not yet implemented")
}

export const signInWithGitHub = async (): Promise<UserProfile | null> => {
  try {
    // In a real implementation, this would use GitHub OAuth
    // For now, we'll create a placeholder that can be connected later
    console.log("[v0] GitHub OAuth flow initiated")

    // This would redirect to GitHub OAuth
    // window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=read:user`

    throw new Error("GitHub OAuth requires setup. Please configure GitHub OAuth credentials.")
  } catch (error) {
    console.error("GitHub sign-in error:", error)
    throw error
  }
}

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Sign out error:", error)
    throw error
  }
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile
    }
    return null
  } catch (error) {
    console.error("Get user profile error:", error)
    return null
  }
}

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
  try {
    const docRef = doc(db, "users", uid)
    await setDoc(docRef, updates, { merge: true })
  } catch (error) {
    console.error("Update user profile error:", error)
    throw error
  }
}

export const fetchGitHubUserData = async (accessToken: string): Promise<any> => {
  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub user data")
    }

    const data = await response.json()

    return {
      username: data.login,
      id: data.id,
      avatarUrl: data.avatar_url,
      profileUrl: data.html_url,
      bio: data.bio,
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      createdAt: data.created_at,
      isPrivate: true, // Always keep GitHub data private by default
    }
  } catch (error) {
    console.error("Fetch GitHub user data error:", error)
    throw error
  }
}

export const linkGitHubAccount = async (uid: string, githubData: any): Promise<void> => {
  try {
    const docRef = doc(db, "users", uid)
    await setDoc(docRef, { githubData }, { merge: true })
    console.log("[v0] GitHub account linked successfully")
  } catch (error) {
    console.error("Link GitHub account error:", error)
    throw error
  }
}
