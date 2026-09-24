// Navigation Management
class NavigationManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupMobileMenu()
    this.setupActiveLinks()
    this.setupScrollEffects()
  }

  setupMobileMenu() {
    const navToggle = document.getElementById("nav-toggle")
    const navMenu = document.getElementById("nav-menu")

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active")
        navToggle.classList.toggle("active")

        // Animate hamburger bars
        const bars = navToggle.querySelectorAll(".bar")
        if (navToggle.classList.contains("active")) {
          bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
          bars[1].style.opacity = "0"
          bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
        } else {
          bars[0].style.transform = "none"
          bars[1].style.opacity = "1"
          bars[2].style.transform = "none"
        }
      })

      // Close menu when clicking on a link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("active")
          navToggle.classList.remove("active")

          // Reset hamburger bars
          const bars = navToggle.querySelectorAll(".bar")
          bars[0].style.transform = "none"
          bars[1].style.opacity = "1"
          bars[2].style.transform = "none"
        })
      })
    }
  }

  setupActiveLinks() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html"
    document.querySelectorAll(".nav-link").forEach((link) => {
      const href = link.getAttribute("href")
      if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add("active")
      }
    })
  }

  setupScrollEffects() {
    const navbar = document.querySelector(".navbar")
    let lastScrollY = window.scrollY
    let ticking = false

    const updateNavbar = () => {
      const currentScrollY = window.scrollY

      // Add/remove scrolled class for styling
      if (currentScrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }

      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.add("hidden")
      } else {
        navbar.classList.remove("hidden")
      }

      lastScrollY = currentScrollY
      ticking = false
    }

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar)
        ticking = true
      }
    }

    window.addEventListener("scroll", requestTick, { passive: true })
  }
}

