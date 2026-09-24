class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {}
  private enabled = true

  constructor() {
    if (typeof window !== "undefined") {
      this.loadSounds()
      this.enabled = localStorage.getItem("soundEnabled") !== "false"
    }
  }

  private loadSounds() {
    const soundFiles = {
      click: "/sounds/click.mp3",
      hover: "/sounds/hover.mp3",
      success: "/sounds/success.mp3",
      error: "/sounds/error.mp3",
      notification: "/sounds/notification.mp3",
      whoosh: "/sounds/whoosh.mp3",
      pop: "/sounds/pop.mp3",
    }

    Object.entries(soundFiles).forEach(([name, path]) => {
      const audio = new Audio(path)
      audio.preload = "auto"
      audio.volume = 0.3
      this.sounds[name] = audio
    })
  }

  play(soundName: string, volume = 0.3) {
    if (!this.enabled || !this.sounds[soundName]) return

    const sound = this.sounds[soundName].cloneNode() as HTMLAudioElement
    sound.volume = volume
    sound.play().catch((e) => console.log("Sound play failed:", e))
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
    localStorage.setItem("soundEnabled", enabled.toString())
  }

  isEnabled() {
    return this.enabled
  }
}

export const soundManager = new SoundManager()

export const playSound = (soundName: string, volume?: number) => {
  soundManager.play(soundName, volume)
}

export const setSoundEnabled = (enabled: boolean) => {
  soundManager.setEnabled(enabled)
}

export const isSoundEnabled = () => {
  return soundManager.isEnabled()
}
