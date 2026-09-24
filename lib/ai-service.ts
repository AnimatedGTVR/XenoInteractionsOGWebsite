export interface AIMessage {
  id?: string
  content: string
  isUser: boolean
  timestamp: Date
  sessionId: string
  userId?: string
}

export interface AIResponse {
  content: string
  confidence: number
  context?: string
}

class AIService {
  private sessionId: string
  private conversationHistory: AIMessage[] = []
  private firebaseAvailable = false

  constructor() {
    this.sessionId = this.generateSessionId()
    this.checkFirebaseAvailability()
  }

  private checkFirebaseAvailability() {
    try {
      // Simple check - just assume Firebase is not available for now
      // This prevents initialization errors
      this.firebaseAvailable = false
      console.log("AI Service: Running in offline mode")
    } catch (error) {
      this.firebaseAvailable = false
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  async saveMessage(message: Omit<AIMessage, "id">): Promise<string | null> {
    // For now, just log the message - no Firebase storage
    console.log("AI Service: Message (offline):", message.content.substring(0, 50))
    return null
  }

  async getConversationHistory(sessionId: string, limitCount = 50): Promise<AIMessage[]> {
    // Return empty array - no Firebase storage for now
    return []
  }

  async generateResponse(userInput: string, context?: string): Promise<AIResponse> {
    const input = userInput.toLowerCase().trim()

    // Store user input in local conversation history
    this.conversationHistory.push({
      content: userInput,
      isUser: true,
      timestamp: new Date(),
      sessionId: this.sessionId,
    })

    let response: AIResponse

    // Context-aware responses based on conversation history
    const recentMessages = this.conversationHistory.slice(-5).map((m) => m.content.toLowerCase())

    // Greeting responses
    if (input.match(/^(hi|hello|hey|sup|yo|greetings)$/)) {
      const greetings = [
        "Hey there! 👋 Welcome to Xeno Interactions! I'm Axol, your AI companion. I'm excited to chat about our VR projects and help you discover what we're building!",
        "Hello! 🌟 Great to see you here! I'm passionate about our VR games and love sharing what makes them special. What brings you to our universe today?",
        "Hi! 🚀 I'm Axol, and I'm thrilled you're checking out Xeno Interactions! Whether you want to know about Tropik, our team, or just chat about VR - I'm here for it!",
        "Hey! 😊 Welcome to the future of VR gaming! I love talking about our innovative projects and the amazing team behind them. What interests you most?",
      ]
      response = {
        content: greetings[Math.floor(Math.random() * greetings.length)],
        confidence: 0.9,
        context: "greeting",
      }
    }
    // Follow-up conversation starters
    else if (input.includes("how are you") || input.includes("how's it going")) {
      const responses = [
        "I'm doing fantastic! 🌟 Always energized talking about our VR projects. The progress on Tropik has been incredible lately - the physics system is really coming together!",
        "Great! 🚀 I've been keeping up with all the latest developments. Seeing The Waking Soul at 25% completion is so exciting, and our team dynamics are amazing!",
        "Wonderful! 😊 I love being here to share our passion for VR gaming. There's so much innovation happening - from Tropik's tropical adventures to Panda Paradise's cute interactions!",
        "Amazing! 🎮 The energy around here is infectious. Everyone's so passionate about creating these immersive worlds. How are you doing?",
      ]
      response = {
        content: responses[Math.floor(Math.random() * responses.length)],
        confidence: 0.8,
        context: "casual_conversation",
      }
    }
    // Project-specific responses
    else if (input.includes("tropik")) {
      if (input.includes("progress") || input.includes("how") || input.includes("doing")) {
        response = {
          content:
            "Tropik is progressing beautifully! 🌴 We're at 8% completion and the VR mechanics are feeling incredible. The physics-based interactions in those tropical environments are going to blow your mind! Our team is really passionate about making this the ultimate VR adventure with realistic water physics, climbing mechanics, and immersive exploration.",
          confidence: 0.95,
          context: "tropik_progress",
        }
      } else if (input.includes("when") || input.includes("release")) {
        response = {
          content:
            "We don't have a specific release date for Tropik yet, but trust me, it's going to be worth the wait! 🏝️ We're focusing on making the VR experience absolutely perfect before considering Steam. Quality over speed is our motto - we want every interaction to feel magical!",
          confidence: 0.9,
          context: "tropik_release",
        }
      } else {
        response = {
          content:
            "Tropik is our crown jewel! 🌴 It's an incredible VR tropical adventure where you can physically interact with everything. Imagine exploring lush islands, using real hand movements to climb palm trees, swim in crystal-clear waters, and build shelters. We're planning VR first, then Steam later. The immersion is going to be unreal!",
          confidence: 0.9,
          context: "tropik_general",
        }
      }
    } else if (input.includes("waking soul")) {
      if (input.includes("progress") || input.includes("how")) {
        response = {
          content:
            "The Waking Soul is making incredible progress! 🌙 Anemunt has it at 25% completion now, and the narrative depth is just stunning. His 7+ years of Unity experience really shows in the artistic direction and storytelling mechanics. The way it explores consciousness and reality is fascinating!",
          confidence: 0.95,
          context: "waking_soul_progress",
        }
      } else if (input.includes("anemunt") || input.includes("who")) {
        response = {
          content:
            "Anemunt is absolutely brilliant! 🎨 He's our lead artist and runs Treron Development™ LLC. With 7+ years in Unity, 4+ years in art and animation, plus 6+ years with FL Studio, he brings incredible creative vision. The Waking Soul really showcases all his talents - from visual storytelling to atmospheric sound design!",
          confidence: 0.9,
          context: "anemunt_info",
        }
      } else {
        response = {
          content:
            "The Waking Soul is such a profound experience! 🧠 Anemunt at Treron Development™ LLC is crafting this deep narrative about consciousness and reality. At 25% completion, it's already showing incredible promise. The way it explores the human psyche through interactive storytelling is truly innovative!",
          confidence: 0.9,
          context: "waking_soul_general",
        }
      }
    } else if (input.includes("panda paradise")) {
      response = {
        content:
          "Panda Paradise is going to melt your heart! 🐼 It's this peaceful VR world where you interact with the most adorable pandas in bamboo forests. Perfect for relaxation, meditation, or family time. At 3% completion, we're focusing on making those panda interactions feel magical - imagine feeding them, playing with cubs, and exploring serene environments!",
        confidence: 0.85,
        context: "panda_paradise",
      }
    } else if (input.includes("i understand")) {
      response = {
        content:
          "I Understand I Understand Not is such a unique concept! 🚶‍♂️ It's about meaningful human connections through simple shared walking experiences. At 2% completion, we're exploring how minimal interactions can create profound moments between people. It's minimalist but deeply emotional - the kind of experience that brings strangers together.",
        confidence: 0.8,
        context: "i_understand",
      }
    } else if (input.includes("mod") && (input.includes("editor") || input.includes("unity"))) {
      if (input.includes("when") || input.includes("available")) {
        response = {
          content:
            "The Mod Editor Unity will launch alongside Tropik's Lua update! 🛠️ We want to make sure the modding ecosystem is robust and ready. It's going to be worth the wait - professional-grade tools with visual scripting, real-time preview, and comprehensive Lua integration for everyone!",
          confidence: 0.9,
          context: "mod_editor_availability",
        }
      } else {
        response = {
          content:
            "The Mod Editor Unity is going to revolutionize modding! 🔧 We're building professional-grade tools with visual scripting and Lua integration. At 2% completion, we're laying the foundation for an incredible creative platform. Think drag-and-drop scripting, real-time testing, and seamless integration with our games!",
          confidence: 0.85,
          context: "mod_editor_general",
        }
      }
    }
    // Team responses
    else if (input.includes("team") || input.includes("who")) {
      response = {
        content:
          "Our team is incredible! 👥 We have 15 passionate people across Xeno Interactions LLC and Treron Development™ LLC. Animated leads as our visionary founder, Slugmaster keeps everything running smoothly as second in command, and Anemunt brings amazing artistic vision as our lead artist. Everyone brings unique skills - from VR development to art, music, and storytelling!",
        confidence: 0.9,
        context: "team_overview",
      }
    } else if (input.includes("founder") || input.includes("animated")) {
      response = {
        content:
          "Animated is our visionary founder! 🚀 A realistic developer with extensive experience in VR, 3D game development, UI/UX design, Lua, and C#. They're passionate about physics-based gameplay and building the future of interactive worlds. Their vision for immersive experiences drives everything we create at Xeno Interactions!",
        confidence: 0.9,
        context: "animated_info",
      }
    } else if (input.includes("slugmaster")) {
      response = {
        content:
          "Slugmaster is our amazing second in command! 🎯 They're absolutely crucial to keeping our projects on track and ensuring smooth development workflows. Great leadership skills, excellent problem-solving abilities, and always looking out for the team. They help bridge the gap between creative vision and practical execution!",
        confidence: 0.85,
        context: "slugmaster_info",
      }
    }
    // Technical discussions
    else if (input.includes("vr") || input.includes("virtual reality")) {
      response = {
        content:
          "VR is absolutely the future! 🥽 The immersion you get from physically reaching out and touching virtual objects, walking through digital worlds - it's transformative! Both Tropik and Panda Paradise are designed VR-first because that's where the magic happens. We're pushing the boundaries of what's possible with hand tracking, haptic feedback, and spatial audio!",
        confidence: 0.9,
        context: "vr_technology",
      }
    } else if (input.includes("development") || input.includes("programming")) {
      response = {
        content:
          "Our development process is fascinating! 💻 We use Unity, C#, Lua, and cutting-edge VR SDKs. The focus on physics-based interactions means every object feels real and responsive. We're also implementing advanced AI systems, procedural generation, and cloud-based multiplayer infrastructure. It's challenging but incredibly rewarding work!",
        confidence: 0.85,
        context: "development_process",
      }
    }
    // Positive feedback responses
    else if (
      input.includes("cool") ||
      input.includes("awesome") ||
      input.includes("amazing") ||
      input.includes("love")
    ) {
      const responses = [
        "Right?! 🤩 I get so excited talking about these projects! The future of VR gaming is going to be incredible, and we're right at the forefront of it!",
        "I'm so glad you think so! ✨ The passion our team puts into these experiences really shows. Your enthusiasm keeps us motivated!",
        "🚀 Wait until you experience these worlds in VR - it's going to be mind-blowing! The level of immersion we're achieving is unprecedented!",
        "Thank you! 😊 That enthusiasm is exactly what drives us to create these amazing experiences. The community's excitement fuels our creativity!",
      ]
      response = {
        content: responses[Math.floor(Math.random() * responses.length)],
        confidence: 0.8,
        context: "positive_feedback",
      }
    }
    // Contact and business inquiries
    else if (input.includes("contact") || input.includes("email") || input.includes("business")) {
      response = {
        content:
          "For business inquiries, reach out to xeno.interactions@gmail.com! 📧 For general contact, use contant.xeno.interaction.llc@gmail.com. For Treron Development™ LLC projects, contact treronsupport@trerondevelopment.xyz. We love hearing from potential collaborators, investors, and community members!",
        confidence: 0.95,
        context: "contact_info",
      }
    }
    // Firebase status inquiry
    else if (input.includes("firebase") || input.includes("database") || input.includes("connected")) {
      response = {
        content:
          "I'm currently running in offline mode! 📱 This means our conversations aren't being stored in the cloud right now, but I can still chat with you about all our amazing VR projects, team members, and development process. Everything works perfectly - just without the cloud storage!",
        confidence: 0.9,
        context: "firebase_status",
      }
    }
    // Default responses
    else {
      const contextualResponses = [
        "That's really interesting! 🤔 I'd love to hear more about your thoughts on that. What aspect of VR gaming or our projects interests you most?",
        "Tell me more! 💭 I'm always curious to learn what draws people to our work. Are you interested in development, gaming, or maybe the creative process?",
        "That's a great point! 🌟 I enjoy having these kinds of conversations about the future of interactive entertainment. What would you like to explore together?",
        "I'm intrigued! 🚀 There's so much to discuss about VR, game development, and our projects. What direction would you like our conversation to take?",
        "Fascinating perspective! 😊 I love discussing innovation in gaming and VR. Is there a particular aspect of our work you'd like to dive deeper into?",
      ]
      response = {
        content: contextualResponses[Math.floor(Math.random() * contextualResponses.length)],
        confidence: 0.6,
        context: "general_conversation",
      }
    }

    // Store AI response in local conversation history
    this.conversationHistory.push({
      content: response.content,
      isUser: false,
      timestamp: new Date(),
      sessionId: this.sessionId,
    })

    return response
  }

  getSessionId(): string {
    return this.sessionId
  }

  isConnected(): boolean {
    return this.firebaseAvailable
  }

  async refreshConnection(): Promise<boolean> {
    this.checkFirebaseAvailability()
    return this.firebaseAvailable
  }

  async getAnalytics() {
    return {
      totalMessages: this.conversationHistory.length,
      userMessages: this.conversationHistory.filter((m) => m.isUser).length,
      botMessages: this.conversationHistory.filter((m) => !m.isUser).length,
      popularTopics: { offline: 1 },
      isOffline: true,
    }
  }
}

export default AIService