// Animation Manager
class AnimationManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupScrollAnimations()
    this.setupProgressBars()
    this.setupParticleEffects()
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay based on element position
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0) scale(1)"
            entry.target.classList.add("animate-in")
          }, index * 100)
        }
      })
    }, observerOptions)

    // Observe elements with enhanced animations
    document.querySelectorAll(".hub-card, .feature-item, .team-member-card, .island-preview").forEach((el, index) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px) scale(0.95)"
      el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
      observer.observe(el)
    })
  }

  setupProgressBars() {
    const progressBars = document.querySelectorAll(".progress")

    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target
            const width = progressBar.style.width
            progressBar.style.width = "0%"

            setTimeout(() => {
              progressBar.style.width = width
            }, 500)

            progressObserver.unobserve(progressBar)
          }
        })
      },
      { threshold: 0.5 },
    )

    progressBars.forEach((bar) => {
      progressObserver.observe(bar)
    })
  }

  setupParticleEffects() {
    // Create floating particles for hero background
    const particlesContainer = document.querySelector(".floating-particles")
    if (particlesContainer) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 2}px;
          height: ${Math.random() * 4 + 2}px;
          background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: floatParticle ${Math.random() * 20 + 15}s infinite linear;
          animation-delay: ${Math.random() * 5}s;
        `
        particlesContainer.appendChild(particle)
      }
    }
  }
}

// Project Details Manager
class ProjectManager {
  constructor() {
    this.init()
  }

  init() {
    // Make toggleTechnicalDetails available globally
    window.toggleTechnicalDetails = () => {
      const details = document.getElementById("technical-details")
      if (details) {
        details.classList.toggle("active")
      }
    }
  }
}

// Mod Editor Management
class ModEditor {
  constructor() {
    this.editor = null
    this.currentMod = null
    this.mods = this.loadMods()
    this.init()
  }

  init() {
    this.setupCodeEditor()
    this.setupControls()
    this.loadDefaultMod()
  }

  setupCodeEditor() {
    const textarea = document.getElementById("code-editor")
    if (textarea && typeof window.CodeMirror !== "undefined") {
      this.editor = window.CodeMirror.fromTextArea(textarea, {
        mode: "lua",
        theme: "monokai",
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        lineWrapping: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      })

      this.editor.setSize("100%", "400px")

      // Auto-save on change
      this.editor.on("change", () => {
        this.autoSave()
      })
    }
  }

  setupControls() {
    // Download button
    const downloadBtn = document.getElementById("download-mod")
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        this.downloadMod()
      })
    }

    // Save button
    const saveBtn = document.getElementById("save-mod")
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        this.saveMod()
      })
    }

    // Mod name and description inputs
    const modNameInput = document.getElementById("mod-name")
    const modDescInput = document.getElementById("mod-description")

    if (modNameInput) {
      modNameInput.addEventListener("input", () => {
        this.updateCurrentMod()
      })
    }

    if (modDescInput) {
      modDescInput.addEventListener("input", () => {
        this.updateCurrentMod()
      })
    }
  }

  downloadMod() {
    if (this.currentMod && this.editor) {
      const modCode = this.editor.getValue()
      const modName = this.currentMod.name || "new_mod"
      const filename = `${modName.replace(/\s+/g, "_")}.lua`

      const blob = new Blob([modCode], { type: "text/plain" })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      Utils.showNotification("Mod downloaded successfully!")
    }
  }

  saveMod() {
    if (this.currentMod && this.editor) {
      const modCode = this.editor.getValue()
      this.currentMod.code = modCode
      this.currentMod.lastModified = new Date()
      this.saveMods()
      Utils.showNotification("Mod saved successfully!")
    }
  }

  autoSave() {
    if (this.currentMod && this.editor) {
      const modCode = this.editor.getValue()
      this.currentMod.code = modCode
      this.currentMod.lastModified = new Date()
      this.saveMods()
    }
  }

  updateCurrentMod() {
    if (this.currentMod) {
      const modNameInput = document.getElementById("mod-name")
      const modDescInput = document.getElementById("mod-description")

      if (modNameInput) {
        this.currentMod.name = modNameInput.value
      }

      if (modDescInput) {
        this.currentMod.description = modDescInput.value
      }
    }
  }

  loadDefaultMod() {
    this.currentMod = {
      name: "Island Explorer",
      description: "Enhanced exploration mechanics for Tropik islands",
      code: document.getElementById("code-editor").value,
      lastModified: new Date(),
    }
  }

  loadMods() {
    try {
      const modsData = localStorage.getItem("tropikMods")
      return modsData ? JSON.parse(modsData) : {}
    } catch (error) {
      console.error("Error loading mods from localStorage:", error)
      return {}
    }
  }

  saveMods() {
    try {
      localStorage.setItem("tropikMods", JSON.stringify(this.mods))
    } catch (error) {
      console.error("Error saving mods to localStorage:", error)
    }
  }
}

// AI Assistant Management
class AIAssistant {
  constructor() {
    this.isOpen = false
    this.responses = {
      tropik: {
        title: "About Tropik",
        content: `🌴 **Tropik - Our VR Paradise!**

Here's what makes Tropik special:
• **Physics-Based Movement** - Gorilla Tag-style arm locomotion
• **Four Unique Islands** - Each with distinct themes and challenges
• **Multiplayer Adventures** - Explore with friends seamlessly
• **Adorable Axolotls** - Play as cute amphibian characters
• **Social Hubs** - Hot springs and community areas

**Current Status:** 5% complete, core mechanics in development

Want to follow our progress? Join our Discord for exclusive updates! 🚀`,
      },
      modding: {
        title: "Modding with LUA",
        content: `🛠️ **Create Amazing Tropik Mods!**

Our LUA mod editor supports:
• **Custom Gameplay** - Modify movement, gravity, and mechanics
• **NPC Creation** - Add new characters and dialogue
• **Event Systems** - Create custom island events
• **Player Abilities** - Enhance or modify player powers
• **Visual Effects** - Add particles and animations

**Available APIs:**
\`TropikAPI.setPlayerSpeed()\`
\`TropikAPI.spawnParticles()\`
\`TropikAPI.showMessage()\`

Try our mod editor now! It's available on the website. 💻`,
      },
      discord: {
        title: "Join Our Community",
        content: `💬 **Discord Community Benefits:**

🎮 **Real-time Updates** - Get development news first
👥 **Direct Team Access** - Chat with our developers
🧪 **Beta Testing** - Early access to new features
📚 **Modding Support** - Tutorials and community help
🎉 **Events & Contests** - Community challenges and fun

**Join us:** discord.gg/GBcuCSbktX

Our community is the heart of Xeno Interactions! ❤️`,
      },
      team: {
        title: "Meet Our Team",
        content: `👥 **The Xeno Interactions Team:**

🏆 **Animated** - CEO & Founder
   Creative visionary and project leader

🛡️ **Slugmaster447** - Second in Command
   Strategic operations and coordination

💻 **Anémunt** - Lead Developer
   Technical architect and VR specialist

📋 **Dxsired** - Project Manager
   Workflow coordination and team management

**Location:** Indiana, USA 🇺🇸
**Founded:** 2023
**Mission:** Creating immersive VR experiences that bring people together!`,
      },
      company: {
        title: "About Xeno Interactions",
        content: `🚀 **Xeno Interactions LLC - Founded 2023**

**Our Mission:**
• Create innovative VR experiences
• Build strong gaming communities  
• Develop with transparency
• Foster collaboration and creativity

**Our Values:**
🔬 **Innovation** - Pushing VR boundaries
👥 **Community** - Players at the heart of development
💎 **Quality** - Polished, exceptional experiences
🤝 **Collaboration** - Working together for better games

We believe in open development and community involvement! 🌟`,
      },
      contact: {
        title: "Get in Touch",
        content: `📞 **Contact Xeno Interactions:**

**Best Way:** Join our Discord server!
• Real-time team communication
• Community discussions
• Development updates
• Modding support

**Discord:** discord.gg/GBcuCSbktX

**Location:** Indiana, USA
**Partnerships:** Open to VR collaborations
**Support:** Available through Discord community

We love hearing from our community! 💬`,
      },
    }
    this.init()
  }

  init() {
    this.setupToggle()
    this.setupQuickActions()
    this.setupInput()
    this.setupClose()
    this.showWelcomeNotification()
  }

  setupToggle() {
    const toggle = document.getElementById("ai-toggle")
    const chat = document.getElementById("ai-chat")

    if (toggle && chat) {
      toggle.addEventListener("click", () => {
        this.isOpen = !this.isOpen
        chat.classList.toggle("active", this.isOpen)

        if (this.isOpen) {
          this.hideNotification()
        }
      })
    }
  }

  setupClose() {
    const closeBtn = document.getElementById("ai-close")
    const chat = document.getElementById("ai-chat")

    if (closeBtn && chat) {
      closeBtn.addEventListener("click", () => {
        this.isOpen = false
        chat.classList.remove("active")
      })
    }
  }

  setupQuickActions() {
    document.querySelectorAll(".quick-action").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.action
        if (this.responses[action]) {
          this.addBotMessage(this.responses[action].content)
        }
      })
    })
  }

  setupInput() {
    const input = document.getElementById("ai-input-field")
    const sendBtn = document.getElementById("ai-send")

    const sendMessage = () => {
      if (input && input.value.trim()) {
        const userMessage = input.value.trim()
        this.addUserMessage(userMessage)
        input.value = ""

        // Show typing indicator
        this.showTypingIndicator()

        // Simulate AI response delay
        setTimeout(() => {
          this.hideTypingIndicator()
          this.handleUserMessage(userMessage)
        }, 1500)
      }
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", sendMessage)
    }

    if (input) {
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendMessage()
        }
      })
    }
  }

  addUserMessage(message) {
    const messagesContainer = document.getElementById("ai-messages")
    if (messagesContainer) {
      const messageDiv = document.createElement("div")
      messageDiv.className = "ai-message ai-message-user"
      messageDiv.innerHTML = `
        <div class="message-avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="message-content">
          <p>${this.escapeHtml(message)}</p>
        </div>
      `
      messagesContainer.appendChild(messageDiv)
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }

  addBotMessage(message) {
    const messagesContainer = document.getElementById("ai-messages")
    if (messagesContainer) {
      const messageDiv = document.createElement("div")
      messageDiv.className = "ai-message ai-message-bot"
      messageDiv.innerHTML = `
        <div class="message-avatar">
          <i class="fas fa-fish"></i>
        </div>
        <div class="message-content">
          ${this.formatMessage(message)}
        </div>
      `
      messagesContainer.appendChild(messageDiv)
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById("ai-messages")
    if (messagesContainer) {
      const typingDiv = document.createElement("div")
      typingDiv.className = "ai-message ai-message-bot typing-indicator"
      typingDiv.innerHTML = `
        <div class="message-avatar">
          <i class="fas fa-fish"></i>
        </div>
        <div class="message-content">
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      `
      messagesContainer.appendChild(typingDiv)
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }

  hideTypingIndicator() {
    const typingIndicator = document.querySelector(".typing-indicator")
    if (typingIndicator) {
      typingIndicator.remove()
    }
  }

  formatMessage(message) {
    // Convert markdown-like formatting to HTML
    return message
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/\n/g, "</p><p>")
      .replace(/^(.*)$/, "<p>$1</p>")
  }

  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  handleUserMessage(message) {
    const lowerMessage = message.toLowerCase()

    // Enhanced keyword matching
    if (lowerMessage.includes("tropik") || lowerMessage.includes("game") || lowerMessage.includes("vr")) {
      this.addBotMessage(this.responses.tropik.content)
    } else if (lowerMessage.includes("mod") || lowerMessage.includes("lua") || lowerMessage.includes("editor")) {
      this.addBotMessage(this.responses.modding.content)
    } else if (
      lowerMessage.includes("discord") ||
      lowerMessage.includes("community") ||
      lowerMessage.includes("join")
    ) {
      this.addBotMessage(this.responses.discord.content)
    } else if (lowerMessage.includes("team") || lowerMessage.includes("who") || lowerMessage.includes("developer")) {
      this.addBotMessage(this.responses.team.content)
    } else if (lowerMessage.includes("company") || lowerMessage.includes("about") || lowerMessage.includes("xeno")) {
      this.addBotMessage(this.responses.company.content)
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("support")) {
      this.addBotMessage(this.responses.contact.content)
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      this.addBotMessage(
        "Hello there! 👋 Welcome to Xeno Interactions! I'm Axol, your friendly AI assistant. I'm here to help you learn about our VR game Tropik, our amazing team, and how you can get involved in our community. What would you like to know? 🐠",
      )
    } else if (lowerMessage.includes("help") || lowerMessage.includes("what") || lowerMessage.includes("how")) {
      this.addBotMessage(
        `🐠 **I'm here to help!** Here's what I can assist you with:

🌴 **Tropik Development** - Learn about our VR game
🛠️ **Modding Guides** - LUA scripting tutorials  
👥 **Team Information** - Meet our developers
💬 **Discord Community** - Join our active community
🏢 **Company Info** - About Xeno Interactions

Just ask me about any of these topics, or use the quick action buttons below! ✨`,
      )
    } else {
      this.addBotMessage(
        `That's an interesting question! 🤔 

I'm specialized in helping with information about:
• **Tropik** - Our VR game development
• **Modding** - LUA scripting and tutorials
• **Our Team** - Meet the developers
• **Discord** - Join our community

Try asking about one of these topics, or use the quick action buttons for instant answers! 🚀`,
      )
    }
  }

  showWelcomeNotification() {
    setTimeout(() => {
      const notification = document.getElementById("ai-notification")
      if (notification && !this.isOpen) {
        notification.style.opacity = "1"
        notification.style.transform = "translateY(0)"

        setTimeout(() => {
          this.hideNotification()
        }, 5000)
      }
    }, 3000)
  }

  hideNotification() {
    const notification = document.getElementById("ai-notification")
    if (notification) {
      notification.style.opacity = "0"
      notification.style.transform = "translateY(10px)"
    }
  }
}

// Utility Functions
class Utils {
  static formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  static debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  static showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: var(--gradient-primary);
      color: white;
      border-radius: 0.75rem;
      box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
      z-index: 10000;
      font-weight: 500;
      animation: slideInNotification 0.3s ease-out;
      max-width: 300px;
    `
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideOutNotification 0.3s ease-out"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 4000)
  }

  static smoothScrollTo(target) {
    const element = document.querySelector(target)
    if (element) {
      const offsetTop = element.offsetTop - 100
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize managers
  const navigationManager = new NavigationManager()
  const aiAssistant = new AIAssistant()
  const animationManager = new AnimationManager()

  // Add smooth scrolling to anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = this.getAttribute("href")
      Utils.smoothScrollTo(target)
    })
  })

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Escape to close AI chat
    if (e.key === "Escape") {
      const aiChat = document.getElementById("ai-chat")
      if (aiChat && aiChat.classList.contains("active")) {
        aiChat.classList.remove("active")
        aiAssistant.isOpen = false
      }

      // Also close mobile menu
      const navMenu = document.getElementById("nav-menu")
      const navToggle = document.getElementById("nav-toggle")
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")

        const bars = navToggle.querySelectorAll(".bar")
        bars[0].style.transform = "none"
        bars[1].style.opacity = "1"
        bars[2].style.transform = "none"
      }
    }
  })

  // Add enhanced CSS animations
  const style = document.createElement("style")
  style.textContent = `
    @keyframes slideInNotification {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOutNotification {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    @keyframes floatParticle {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
      }
    }
    .typing-dots {
      display: flex;
      gap: 4px;
      padding: 8px 0;
    }
    .typing-dots span {
      width: 6px;
      height: 6px;
      background: var(--accent-primary);
      border-radius: 50%;
      animation: typingDot 1.4s infinite ease-in-out;
    }
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    @keyframes typingDot {
      0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }
    .animate-in {
      animation: fadeInUp 0.6s ease-out;
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes ripple {
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
    .navbar.scrolled {
      background: rgba(10, 10, 10, 0.98);
      backdrop-filter: blur(20px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .navbar.hidden {
      transform: translateY(-100%);
    }
    body.page-transition-exit {
      animation: fadeOut 0.3s ease-out forwards;
    }
    body.page-transition-enter {
      animation: fadeIn 0.3s ease-in forwards;
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `
  document.head.appendChild(style)

  console.log("🚀 Xeno Interactions website initialized successfully!")

  // Initialize additional features
  // const navigationManager = new NavigationManager()
  // const animationManager = new AnimationManager()
  // const aiAssistant = new AIAssistant()

  // Add smooth scrolling to anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = this.getAttribute("href")
      Utils.smoothScrollTo(target)
    })
  })

  // Add page transitions
  const setupPageTransitions = () => {
    // Add page transition effects
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]')

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href")

        // Skip if it's an external link or has special attributes
        if (link.hasAttribute("target") || link.hasAttribute("download")) {
          return
        }

        e.preventDefault()

        // Add exit animation
        document.body.classList.add("page-transition-exit")

        setTimeout(() => {
          window.location.href = href
        }, 300)
      })
    })

    // Add enter animation on page load
    window.addEventListener("load", () => {
      document.body.classList.add("page-transition-enter")
    })
  }

  setupPageTransitions()

  // Add button animations
  const setupButtonAnimations = () => {
    // Add ripple effect to buttons
    document.querySelectorAll(".btn, .quick-action, .nav-link").forEach((button) => {
      button.addEventListener("click", function (e) {
        const ripple = document.createElement("span")
        const rect = this.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `

        this.style.position = "relative"
        this.style.overflow = "hidden"
        this.appendChild(ripple)

        setTimeout(() => {
          ripple.remove()
        }, 600)
      })
    })
  }

  setupButtonAnimations()
})

// Export for use in other files
window.XenoInteractions = {
  NavigationManager,
  AIAssistant,
  AnimationManager,
  Utils,
}
